import type { Metadata } from "next";
import { Chatbot } from "@/components/chatbot";
import { serviceGroups } from "@/components/services";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Rubynoxx services include corporate web solutions, web applications, digital automation, SaaS platforms, API solutions, and online presence systems.",
  alternates: {
    canonical: "/services"
  }
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-midnight">
      <div className="relative z-10">
        <SiteHeader />

        <div className="page-stack">
          <StackedCardController />
          <section className="stacked-section page-banner mt-24 px-5 pb-12 pt-12 sm:mt-28 sm:px-8 sm:pt-16 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Rubynoxx services
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Websites, software, automation, and AI for business growth.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                Choose one service or combine a few. We help you solve operational problems, improve credibility,
                and build digital systems your team can rely on.
              </p>
            </div>
          </section>

          <section className="stacked-section corporate-services px-5 pb-20 pt-12 sm:px-8 lg:px-12">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {serviceGroups.map((service) => {
                const Icon = service.icon;

                return (
                  <article key={service.title} className="rounded-xl border border-line bg-card/95 p-6 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-ink">{service.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
                      {service.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
