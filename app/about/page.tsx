import type { Metadata } from "next";
import { Chatbot } from "@/components/chatbot";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Rubunoxx, a software company that builds websites, apps, AI tools, automation, dashboards, CRM systems, and custom software.",
  alternates: {
    canonical: "/about"
  }
};

const values = [
  "Keep the first version useful and clear.",
  "Use simple language and honest planning.",
  "Build systems people can use every day.",
  "Protect performance, security, and long-term maintainability."
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
          <section className="stacked-section mt-24 px-5 pb-16 pt-12 sm:mt-28 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                About Rubunoxx
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                We build useful software for growing businesses.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                Rubunoxx helps business owners and teams turn messy workflows into clear websites,
                apps, AI tools, dashboards, CRM systems, and automation.
              </p>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Our Story",
                  text: "Rubunoxx started with a simple idea: business software should be clear, fast, and useful from day one."
                },
                {
                  title: "Mission",
                  text: "We help businesses save time, serve customers better, and make better decisions with reliable software."
                },
                {
                  title: "Why Rubunoxx",
                  text: "We keep planning simple, explain trade-offs clearly, and build systems around your real workflow."
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
                How we work
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                Small steps. Clear reviews. Strong delivery.
              </h2>
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
                Team style
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                A focused software team for business owners.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                We work like a product partner: understand the problem, plan the first useful version,
                build carefully, test properly, and keep the next step clear.
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
