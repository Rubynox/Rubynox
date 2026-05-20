import { NextResponse } from "next/server";
import { buildRequirementMemo, getRecentLeads, saveRequirement } from "@/lib/leads";

type LeadRequest = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source?: string;
};

const projectTypes = new Set([
  "Web Development",
  "Mobile App Development",
  "AI Integration",
  "Business Automation",
  "CRM Systems",
  "Dashboard Development",
  "SaaS Development",
  "API Integrations",
  "Custom Software"
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequest;
    const name = body.name?.trim();
    const message = body.message?.trim();

    const email = body.email?.trim() || null;
    const phone = body.phone?.trim() || null;
    const projectType = body.projectType?.trim() || null;

    if (!name || !message || (!email && !phone)) {
      return NextResponse.json(
        { error: "Name, project requirement, and at least one contact detail are required." },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json({ error: "Enter a valid name." }, { status: 400 });
    }

    if (message.length < 20) {
      return NextResponse.json(
        { error: "Project requirement should be at least 20 characters." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json({ error: "Enter a valid 10 digit phone number." }, { status: 400 });
    }

    if (projectType && !projectTypes.has(projectType)) {
      return NextResponse.json({ error: "Select a valid project type." }, { status: 400 });
    }

    const requirementInput = {
      name,
      email,
      phone,
      company: body.company?.trim() || null,
      businessType: body.businessType?.trim() || body.company?.trim() || null,
      projectType,
      budget: body.budget?.trim() || null,
      timeline: body.timeline?.trim() || null,
      message,
      source: body.source?.trim() || "project-requirement-form"
    };

    const result = await saveRequirement({
      ...requirementInput,
      conversationSummary: `${name} needs ${projectType || "software help"}. ${message}`,
      memo: buildRequirementMemo(requirementInput)
    });

    return NextResponse.json({ ok: true, lead: result.lead, notification: result.notification });
  } catch {
    return NextResponse.json(
      { error: "Unable to save lead." },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Lead listing is disabled in production." },
      { status: 403 }
    );
  }

  const leads = await getRecentLeads();
  return NextResponse.json({ leads });
}
