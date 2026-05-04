import {
  BarChart3,
  Bot,
  Braces,
  Blocks,
  CloudCog,
  Code2,
  LayoutDashboard,
  PanelsTopLeft,
  Smartphone,
  Workflow
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Fast, clean websites and web apps designed to convert visitors and support real business goals.",
    icon: PanelsTopLeft
  },
  {
    title: "Mobile App Development",
    description: "Reliable mobile apps built for daily use, smooth performance, and real user engagement.",
    icon: Smartphone
  },
  {
    title: "AI Solutions",
    description: "AI-powered features that reduce manual work, handle queries, and improve everyday efficiency.",
    icon: Bot
  },
  {
    title: "Business Automation",
    description: "Automate repetitive tasks, approvals, and follow-ups so your team can focus on growth.",
    icon: Workflow
  },
  {
    title: "SaaS Development",
    description: "Scalable platforms with user accounts, billing, dashboards, and systems ready to grow with your business.",
    icon: Blocks
  },
  {
    title: "CRM Systems",
    description: "Custom CRM tools to track leads, manage follow-ups, and organize your sales process clearly.",
    icon: LayoutDashboard
  },
  {
    title: "Dashboard & Analytics",
    description: "Simple dashboards that bring your data into one place for faster and better decisions.",
    icon: BarChart3
  },
  {
    title: "API Development",
    description: "Secure APIs that connect your apps, services, and systems without friction.",
    icon: Braces
  },
  {
    title: "System Integration",
    description: "Connect tools like WhatsApp, payments, CRMs, and internal systems into one smooth workflow.",
    icon: CloudCog
  },
  {
    title: "Custom Software",
    description: "Purpose-built software for business processes that standard tools cannot handle properly.",
    icon: Code2
  }
];

export function Services() {
  return (
    <section id="services" className="section-band border-y border-line py-20 sm:py-24">
      <div className="section-shell">
        
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">
              Services
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl leading-tight">
              Built for real business use,
              <br className="hidden sm:block" />
              not just for demos.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-muted">
            We focus on clarity, speed, and systems that actually work in day-to-day operations.
            Start small or build full platforms based on your needs.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-xl border border-line bg-card/95 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-accent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent transition group-hover:border-accent/60 group-hover:bg-accent/15">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-muted">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
