import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  HeartPulse,
  Landmark,
  Rocket,
  ServerCog,
  Sparkles,
  Wrench
} from "lucide-react";

export const serviceGroups = [
  {
    title: "Corporate Web Solutions",
    icon: Building2,
    items: ["Business Websites", "Corporate Platforms", "Landing Pages", "Brand Website Redesign"]
  },
  {
    title: "Web Applications & Systems",
    icon: ServerCog,
    items: ["Custom Business Dashboards", "CRM & ERP Integrations", "Internal Business Tools"]
  },
  {
    title: "Digital Automation",
    icon: Sparkles,
    items: ["Workflow & Process Automation", "AI Web Integrations", "Smart Business Ecosystems"]
  },
  {
    title: "Product Engineering",
    icon: Wrench,
    items: ["SaaS Platforms", "Custom Applications", "API Solutions"]
  }
];

const industries = [
  { title: "Engineering & Manufacturing", icon: Factory },
  { title: "Finance & Loan Platforms", icon: Landmark },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Startups & SMEs", icon: Rocket },
  { title: "Real Estate", icon: Building2 },
  { title: "Professional Services", icon: BadgeCheck }
];

export function Services() {
  return (
    <section id="services" className="stacked-section corporate-services py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Services
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Expanding your company’s web footprint with structure.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base leading-7 text-muted">
              Rubynoxx helps businesses move from a basic online listing to a credible corporate
              presence, connected workflows, and scalable digital platforms.
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

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceGroups.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-xl border border-line bg-card/95 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{service.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
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

        <div className="mt-16 border-t border-line pt-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Who we work with
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Industries We Serve
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;

              return (
                <article key={industry.title} className="rounded-xl border border-line bg-card/92 p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-ink">{industry.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
