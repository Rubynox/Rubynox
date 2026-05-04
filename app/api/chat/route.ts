import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message?: string;
  history?: ChatMessage[];
};

type ProjectType =
  | "Website / web app"
  | "CRM system"
  | "Dashboard / analytics"
  | "Business automation"
  | "AI assistant"
  | "Mobile app"
  | "SaaS / portal"
  | "API / integration"
  | "Custom software";

type Profile = {
  projectType: ProjectType;
  business?: string;
  problem?: string;
  users?: string;
  features: string[];
  integrations: string[];
  timeline?: string;
  budget?: string;
};

type Contact = {
  name?: string;
  email?: string;
  phone?: string;
};

type Scenario = {
  type: ProjectType;
  patterns: RegExp[];
  summary: string;
  features: string[];
};

const scenarios: Scenario[] = [
  {
    type: "CRM system",
    patterns: [/crm/i, /lead/i, /enquir/i, /inquir/i, /customer/i, /sales/i, /follow[- ]?up/i],
    summary: "A CRM can organize leads, follow-ups, owners, notes, and WhatsApp handoff.",
    features: ["lead stages", "follow-up reminders", "team assignment", "reports"]
  },
  {
    type: "Business automation",
    patterns: [/automat/i, /manual/i, /workflow/i, /approval/i, /reminder/i, /repeated/i, /daily report/i],
    summary: "Automation can reduce repeated manual work and keep tasks moving without constant checking.",
    features: ["triggers", "reminders", "notifications", "scheduled reports"]
  },
  {
    type: "Mobile app",
    patterns: [/mobile/i, /\bapp\b/i, /android/i, /ios/i, /field team/i, /delivery/i],
    summary: "A mobile app fits when users need to work from phones, outside the office, or on the move.",
    features: ["login", "mobile forms", "notifications", "admin dashboard"]
  },
  {
    type: "Dashboard / analytics",
    patterns: [/dashboard/i, /analytics/i, /report/i, /metrics/i, /kpi/i, /excel/i, /sheet/i],
    summary: "A dashboard can turn scattered data into clear daily metrics and reports.",
    features: ["metric cards", "filters", "charts", "exports"]
  },
  {
    type: "AI assistant",
    patterns: [/\bai\b/i, /chatbot/i, /assistant/i, /\bbot\b/i, /faq/i, /support/i],
    summary: "An AI assistant can answer common questions, qualify leads, and hand serious enquiries to your team.",
    features: ["guided chat", "FAQ answers", "lead qualification", "WhatsApp handoff"]
  },
  {
    type: "SaaS / portal",
    patterns: [/saas/i, /portal/i, /subscription/i, /mvp/i, /founder/i, /multi[- ]?tenant/i],
    summary: "A SaaS or portal should start with one focused version before expanding.",
    features: ["user accounts", "roles", "admin panel", "customer dashboard"]
  },
  {
    type: "API / integration",
    patterns: [/api/i, /integration/i, /connect/i, /sync/i, /webhook/i, /payment gateway/i, /erp/i],
    summary: "An integration can connect tools so data does not need to be entered twice.",
    features: ["secure API", "webhooks", "data sync", "error logs"]
  },
  {
    type: "Website / web app",
    patterns: [/website/i, /landing/i, /web app/i, /\bsite\b/i, /seo/i],
    summary: "A website or web app can explain your business, build trust, and capture enquiries.",
    features: ["service sections", "lead form", "WhatsApp CTA", "case studies"]
  }
];

const featureWords = [
  "login",
  "dashboard",
  "payment",
  "reports",
  "notifications",
  "booking",
  "form",
  "upload",
  "tracking",
  "admin panel",
  "roles",
  "export",
  "reminders",
  "analytics"
];

const integrationWords = ["whatsapp", "email", "excel", "sheets", "payment", "razorpay", "stripe", "crm", "erp", "api"];

function userText(history: ChatMessage[], message: string) {
  return [...history.filter((item) => item.role === "user").map((item) => item.content), message].join("\n");
}

function sentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function firstSentence(text: string, pattern: RegExp) {
  return sentences(text).find((sentence) => pattern.test(sentence));
}

function latestSentence(text: string, pattern: RegExp) {
  return sentences(text).reverse().find((sentence) => pattern.test(sentence));
}

function detectScenario(text: string) {
  if (/(lead|enquir|inquir).{0,40}(track|manage|miss|follow)|whatsapp.{0,40}(lead|enquir|inquir|track|follow)/i.test(text)) {
    return scenarios.find((scenario) => scenario.type === "CRM system")!;
  }

  if (/(field team|mobile|android|ios|\bapp\b|play store|app store)/i.test(text)) {
    return scenarios.find((scenario) => scenario.type === "Mobile app")!;
  }

  if (/(automat|manual|workflow|approval|reminder|repeated|daily report)/i.test(text)) {
    return scenarios.find((scenario) => scenario.type === "Business automation")!;
  }

  return scenarios.find((scenario) => scenario.patterns.some((pattern) => pattern.test(text)));
}

function extractList(text: string, options: string[]) {
  return options.filter((option) => new RegExp(`\\b${option.replace(" ", "[- ]?")}\\b`, "i").test(text));
}

function extractProfile(text: string): Profile {
  const scenario = detectScenario(text);

  return {
    projectType: scenario?.type ?? "Custom software",
    business: firstSentence(text, /(business|company|agency|clinic|school|coaching|class|institute|restaurant|shop|store|service|manufacturing|real estate|education|healthcare|finance|travel|logistics)/i),
    problem: firstSentence(text, /(problem|issue|struggle|need|want|miss|manual|slow|hard|difficult|manage|track|build|create|reduce|improve)/i),
    users: latestSentence(text, /(customer|client|staff|team|admin|manager|owner|vendor|student|doctor|field|agent|user|employee|people will use|who will use)/i),
    features: extractList(text, featureWords),
    integrations: extractList(text, integrationWords),
    timeline: latestSentence(text, /\b(today|urgent|asap|week|weeks|month|months|day|days|deadline|timeline|launch|soon|quarter|year)\b/i),
    budget: latestSentence(text, /\b(budget|cost|price|quote|estimate|rs|inr|lakh|lac|thousand|not sure)\b|\d+\s?(k|l)\b/i)
  };
}

function extractContact(text: string): Contact {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const phone = text.match(/(?:\+?\d[\s-]?){10,14}/)?.[0]?.replace(/[^\d+]/g, "");
  const name =
    text.match(/(?:my name is|name is|i am|i'm)\s+([a-z][a-z\s]{1,40})/i)?.[1]?.trim() ||
    text.match(/name[:\s]+([a-z][a-z\s]{1,40})/i)?.[1]?.trim();

  return { email, phone, name };
}

function missingFields(profile: Profile) {
  const missing: Array<"business" | "problem" | "users" | "features" | "timeline" | "budget"> = [];
  if (!profile.business) missing.push("business");
  if (!profile.problem) missing.push("problem");
  if (!profile.users) missing.push("users");
  if (profile.features.length === 0) missing.push("features");
  if (!profile.timeline) missing.push("timeline");
  if (!profile.budget) missing.push("budget");
  return missing;
}

function questionFor(field: ReturnType<typeof missingFields>[number], profile: Profile) {
  const questions = {
    business: "What type of business is this for?",
    problem: "What is the main problem you want to solve?",
    users: "Who will use it: customers, team, managers, vendors, or admins?",
    features: `What must be in version one of this ${profile.projectType}?`,
    timeline: "When do you want the first version ready?",
    budget: "Do you have a budget range, or should we keep it open for now?"
  };

  return questions[field];
}

function scenarioFor(profile: Profile) {
  return scenarios.find((scenario) => scenario.type === profile.projectType);
}

function buildMemo(profile: Profile) {
  const scenario = scenarioFor(profile);
  const features = profile.features.length > 0 ? profile.features : scenario?.features ?? ["core workflow", "admin view"];

  return [
    `Requirement memo for Rubynox`,
    `Project: ${profile.projectType}`,
    profile.business ? `Business: ${profile.business}` : null,
    profile.problem ? `Need: ${profile.problem}` : null,
    profile.users ? `Users: ${profile.users}` : null,
    `Version one: ${features.join(", ")}`,
    profile.integrations.length > 0 ? `Integrations: ${profile.integrations.join(", ")}` : null,
    profile.timeline ? `Timeline: ${profile.timeline}` : null,
    profile.budget ? `Budget: ${profile.budget}` : null
  ]
    .filter(Boolean)
    .join("\n");
}

function isReady(profile: Profile, userTurns: number) {
  const missing = missingFields(profile);
  return userTurns >= 2 && missing.length <= 2 && Boolean(profile.problem || profile.features.length > 0);
}

async function saveChatLead(profile: Profile, contact: Contact, memo: string) {
  return saveLead({
    name: contact.name || "Chatbot Lead",
    email: contact.email || null,
    phone: contact.phone || null,
    company: profile.business || null,
    projectType: profile.projectType,
    budget: profile.budget || null,
    timeline: profile.timeline || null,
    message: memo,
    source: "chatbot-requirement-memo"
  });
}

async function buildReply(message: string, history: ChatMessage[]) {
  const text = userText(history, message);
  const profile = extractProfile(text);
  const scenario = scenarioFor(profile);
  const contact = extractContact(message);
  const userTurns = history.filter((item) => item.role === "user").length + 1;
  const ready = isReady(profile, userTurns);

  if (/^(hi|hello|hey|start)$/i.test(message.trim()) || /not sure/i.test(message)) {
    return {
      reply: "Sure. Tell me your business type and the problem you want to solve.",
      shouldRedirect: false,
      whatsappUrl: null
    };
  }

  if (ready && (contact.email || contact.phone)) {
    const memo = buildMemo(profile);
    await saveChatLead(profile, contact, memo);

    return {
      reply: `Memo saved.\n\n${memo}\n\nNext step: continue on WhatsApp with this memo.`,
      shouldRedirect: true,
      whatsappUrl: buildWhatsAppUrl(memo)
    };
  }

  if (ready) {
    const memo = buildMemo(profile);

    return {
      reply: `I have enough clarity.\n\n${memo}\n\nShare your name and phone/email, and I will save this memo for Rubynox and send you to WhatsApp.`,
      shouldRedirect: false,
      whatsappUrl: null
    };
  }

  const missing = missingFields(profile);
  const next = missing[0] ? questionFor(missing[0], profile) : "What should be included in version one?";
  const features = profile.features.length > 0 ? profile.features.join(", ") : scenario?.features.slice(0, 2).join(", ");

  return {
    reply:
      `Looks like: ${profile.projectType}.\n` +
      `${scenario?.summary ?? "Rubynox can build this as custom software around your workflow."}\n` +
      (features ? `Possible version one: ${features}.\n` : "") +
      `Next: ${next}`,
    shouldRedirect: false,
    whatsappUrl: null
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const message = body.message?.trim();
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const response = await buildReply(message, history);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Unable to process chat request." },
      { status: 500 }
    );
  }
}
