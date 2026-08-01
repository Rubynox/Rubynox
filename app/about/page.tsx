import type { Metadata } from "next";
import { Chatbot } from "@/components/chatbot";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Rubynoxx builds websites, custom software, AI solutions, automation systems, dashboards, CRM systems, and business platforms.",
  alternates: {
    canonical: "/about"
  }
};

const values = [
  "Understand the business problem before recommending technology.",
  "Keep the first version useful, clear, and realistic.",
  "Communicate trade-offs in plain language.",
  "Build systems that are maintainable after launch."
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-midnight">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="noise-layer absolute inset-[-5%] opacity-[0.07]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        <div className="page-stack">
          <StackedCardController />
          <section className="stacked-section page-banner mt-24 px-5 pb-16 pt-12 sm:mt-28 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                About Rubynoxx
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                A software company built for business owners who need clarity.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                Rubynoxx was started to help growing businesses move from scattered ideas, manual work,
                and unclear digital presence into practical websites, software, automation, and AI systems.
              </p>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Why We Started",
                  text: "Many businesses know they need better digital systems, but do not know where to start. Rubynoxx exists to make that path clearer."
                },
                {
                  title: "Mission",
                  text: "We build digital solutions that help companies improve operations, communicate better, and grow with reliable technical foundations."
                },
                {
                  title: "How We Work",
                  text: "We listen first, define the right first version, build in stages, and keep the next decision understandable for the client."
                }
              ].map((item) => (
                <article key={item.title} className="rounded-xl border border-line bg-card/95 p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="stacked-section stacked-section-muted px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Core principles
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                Technology should make the business easier to run.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                We avoid adding complexity for its own sake. Every project should have a clear business reason,
                a clear user workflow, and a clear path to launch.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="rounded-xl border border-line bg-card/95 p-6 text-sm leading-6 text-muted shadow-card">
                  {value}
                </div>
              ))}
            </div>
            </div>
          </section>

          <section className="stacked-section px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Client collaboration
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                A structured process for non-technical and technical teams.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                We work with founders, business owners, and internal teams by translating goals into requirements,
                requirements into buildable stages, and each stage into reviewable progress. The aim is simple:
                deliver software that solves the right problem and can keep supporting the business after launch.
              </p>
            </div>
          </section>
        </div>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
