import type { Metadata } from "next";
import { Chatbot } from "@/components/chatbot";
import { ProjectRequirementForm } from "@/components/project-requirement-form";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rubynoxx for websites, custom software, AI automation, dashboards, CRM systems, SaaS platforms, and scalable business systems.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-midnight">
      <div className="relative z-10">
        <SiteHeader />

        <div className="page-stack">
          <StackedCardController />
          <section className="stacked-section page-banner mt-24 px-5 pb-10 pt-12 sm:mt-28 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Contact Rubynoxx
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Start with a clear consultation.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Share your web application, corporate website, or online presence requirement and we will suggest the next step.
              </p>
            </div>
          </section>
          <div>
            <ProjectRequirementForm />
          </div>
        </div>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
