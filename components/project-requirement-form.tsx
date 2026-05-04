"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, MessageCircle, Send } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState | "contact", string>>;

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "Website / web app",
  budget: "",
  timeline: "",
  message: ""
};

const projectTypes = [
  "Website / web app",
  "Mobile app",
  "SaaS product",
  "CRM system",
  "Dashboard",
  "AI automation",
  "API integration",
  "Custom software"
];

export function ProjectRequirementForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [projectTypeOpen, setProjectTypeOpen] = useState(false);
  const projectTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeProjectType(event: MouseEvent) {
      if (!projectTypeRef.current?.contains(event.target as Node)) {
        setProjectTypeOpen(false);
      }
    }

    document.addEventListener("mousedown", closeProjectType);
    return () => document.removeEventListener("mousedown", closeProjectType);
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined, contact: undefined }));
    setStatus("idle");
    setError("");
  }

  function validateForm() {
    const nextErrors: FormErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneDigits = phone.replace(/\D/g, "");

    if (name.length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!email && !phone) {
      nextErrors.contact = "Enter either email or phone number.";
    }

    if (email && !emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (phone && phoneDigits.length !== 10) {
      nextErrors.phone = "Enter exactly 10 digits.";
    }

    if (message.length < 20) {
      nextErrors.message = "Tell us a little more about the requirement.";
    }

    if (!projectTypes.includes(form.projectType)) {
      nextErrors.projectType = "Select a valid project type.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) {
      setStatus("error");
      setError("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "landing-page-contact-form" })
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Unable to submit your requirement.");
      }

      setStatus("success");
      setFieldErrors({});
      setForm(initialState);
      setProjectTypeOpen(false);
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your requirement. Please try WhatsApp."
      );
    }
  }

  const whatsappMessage = `Hi Rubynox, I want to discuss a project requirement.
Name: ${form.name || "-"}
Project: ${form.projectType}
Requirement: ${form.message || "-"}`;

  return (
    <section id="contact" className="border-t border-line py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Share your requirement. We will turn it into a clear next step.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            Tell us what you need, the kind of system you are planning, and how we can reach you.
            Your details are saved securely through the lead API and can be connected to PostgreSQL with Prisma.
          </p>

          <div className="mt-8 space-y-4 text-sm leading-6 text-muted">
            {[
              "We review the requirement and suggest the simplest first version.",
              "We keep communication clear for non-technical business teams.",
              "For urgent projects, WhatsApp is the fastest way to continue."
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="min-w-0 rounded-2xl border border-line bg-card/95 p-4 shadow-card sm:p-7">
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="min-w-0 space-y-2 text-sm text-muted">
              <span>Name</span>
              <input
                required
                aria-invalid={Boolean(fieldErrors.name)}
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="block w-full min-w-0 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent aria-[invalid=true]:border-red-400"
                placeholder="Your name"
              />
              {fieldErrors.name ? <span className="block text-xs text-red-500">{fieldErrors.name}</span> : null}
            </label>

            <label className="min-w-0 space-y-2 text-sm text-muted">
              <span>Company</span>
              <input
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                className="block w-full min-w-0 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent"
                placeholder="Company name"
              />
            </label>

            <label className="min-w-0 space-y-2 text-sm text-muted">
              <span>Phone</span>
              <input
                value={form.phone}
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                aria-invalid={Boolean(fieldErrors.phone || fieldErrors.contact)}
                onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
                className="block w-full min-w-0 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent aria-[invalid=true]:border-red-400"
                placeholder="9876543210"
              />
              {fieldErrors.phone ? <span className="block text-xs text-red-500">{fieldErrors.phone}</span> : null}
            </label>

            <label className="min-w-0 space-y-2 text-sm text-muted">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email || fieldErrors.contact)}
                onChange={(event) => updateField("email", event.target.value)}
                className="block w-full min-w-0 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent aria-[invalid=true]:border-red-400"
                placeholder="you@company.com"
              />
              {fieldErrors.email ? <span className="block text-xs text-red-500">{fieldErrors.email}</span> : null}
            </label>

            <div ref={projectTypeRef} className="relative min-w-0 space-y-2 text-sm text-muted">
              <span>Project type</span>
              <button
                type="button"
                aria-expanded={projectTypeOpen}
                aria-invalid={Boolean(fieldErrors.projectType)}
                onClick={() => setProjectTypeOpen((current) => !current)}
                className="flex w-full min-w-0 items-center justify-between gap-3 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-left text-ink outline-none transition hover:border-accent/50 focus:border-accent aria-[invalid=true]:border-red-400"
              >
                <span className="min-w-0 truncate">{form.projectType}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition ${projectTypeOpen ? "rotate-180" : ""}`} />
              </button>

              {projectTypeOpen ? (
                <div
                  className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-line bg-card p-1 shadow-card"
                  role="listbox"
                >
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      role="option"
                      aria-selected={form.projectType === type}
                      onClick={() => {
                        updateField("projectType", type);
                        setProjectTypeOpen(false);
                      }}
                      className="flex w-full min-w-0 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition hover:bg-accent/10 hover:text-accent aria-selected:bg-accent/10 aria-selected:text-accent"
                    >
                      <span className="truncate">{type}</span>
                    </button>
                  ))}
                </div>
              ) : null}
              {fieldErrors.projectType ? <span className="block text-xs text-red-500">{fieldErrors.projectType}</span> : null}
            </div>

            <label className="min-w-0 space-y-2 text-sm text-muted">
              <span>Timeline</span>
              <input
                value={form.timeline}
                onChange={(event) => updateField("timeline", event.target.value)}
                className="block w-full min-w-0 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent"
                placeholder="Example: 4-6 weeks"
              />
            </label>
          </div>

          <label className="mt-4 block min-w-0 space-y-2 text-sm text-muted">
            <span>Budget range</span>
            <input
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              className="block w-full min-w-0 rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="Example: 1L-3L, 3L-5L, or not sure yet"
            />
          </label>

          <label className="mt-4 block min-w-0 space-y-2 text-sm text-muted">
            <span>Project requirement</span>
            <textarea
              required
              value={form.message}
              aria-invalid={Boolean(fieldErrors.message)}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              className="block w-full min-w-0 resize-none rounded-lg border border-line bg-midnight/50 px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-accent aria-[invalid=true]:border-red-400"
              placeholder="Briefly explain what you want to build, the problem, and any important features."
            />
            {fieldErrors.message ? <span className="block text-xs text-red-500">{fieldErrors.message}</span> : null}
          </label>

          {fieldErrors.contact ? (
            <p className="mt-4 rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-600">
              {fieldErrors.contact}
            </p>
          ) : null}

          {status === "success" ? (
            <p className="mt-4 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700">
              Requirement received. Rubynox will review it and contact you soon.
            </p>
          ) : null}

          {status === "error" ? (
            <p className="mt-4 rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={status === "loading"}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Submit Requirement
            </button>
            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card/70 px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/70 hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" />
              Continue on WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
