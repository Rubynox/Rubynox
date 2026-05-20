import type { Metadata } from "next";
import { Chatbot } from "@/components/chatbot";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Rubunoxx services include web development, mobile app development, AI integration, business automation, CRM systems, dashboards, SaaS development, API integrations, and custom software.",
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
          <section className="stacked-section mt-24 px-5 pb-12 pt-12 sm:mt-28 sm:px-8 sm:pt-16 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Rubunoxx services
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Software services for real business needs.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                Choose one service or combine a few. We help you plan the right first version before
                development starts.
              </p>
            </div>
          </section>

          <section className="stacked-section stacked-section-muted px-5 pb-20 pt-12 sm:px-8 lg:px-12">
            <div className="grid gap-5 lg:grid-cols-2">
            {services.slice(0, 9).map((service) => {
              const Icon = service.icon;

              return (
                <article key={service.title} className="rounded-xl border border-line bg-card/95 p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-ink">{service.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted">{service.explanation}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                        Solves
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">{service.solves}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                        For
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">{service.for}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                        Benefits
                      </p>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-muted">
                        {service.benefits.map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
