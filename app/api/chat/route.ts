import { NextResponse } from "next/server";
import { saveChatConversation, saveRequirement } from "@/lib/leads";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message?: string;
  history?: ChatMessage[];
};

type Contact = {
  name?: string;
  email?: string;
  phone?: string;
};

type ConversationProfile = {
  projectType: string;
  businessType: string | null;
  problem: string | null;
  users: string | null;
  features: string[];
  integrations: string[];
  budget: string | null;
  timeline: string | null;
  contact: Contact;
  confidence: number;
};

const projectSignals = [
  {
    type: "Web Development",
    terms: [
      "website",
      "site",
      "landing page",
      "web app",
      "seo",
      "pages",
      "online presence",
      "online",
      "google",
      "portfolio",
      "enquiries",
      "inquiries"
    ],
    featureHints: [
      "home page",
      "service pages",
      "about page",
      "contact form",
      "WhatsApp button",
      "Google Maps",
      "SEO setup"
    ]
  },
  {
    type: "Mobile App Development",
    terms: ["mobile app", "android", "ios", "app", "play store", "app store"],
    featureHints: ["login", "profile", "push notifications", "booking", "payments", "admin dashboard", "tracking"]
  },
  {
    type: "CRM Systems",
    terms: ["crm", "lead", "leads", "follow up", "sales", "pipeline", "customer"],
    featureHints: ["lead stages", "follow-up reminders", "team assignment", "notes", "WhatsApp handoff", "reports"]
  },
  {
    type: "Dashboard Development",
    terms: ["dashboard", "report", "analytics", "metrics", "kpi", "spreadsheet", "excel"],
    featureHints: ["metric cards", "charts", "filters", "exports", "role access", "daily summary"]
  },
  {
    type: "AI Integration",
    terms: ["ai", "chatbot", "assistant", "bot", "faq", "support"],
    featureHints: ["guided chat", "FAQ answers", "lead qualification", "summary generation", "human handoff"]
  },
  {
    type: "Business Automation",
    terms: ["automation", "automate", "manual", "workflow", "approval", "reminder", "repeat"],
    featureHints: ["triggers", "approval steps", "notifications", "scheduled reports", "status tracking"]
  },
  {
    type: "SaaS Development",
    terms: ["saas", "portal", "subscription", "mvp", "multi tenant", "platform"],
    featureHints: ["user accounts", "roles", "admin panel", "billing", "customer dashboard", "subscription"]
  },
  {
    type: "API Integrations",
    terms: ["api", "integration", "connect", "sync", "webhook", "payment gateway", "erp"],
    featureHints: ["secure API", "webhooks", "data sync", "error logs", "payment integration"]
  }
];

const businessSignals = [
  "hospital",
  "clinic",
  "restaurant",
  "school",
  "college",
  "coaching",
  "real estate",
  "agency",
  "manufacturing",
  "ecommerce",
  "retail",
  "travel",
  "logistics",
  "finance",
  "service business",
  "consulting",
  "gym",
  "salon",
  "hotel"
];

const knownFeatures = [
  "appointment booking",
  "home page",
  "service pages",
  "about page",
  "contact form",
  "WhatsApp button",
  "Google Maps",
  "SEO setup",
  "portfolio",
  "testimonials",
  "patient dashboard",
  "admin panel",
  "doctor panel",
  "menu",
  "table booking",
  "delivery tracking",
  "online ordering",
  "payments",
  "login",
  "reports",
  "notifications",
  "file upload",
  "chat",
  "inventory",
  "roles",
  "analytics",
  "lead tracking",
  "follow-up reminders",
  "WhatsApp",
  "email",
  "Razorpay",
  "Stripe",
  "Excel",
  "Google Sheets"
];

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function allUserText(history: ChatMessage[], message: string) {
  return [...history, { role: "user", content: message }]
    .filter((item) => item.role === "user")
    .map((item) => item.content)
    .join("\n");
}

function recentUserText(history: ChatMessage[], message: string) {
  return [...history, { role: "user", content: message }]
    .filter((item) => item.role === "user")
    .slice(-3)
    .map((item) => item.content)
    .join("\n");
}

function sentenceWith(text: string, patterns: RegExp[]) {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((item) => item.trim())
    .find((sentence) => patterns.some((pattern) => pattern.test(sentence))) || null;
}

function extractContact(text: string): Contact {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const phone = text.match(/(?:\+?\d[\s-]?){10,14}/)?.[0]?.replace(/[^\d+]/g, "");
  const name =
    text.match(/(?:my name is|name is|i am|i'm)\s+([a-z][a-z\s]{1,40})/i)?.[1]?.trim() ||
    text.match(/name[:\s]+([a-z][a-z\s]{1,40})/i)?.[1]?.trim();

  return { name, email, phone };
}

function extractBudget(text: string) {
  return (
    text.match(/(?:budget|cost|price|estimate)\s*(?:is|:|-)?\s*([^,.\n]{2,40}?)(?:\s+and\s+(?:my\s+)?(?:email|phone)|\s+(?:email|phone)|$)/i)?.[1]?.trim() ||
    text.match(/\b(?:rs\.?|inr)\s*([0-9,.]+\s*(?:lakh|lac|k|thousand)?)/i)?.[0]?.trim() ||
    text.match(/\b[0-9,.]+\s*(?:lakh|lac|k|thousand)\b/i)?.[0]?.trim() ||
    null
  );
}

function extractTimeline(text: string) {
  return (
    text.match(/(?:timeline|deadline|launch|ready)\s*(?:is|:|-)?\s*([a-z0-9,. ]{2,24}(?:week|weeks|month|months|day|days)?)/i)?.[1]?.trim() ||
    text.match(/\b(?:asap|urgent|[0-9]+\s*(?:week|weeks|month|months|day|days))\b/i)?.[0]?.trim() ||
    null
  );
}

function extractUsers(text: string) {
  return (
    text.match(/(?:users are|used by|for users like)\s+([a-z,\s]{3,60})(?:\.|,| and |$)/i)?.[1]?.trim() ||
    text.match(/\b(customers|patients|doctors|staff|admins|managers|vendors|students|teachers|field team)\b/i)?.[0] ||
    null
  );
}

function detectProjectType(text: string) {
  const normalized = normalize(text);
  const scored = projectSignals
    .map((signal) => ({
      signal,
      score: signal.terms.reduce((total, term) => total + (normalized.includes(term) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0 ? scored[0].signal : null;
}

function detectBusinessType(text: string) {
  const normalized = normalize(text);
  const match = businessSignals.find((signal) => normalized.includes(signal));
  if (match) return match;

  const phrase = text.match(/(?:for|my|our)\s+([a-z][a-z\s-]{2,40})(?:\s+(?:business|company|app|website|crm|system))?/i)?.[1];
  return phrase?.trim() || null;
}

function extractList(text: string, options: string[]) {
  const normalized = normalize(text);
  return options.filter((option) => normalized.includes(option.toLowerCase()));
}

function inferScope(profile: ConversationProfile) {
  const score =
    profile.features.length +
    profile.integrations.length +
    (profile.users ? 1 : 0) +
    (profile.projectType.includes("SaaS") ? 2 : 0);

  if (score >= 7) return "Large build";
  if (score >= 3) return "Medium build";
  return "Starter build";
}

function buildProfile(history: ChatMessage[], message: string): ConversationProfile {
  const text = allUserText(history, message);
  const recent = recentUserText(history, message);
  const project = detectProjectType(text);
  const contact = extractContact(text);
  const businessType = detectBusinessType(text);
  const features = extractList(text, knownFeatures);
  const integrations = features.filter((feature) =>
    ["WhatsApp", "email", "Razorpay", "Stripe", "Excel", "Google Sheets"].includes(feature)
  );

  const problem = sentenceWith(text, [
    /\bneed\b/i,
    /\bwant\b/i,
    /\bproblem\b/i,
    /\bmanual\b/i,
    /\bmissing\b/i,
    /\bslow\b/i,
    /\bmanage\b/i,
    /\btrack\b/i,
    /\bbuild\b/i
  ]);

  const users = extractUsers(text);
  const budget = extractBudget(recent);
  const timeline = extractTimeline(recent);

  const filled = [project, businessType, problem, users, budget, timeline, contact.email || contact.phone].filter(Boolean).length;

  return {
    projectType: project?.type || "Custom Software",
    businessType,
    problem,
    users,
    features,
    integrations,
    budget,
    timeline,
    contact,
    confidence: Math.min(1, filled / 7)
  };
}

function askedAbout(history: ChatMessage[], keywords: string[]) {
  const assistantText = normalize(
    history
      .filter((item) => item.role === "assistant")
      .filter((item) => item.content.includes("?"))
      .map((item) => item.content)
      .join(" ")
  );

  return keywords.some((keyword) => assistantText.includes(keyword));
}

function featureSuggestions(profile: ConversationProfile) {
  const signal = projectSignals.find((item) => item.type === profile.projectType);
  const pool = signal?.featureHints || ["admin panel", "reports", "roles", "notifications"];
  const unused = pool.filter((feature) => !profile.features.map((item) => item.toLowerCase()).includes(feature.toLowerCase()));
  return unused.slice(0, 3);
}

function nextQuestion(profile: ConversationProfile, history: ChatMessage[]) {
  const suggestions = featureSuggestions(profile);
  const isWebsite = profile.projectType === "Web Development";

  if (!profile.businessType && !askedAbout(history, ["business", "industry"])) {
    return isWebsite
      ? `What kind of business is the website for, and which city or market do you serve?`
      : `What kind of business is this for? If there is a specific workflow, tell me that too.`;
  }

  if (!profile.problem && !askedAbout(history, ["main problem", "trying to fix"])) {
    return isWebsite
      ? `What should the website do first: build trust, explain services, get calls, collect WhatsApp leads, show work, or improve Google search presence?`
      : `What is the main problem you want to fix first?`;
  }

  if (profile.features.length < 2 && !askedAbout(history, ["features", "version one", "must have", "sections"])) {
    if (isWebsite) {
      return suggestions.length
        ? `Which website sections do you need first: ${suggestions.join(", ")}, pricing, testimonials, gallery, or something else?`
        : `Which website sections do you need first: home, services, about, contact, pricing, testimonials, or gallery?`;
    }

    return suggestions.length
      ? `For version one, should it include ${suggestions.join(", ")}, or something else?`
      : `What should be included in the first useful version?`;
  }

  if (!profile.users && !askedAbout(history, ["who will use", "users", "main customers", "attract"])) {
    return isWebsite
      ? `Who are the main customers you want the website to attract?`
      : `Who will use it day to day: customers, staff, admins, managers, or another group?`;
  }

  if (!profile.timeline && !askedAbout(history, ["timeline", "ready", "launch"])) {
    return `When would you like the first version ready?`;
  }

  if (!profile.budget && !askedAbout(history, ["budget", "range"])) {
    return `Do you already have a budget range, or should Rubynoxx suggest options after scope is clear?`;
  }

  if (!profile.contact.email && !profile.contact.phone) {
    return `Please share your phone or email so Rubynoxx can save this requirement and follow up.`;
  }

  return null;
}

function summaryFor(profile: ConversationProfile) {
  const features = profile.features.length ? profile.features.join(", ") : "to be finalized";
  const scope = inferScope(profile);

  return [
    `${profile.businessType || "Business"} needs ${profile.projectType}.`,
    profile.problem ? `Need: ${profile.problem}` : null,
    profile.users ? `Users: ${profile.users}` : null,
    `Features: ${features}.`,
    `Estimated scope: ${scope}.`,
    profile.timeline ? `Timeline: ${profile.timeline}` : null,
    profile.budget ? `Budget: ${profile.budget}` : null
  ]
    .filter(Boolean)
    .join("\n");
}

function memoFor(profile: ConversationProfile) {
  return [
    "Requirement memo for Rubynoxx",
    `Project type: ${profile.projectType}`,
    profile.businessType ? `Business type: ${profile.businessType}` : null,
    profile.problem ? `Requirement: ${profile.problem}` : null,
    profile.users ? `Users: ${profile.users}` : null,
    profile.features.length ? `Features: ${profile.features.join(", ")}` : null,
    profile.integrations.length ? `Integrations: ${profile.integrations.join(", ")}` : null,
    `Estimated scope: ${inferScope(profile)}`,
    profile.timeline ? `Timeline: ${profile.timeline}` : null,
    profile.budget ? `Budget: ${profile.budget}` : null,
    profile.contact.name ? `Name: ${profile.contact.name}` : null,
    profile.contact.phone ? `Phone: ${profile.contact.phone}` : null,
    profile.contact.email ? `Email: ${profile.contact.email}` : null
  ]
    .filter(Boolean)
    .join("\n");
}

function canSaveRequirement(profile: ConversationProfile) {
  return Boolean(
    (profile.contact.email || profile.contact.phone) &&
      profile.businessType &&
      profile.problem &&
      (profile.features.length > 0 || profile.users || profile.timeline || profile.budget)
  );
}

function isUnsupported(message: string) {
  const normalized = normalize(message);
  const softwareWords = [
    "website",
    "app",
    "crm",
    "dashboard",
    "software",
    "automation",
    "ai",
    "api",
    "portal",
    "system",
    "lead",
    "booking",
    "admin",
    "online presence",
    "google",
    "seo",
    "enquiry",
    "inquiry",
    "portfolio"
  ];

  return normalized.length > 20 && !softwareWords.some((word) => normalized.includes(word));
}

async function buildReply(message: string, history: ChatMessage[]) {
  const conversationMessages: ChatMessage[] = [...history, { role: "user", content: message }];
  const profile = buildProfile(history, message);

  if (isUnsupported(message) && profile.confidence < 0.3) {
    const reply =
      "I may not have enough project context yet. Would you like to continue on WhatsApp and share the details there?";

    await saveChatConversation({
      messages: [...conversationMessages, { role: "assistant", content: reply }],
      projectType: profile.projectType,
      businessType: profile.businessType,
      conversationSummary: summaryFor(profile)
    });

    return {
      reply,
      shouldRedirect: false,
      whatsappUrl: buildWhatsAppUrl("Hi Rubynoxx, I want to discuss my requirement.")
    };
  }

  if (canSaveRequirement(profile)) {
    const memo = memoFor(profile);
    const summary = summaryFor(profile);
    const conversation = await saveChatConversation({
      messages: [...conversationMessages, { role: "assistant", content: memo }],
      name: profile.contact.name || null,
      email: profile.contact.email || null,
      phone: profile.contact.phone || null,
      businessType: profile.businessType,
      projectType: profile.projectType,
      conversationSummary: summary,
      memo
    });

    await saveRequirement({
      name: profile.contact.name || "Chatbot Lead",
      email: profile.contact.email || null,
      phone: profile.contact.phone || null,
      company: null,
      businessType: profile.businessType,
      projectType: profile.projectType,
      budget: profile.budget,
      timeline: profile.timeline,
      message: profile.problem || summary,
      conversationSummary: summary,
      memo,
      conversationId: conversation.id,
      features: profile.features,
      estimatedScope: inferScope(profile),
      source: "chatbot"
    });

    return {
      reply: `Saved. Here is the requirement memo:\n\n${memo}\n\nRubynoxx can continue from this on WhatsApp.`,
      shouldRedirect: false,
      whatsappUrl: buildWhatsAppUrl(memo)
    };
  }

  const question = nextQuestion(profile, history);
  const reply = question
    ? question
    : `${summaryFor(profile)}\n\nWould you like to continue on WhatsApp?`;

  await saveChatConversation({
    messages: [...conversationMessages, { role: "assistant", content: reply }],
    name: profile.contact.name || null,
    email: profile.contact.email || null,
    phone: profile.contact.phone || null,
    businessType: profile.businessType,
    projectType: profile.projectType,
    conversationSummary: summaryFor(profile)
  });

  return {
    reply,
    shouldRedirect: false,
    whatsappUrl: question ? null : buildWhatsAppUrl(summaryFor(profile))
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const message = body.message?.trim();
    const history = Array.isArray(body.history) ? body.history.slice(-32) : [];

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const response = await buildReply(message, history);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json(
      {
        error: "Unable to process chat request.",
        reply: "I could not process that properly. Would you like to continue on WhatsApp?",
        shouldRedirect: false,
        whatsappUrl: buildWhatsAppUrl("Hi Rubynoxx, I want to discuss a requirement.")
      },
      { status: 500 }
    );
  }
}
