import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { join } from "path";
import { saveChatConversation } from "@/lib/leads";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function readGeminiKeyFromExample() {
  try {
    const envExample = readFileSync(join(process.cwd(), ".env.example"), "utf8");
    const match = envExample.match(/^GEMINI_API_KEY=(?:"([^"]+)"|'([^']+)'|([^\r\n#]+))/m);
    const value = (match?.[1] || match?.[2] || match?.[3] || "").trim();

    if (!value || value === "your-gemini-api-key") return null;

    return value;
  } catch {
    return null;
  }
}

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || readGeminiKeyFromExample();
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ExtractedProfile = {
  name?: string | null;
  projectType?: string | null;
  requirementSummary?: string | null;
};

type ModelPayload = {
  reply?: string;
  shouldRedirect?: boolean;
  extractedProfile?: ExtractedProfile;
};

type ScopeProfile = {
  projectType: string | null;
  users: string | null;
  features: string[];
  integrations: string[];
  timeline: string | null;
};

function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (msg): msg is ChatMessage =>
        typeof msg === "object" &&
        msg !== null &&
        ((msg as ChatMessage).role === "user" || (msg as ChatMessage).role === "assistant") &&
        typeof (msg as ChatMessage).content === "string" &&
        (msg as ChatMessage).content.trim().length > 0
    )
    .slice(-24);
}

function explicitlyRequestsHuman(message: string) {
  return (
    /\b(human|person|consultant|engineer|developer|team member|agent|handoff|talk to someone|speak to someone)\b/i.test(message) ||
    /\b(connect|send|open|move|redirect|continue|talk|chat)\b.{0,24}\b(whatsapp|call|phone)\b/i.test(message) ||
    /\b(whatsapp|call|phone)\b.{0,24}\b(connect|send|open|move|redirect|continue|talk|chat)\b/i.test(message)
  );
}

function hasComprehensiveSummary(summary: unknown) {
  if (typeof summary !== "string") return false;

  const trimmed = summary.trim();
  const sentences = trimmed
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return trimmed.length >= 120 && sentences.length >= 2;
}

function hasClosureIntent(message: string) {
  return /\b(no|nope|nothing more|that's all|thats all|just this|this much|yes|done|enough|ok|okay|fine)\b/i.test(
    message
  );
}

function detectScopeProfile(history: ChatMessage[], message: string): ScopeProfile {
  const text = conversationText(history, message);
  const projectType =
    text.match(/\bdashboard|analytics|reporting|reports\b/)
      ? "Dashboard"
      : text.match(/\bcrm|lead|sales pipeline|follow up|follow-up\b/)
        ? "CRM"
        : text.match(/\berp|inventory|operations|approval\b/)
          ? "ERP"
          : text.match(/\bautomation|workflow|pipeline\b/)
            ? "Automation Pipeline"
            : text.match(/\bwebsite|site|landing|online presence\b/)
              ? "Corporate Website"
              : text.match(/\bapp|portal|software|platform\b/)
                ? "Custom Web App"
                : null;

  const users =
    text.match(/\bsales managers?\b/)
      ? "sales managers"
      : text.match(/\bsales team\b/)
        ? "sales team"
        : text.match(/\bstaff\b/)
          ? "staff"
          : text.match(/\badmins?\b/)
            ? "admins"
            : text.match(/\bcustomers?|clients?\b/)
              ? "customers"
              : null;

  const featureOptions = [
    "lead tracking",
    "reports",
    "analytics",
    "follow-ups",
    "booking",
    "payments",
    "notifications",
    "login",
    "roles",
    "forms",
    "inventory",
    "approvals"
  ];
  const integrationOptions = ["WhatsApp", "Google Sheets", "Excel", "CRM", "ERP", "Razorpay", "Stripe", "database"];
  const features = featureOptions.filter((feature) => text.includes(feature.toLowerCase()));
  const integrations = integrationOptions.filter((integration) => text.includes(integration.toLowerCase()));
  const timeline =
    text.match(/\b(?:in\s+)?\d+\s*(?:day|days|week|weeks|month|months)\b/)?.[0] ||
    text.match(/\b(asap|urgent|soon|next month|this month)\b/)?.[0] ||
    null;

  return { projectType, users, features, integrations, timeline };
}

function canCompileScope(profile: ScopeProfile) {
  return Boolean(profile.projectType && (profile.users || profile.features.length > 0) && (profile.features.length > 0 || profile.integrations.length > 0));
}

function buildRequirementSummary(profile: ScopeProfile) {
  const projectType = profile.projectType || "custom software";
  const users = profile.users || "the business team";
  const features = profile.features.length ? profile.features.join(", ") : "the core operating workflow";
  const integrations = profile.integrations.length ? ` with ${profile.integrations.join(", ")} integration` : "";
  const timeline = profile.timeline ? ` The preferred first-version timeline is ${profile.timeline}` : " The timeline and budget can be finalized with the Rubynoxx team";

  return `The client wants a ${projectType} for ${users}, focused on ${features}${integrations}. ${timeline}, with Rubynoxx expected to turn the captured requirements into a practical build plan and implementation scope.`;
}

function shouldUseDeterministicHandoff(history: ChatMessage[], message: string) {
  const profile = detectScopeProfile(history, message);
  const askedText = history
    .filter((msg) => msg.role === "assistant")
    .map((msg) => msg.content)
    .join(" ")
    .toLowerCase();

  return canCompileScope(profile) && (hasClosureIntent(message) || /\bexisting website|spreadsheet|crm|process|replace|improve\b/.test(askedText));
}

function buildWhatsAppHandoff(profile: ScopeProfile) {
  const summary = buildRequirementSummary(profile);
  const whatsappPayload = `Hi Rubynoxx, I finished my requirement brief session with the AI Assistant.

Project Focus: ${profile.projectType || "Custom Software"}
Summary: ${summary}`;

  return {
    summary,
    whatsappUrl: buildWhatsAppUrl(whatsappPayload)
  };
}

function normalizeForSimilarity(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isTooSimilarToPrevious(reply: string, history: ChatMessage[]) {
  const normalizedReply = normalizeForSimilarity(reply);
  if (!normalizedReply) return false;

  const previousAssistantMessages = history
    .filter((msg) => msg.role === "assistant")
    .map((msg) => normalizeForSimilarity(msg.content))
    .filter(Boolean)
    .slice(-4);

  return previousAssistantMessages.some((previous) => {
    if (previous === normalizedReply) return true;

    const replyWords = new Set(normalizedReply.split(" ").filter((word) => word.length > 3));
    const previousWords = new Set(previous.split(" ").filter((word) => word.length > 3));
    const overlap = Array.from(replyWords).filter((word) => previousWords.has(word)).length;
    const smallerSetSize = Math.max(1, Math.min(replyWords.size, previousWords.size));

    return overlap / smallerSetSize > 0.72;
  });
}

function conversationText(history: ChatMessage[], message: string) {
  return [...history, { role: "user", content: message }]
    .filter((msg) => msg.role === "user")
    .map((msg) => msg.content)
    .join(" ")
    .toLowerCase();
}

function buildNonRepeatingReply(history: ChatMessage[], message: string) {
  const text = conversationText(history, message);
  const profile = detectScopeProfile(history, message);
  const askedText = history
    .filter((msg) => msg.role === "assistant")
    .map((msg) => msg.content)
    .join(" ")
    .toLowerCase();
  const alreadyAskedProjectType = /\bwebsite|dashboard|crm|erp|automation|workflow|custom web app\b/.test(askedText);
  const alreadyAskedUsers = /\bwho will use|use it day to day|customers|internal staff|admins|sales\/operations\b/.test(askedText);
  const alreadyAskedFeatures = /\bmust-have features|main features|first version|two or three\b/.test(askedText);
  const alreadyAskedIntegrations = /\bconnect|tools|whatsapp|payments|google sheets|existing database|integrations\b/.test(askedText);
  const alreadyAskedTimeline = /\bwhen do you want|first usable version|budget range|timeline\b/.test(askedText);
  const alreadyAskedReplacement = /\bexisting website|spreadsheet|crm|process|replace|improve\b/.test(askedText);

  if (hasClosureIntent(message) && canCompileScope(profile)) {
    return "Thanks, I have enough to prepare a brief. I will open WhatsApp with a concise project summary so the Rubynoxx team can continue from here.";
  }

  if (!alreadyAskedProjectType && !/\b(website|site|dashboard|crm|erp|automation|app|portal|software|integration|pipeline)\b/.test(text)) {
    return "Got it. Is this mainly a website, dashboard, CRM/ERP system, automation workflow, or custom web app?";
  }

  if (!alreadyAskedUsers && !/\b(customer|client|staff|admin|manager|team|user|users|sales|operations|visitor|patient|student)\b/.test(text)) {
    return "That makes sense. Who will use it day to day: customers, internal staff, admins, or a sales/operations team?";
  }

  if (!alreadyAskedFeatures && !/\b(feature|features|login|report|reports|analytics|lead|booking|payment|notification|approval|inventory|role|roles|form|whatsapp)\b/.test(text)) {
    return "Nice, the audience is clearer now. What are the two or three must-have features for the first version?";
  }

  if (!alreadyAskedIntegrations && !/\b(api|integration|integrate|crm|erp|payment|razorpay|stripe|whatsapp|email|sheets|excel|database)\b/.test(text)) {
    return "Understood. Does it need to connect with any tools like WhatsApp, payments, Google Sheets, a CRM, ERP, or an existing database?";
  }

  if (!alreadyAskedTimeline && !/\b(week|month|deadline|timeline|launch|urgent|asap|budget|cost|price|range)\b/.test(text)) {
    return "Good, the core scope is taking shape. When do you want the first usable version ready, and do you have a budget range in mind?";
  }

  if (!askedText.includes("success") && !askedText.includes("measure")) {
    return "One last useful detail: how will you measure success for this project, such as more enquiries, faster operations, cleaner reporting, or fewer manual tasks?";
  }

  if (alreadyAskedReplacement && canCompileScope(profile)) {
    return "Thanks, I have enough to prepare a brief. I will open WhatsApp with a concise project summary so the Rubynoxx team can continue from here.";
  }

  return "Thanks, I have a clearer picture now. Is there any existing website, spreadsheet, CRM, or process that this new system needs to replace or improve?";
}

function stripMarkdownJson(text: string) {
  const stripped = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const firstBrace = stripped.indexOf("{");
  const lastBrace = stripped.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return stripped.slice(firstBrace, lastBrace + 1);
  }

  return stripped;
}

function normalizeModelPayload(payload: ModelPayload) {
  const profile = payload.extractedProfile || {};

  return {
    reply:
      typeof payload.reply === "string" && payload.reply.trim()
        ? payload.reply.trim()
        : "I understand. Could you share one business goal and the main feature you need first?",
    shouldRedirect: payload.shouldRedirect === true,
    extractedProfile: {
      name: typeof profile.name === "string" && profile.name.trim() ? profile.name.trim() : null,
      projectType:
        typeof profile.projectType === "string" && profile.projectType.trim()
          ? profile.projectType.trim()
          : null,
      requirementSummary:
        typeof profile.requirementSummary === "string" && profile.requirementSummary.trim()
          ? profile.requirementSummary.trim()
          : null
    }
  };
}

export async function POST(request: Request) {
  try {
    const apiKey = getGeminiApiKey();
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const history = sanitizeHistory(body.history);

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const deterministicProfile = detectScopeProfile(history, message);
    const deterministicHandoff = shouldUseDeterministicHandoff(history, message);

    if (!apiKey) {
      if (deterministicHandoff) {
        const handoff = buildWhatsAppHandoff(deterministicProfile);

        return NextResponse.json({
          reply: "Thanks, I have enough to prepare a brief. I will open WhatsApp with a concise project summary so the Rubynoxx team can continue from here.",
          shouldRedirect: true,
          whatsappUrl: handoff.whatsappUrl
        });
      }

      return NextResponse.json({
        reply:
          buildNonRepeatingReply(history, message),
        shouldRedirect: false,
        whatsappUrl: null
      });
    }

    const systemInstruction = `You are the Rubynoxx AI Assistant for a premium software agency.

Core agency context:
- Rubynoxx builds high-converting corporate websites, bespoke dashboards, automation pipelines, and robust CRM/ERP software.
- Your active API identity is provided through the GEMINI_API_KEY environment variable defined by the .env.example configuration blueprint.

Discovery rules:
1. Act like an elite human discovery consultant. Listen closely, acknowledge the visitor's business goal, and ask short context-aware follow-up questions.
2. Ask exactly one or two small questions at a time. Focus on project type, business outcome, target users, must-have features, integrations, timeline, and success metrics.
3. Never push WhatsApp or a human handoff on the first interaction unless the visitor explicitly asks for a human, engineer, call, WhatsApp, or team handoff.
4. Set shouldRedirect to true only when you can naturally compile extractedProfile.requirementSummary as a comprehensive 2-sentence scope brief, or when the visitor explicitly demands a human engineer handoff.
5. Keep reply concise, warm, and plain text. Do not use markdown.

Return only valid raw JSON matching this exact frontend schema:
{
  "reply": "Short conversational response or focused question.",
  "shouldRedirect": false,
  "extractedProfile": {
    "name": "User name if known, otherwise null",
    "projectType": "Corporate Website, Dashboard, Automation Pipeline, CRM, ERP, Web App, or null",
    "requirementSummary": "A comprehensive 2-sentence summary only when shouldRedirect is true, otherwise null"
  }
}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const historyWithoutCurrent =
      history[history.length - 1]?.role === "user" && history[history.length - 1]?.content === message
        ? history.slice(0, -1)
        : history;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Conversation control note: do not repeat any previous assistant question. Previous assistant questions and replies are part of the conversation history below. Move to the next missing discovery detail instead.`
          }
        ]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will continue from the existing context and avoid repeating prior questions." }]
      },
      ...historyWithoutCurrent.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const result = await model.generateContent({ contents });
    const responseText = result.response.text()?.trim();

    if (!responseText) {
      throw new Error("Gemini returned an empty response.");
    }

    const parsedPayload = JSON.parse(stripMarkdownJson(responseText)) as ModelPayload;
    const data = normalizeModelPayload(parsedPayload);
    const humanRequested = explicitlyRequestsHuman(message);
    const summaryReady = hasComprehensiveSummary(data.extractedProfile.requirementSummary);
    const shouldRedirect = humanRequested || deterministicHandoff || (data.shouldRedirect && summaryReady);
    let reply =
      data.shouldRedirect && !shouldRedirect
        ? "That gives me a useful starting point. What are the main features you need, and who will use this day to day?"
        : data.reply;

    if (!shouldRedirect && isTooSimilarToPrevious(reply, historyWithoutCurrent)) {
      reply = buildNonRepeatingReply(historyWithoutCurrent, message);
    }

    let whatsappUrl: string | null = null;
    let conversationSummary = data.extractedProfile.requirementSummary;

    if (shouldRedirect) {
      if (!conversationSummary || !hasComprehensiveSummary(conversationSummary)) {
        conversationSummary = buildRequirementSummary(deterministicProfile);
      }

      const handoff = buildWhatsAppHandoff({
        ...deterministicProfile,
        projectType: data.extractedProfile.projectType || deterministicProfile.projectType
      });
      whatsappUrl = handoff.whatsappUrl;

      if (deterministicHandoff && !humanRequested) {
        reply = "Thanks, I have enough to prepare a brief. I will open WhatsApp with a concise project summary so the Rubynoxx team can continue from here.";
      }

      try {
        await saveChatConversation({
          messages: [...historyWithoutCurrent, { role: "user", content: message }, { role: "assistant", content: reply }],
          name: data.extractedProfile.name || "AI Website Lead",
          email: null,
          phone: null,
          businessType: null,
          projectType: data.extractedProfile.projectType || deterministicProfile.projectType || "Web Platform",
          conversationSummary: conversationSummary || "Human handoff requested from AI discovery chat"
        });
      } catch (saveError) {
        console.error("Chat conversation save failed after WhatsApp URL was prepared:", saveError);
      }
    }

    return NextResponse.json({
      reply,
      shouldRedirect,
      whatsappUrl
    });
  } catch (error) {
    console.error("AI Route processing error:", error);

    return NextResponse.json({
      reply:
        "I had trouble reading that properly, but we can keep going here. What are you trying to build, and what should it help your business improve?",
      shouldRedirect: false,
      whatsappUrl: null
    });
  }
}
