import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";

export function Services() {
  return (
    <section id="services" className="stacked-section stacked-section-muted py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Services
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Everything your business needs to look credible online.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base leading-7 text-muted">
              We build business websites, landing pages, lead forms, AI assistants, and follow-up
              workflows that help customers discover and contact you.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent-soft"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-xl border border-line bg-card/95 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.short}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
