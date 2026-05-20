import type { Metadata } from "next";
import { Chatbot } from "@/components/chatbot";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { caseStudies } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "See simple Rubunoxx case studies for CRM systems, operations dashboards, and AI assisted support.",
  alternates: {
    canonical: "/work"
  }
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-midnight">
      <div className="relative z-10">
        <SiteHeader />

        <div className="page-stack">
          <StackedCardController />
          <section className="stacked-section mt-24 px-5 pb-12 pt-12 sm:mt-28 sm:px-8 sm:pt-16 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Case studies
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Work built around real problems.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                A few examples of the kind of business systems Rubunoxx builds.
              </p>
            </div>
          </section>

          <section className="stacked-section stacked-section-muted px-5 pb-20 pt-12 sm:px-8 lg:px-12">
            <div className="grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article key={study.title} className="rounded-xl border border-line bg-card/95 p-6 shadow-card">
                <h2 className="text-xl font-semibold text-ink">{study.title}</h2>
                <div className="mt-6 space-y-5 text-sm leading-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                      Problem
                    </p>
                    <p className="mt-2 text-muted">{study.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                      Solution
                    </p>
                    <p className="mt-2 text-muted">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                      Result
                    </p>
                    <p className="mt-2 font-medium text-ink">{study.result}</p>
                  </div>
                </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
