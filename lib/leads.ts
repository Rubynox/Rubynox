import { prisma } from "@/lib/prisma";

export type LeadInput = {
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  source: string;
};

type StoredLead = LeadInput & { id: string; createdAt: string };

const globalForLeads = globalThis as unknown as {
  rubynoxMemoryLeads?: StoredLead[];
};

const memoryLeads = globalForLeads.rubynoxMemoryLeads ?? [];
globalForLeads.rubynoxMemoryLeads = memoryLeads;

export async function saveLead(input: LeadInput) {
  if (process.env.DATABASE_URL) {
    return prisma.lead.create({ data: input });
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input
  };

  memoryLeads.push(lead);
  return lead;
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
