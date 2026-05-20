import { prisma } from "@/lib/prisma";
import { notifyWhatsApp } from "@/lib/whatsapp";

export type LeadInput = {
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  businessType?: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  source: string;
};

export type RequirementInput = LeadInput & {
  conversationSummary?: string | null;
  memo?: string | null;
  conversationId?: string | null;
  features?: string[];
  estimatedScope?: string | null;
};

export type ChatMessageRecord = {
  role: "user" | "assistant";
  content: string;
};

type StoredLead = LeadInput & { id: string; createdAt: string; updatedAt: string };
type StoredRequirement = RequirementInput & {
  id: string;
  leadId: string | null;
  createdAt: string;
  updatedAt: string;
};
type StoredConversation = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  businessType: string | null;
  projectType: string | null;
  conversationSummary: string | null;
  memo: string | null;
  messages: ChatMessageRecord[];
  createdAt: string;
  updatedAt: string;
};

const globalForLeads = globalThis as unknown as {
  rubunoxxMemoryLeads?: StoredLead[];
  rubunoxxMemoryRequirements?: StoredRequirement[];
  rubunoxxMemoryConversations?: StoredConversation[];
};

const memoryLeads = globalForLeads.rubunoxxMemoryLeads ?? [];
const memoryRequirements = globalForLeads.rubunoxxMemoryRequirements ?? [];
const memoryConversations = globalForLeads.rubunoxxMemoryConversations ?? [];

globalForLeads.rubunoxxMemoryLeads = memoryLeads;
globalForLeads.rubunoxxMemoryRequirements = memoryRequirements;
globalForLeads.rubunoxxMemoryConversations = memoryConversations;

export function buildRequirementMemo(input: RequirementInput) {
  const lines = [
    "New Rubunoxx requirement",
    `Name: ${input.name || "Not shared"}`,
    `Phone: ${input.phone || "Not shared"}`,
    `Email: ${input.email || "Not shared"}`,
    input.company ? `Company: ${input.company}` : null,
    input.businessType ? `Business type: ${input.businessType}` : null,
    `Project type: ${input.projectType || "Not sure"}`,
    `Budget: ${input.budget || "Not shared"}`,
    `Timeline: ${input.timeline || "Not shared"}`,
    input.estimatedScope ? `Estimated scope: ${input.estimatedScope}` : null,
    input.features?.length ? `Features: ${input.features.join(", ")}` : null,
    "",
    "Requirement:",
    input.message,
    "",
    "Summary:",
    input.conversationSummary || input.message
  ];

  return lines.filter((line) => line !== null).join("\n");
}

export async function saveLead(input: LeadInput) {
  if (process.env.DATABASE_URL) {
    return prisma.lead.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        businessType: input.businessType || null,
        projectType: input.projectType,
        budget: input.budget,
        timeline: input.timeline,
        message: input.message,
        source: input.source
      }
    });
  }

  const now = new Date().toISOString();
  const lead = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...input
  };

  memoryLeads.push(lead);
  return lead;
}

export async function saveRequirement(input: RequirementInput) {
  const memo = input.memo || buildRequirementMemo(input);
  const conversationSummary = input.conversationSummary || input.message;
  const features = input.features || [];
  const lead = await saveLead(input);

  if (process.env.DATABASE_URL) {
    const requirement = await prisma.requirement.create({
      data: {
        leadId: lead.id,
        conversationId: input.conversationId || null,
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        businessType: input.businessType || null,
        projectType: input.projectType,
        budget: input.budget,
        timeline: input.timeline,
        requirement: input.message,
        features,
        estimatedScope: input.estimatedScope || null,
        conversationSummary,
        memo,
        source: input.source
      }
    });

    const notification = await notifyWhatsApp(memo);
    return { lead, requirement, notification };
  }

  const now = new Date().toISOString();
  const requirement = {
    id: crypto.randomUUID(),
    leadId: lead.id,
    createdAt: now,
    updatedAt: now,
    ...input,
    features,
    conversationSummary,
    memo
  };

  memoryRequirements.push(requirement);
  const notification = await notifyWhatsApp(memo);
  return { lead, requirement, notification };
}

export async function saveChatConversation(input: {
  messages: ChatMessageRecord[];
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  businessType?: string | null;
  projectType?: string | null;
  conversationSummary?: string | null;
  memo?: string | null;
}) {
  if (process.env.DATABASE_URL) {
    return prisma.chatConversation.create({
      data: {
        messages: input.messages,
        name: input.name || null,
        email: input.email || null,
        phone: input.phone || null,
        businessType: input.businessType || null,
        projectType: input.projectType || null,
        conversationSummary: input.conversationSummary || null,
        memo: input.memo || null
      }
    });
  }

  const now = new Date().toISOString();
  const conversation = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    messages: input.messages,
    name: input.name || null,
    email: input.email || null,
    phone: input.phone || null,
    businessType: input.businessType || null,
    projectType: input.projectType || null,
    conversationSummary: input.conversationSummary || null,
    memo: input.memo || null
  };

  memoryConversations.push(conversation);
  return conversation;
}

export async function getRecentLeads() {
  if (process.env.DATABASE_URL) {
    return prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 25
    });
  }

  return [...memoryLeads].reverse().slice(0, 25);
}
