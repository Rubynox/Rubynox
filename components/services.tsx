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
    description: "Professional websites that help businesses look credible, explain services clearly, and turn visitors into enquiries.",
    items: ["Business Websites", "Corporate Platforms", "Landing Pages", "Brand Website Redesign"]
  },
  {
    title: "Web Applications & Systems",
    icon: ServerCog,
    description: "Custom software that improves workflows, gives teams better visibility, and reduces dependence on spreadsheets.",
    items: ["Custom Business Dashboards", "CRM & ERP Integrations", "Internal Business Tools"]
  },
  {
    title: "Digital Automation",
    icon: Sparkles,
    description: "Automation that reduces repetitive manual work, missed follow-ups, delayed approvals, and routine status checking.",
    items: ["Workflow & Process Automation", "AI Web Integrations", "Smart Business Ecosystems"]
  },
  {
    title: "Product Engineering",
    icon: Wrench,
    description: "Structured product development for founders and companies building scalable digital products or internal platforms.",
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
              Digital solutions built around real business problems.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base leading-7 text-muted">
              Rubynoxx builds websites, software, automation, and AI solutions that improve credibility,
              operations, customer response, and decision-making.
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
                <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
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
              Experience Across Key Industries
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Our engineering approach allows us to build custom software for businesses across many industries.
            </p>
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
