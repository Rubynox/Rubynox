import { BadgeCheck, LifeBuoy, MessagesSquare, Scaling, ServerCog, Timer } from "lucide-react";

const trustItems = [
  { title: "Scalable Architecture", icon: Scaling },
  { title: "Business-first Approach", icon: BadgeCheck },
  { title: "Modern Tech Stack", icon: ServerCog },
  { title: "Fast Delivery", icon: Timer },
  { title: "Transparent Communication", icon: MessagesSquare },
  { title: "Post-launch Support", icon: LifeBuoy }
];

export function TrustSection() {
  return (
    <section className="stacked-section corporate-trust py-14 sm:py-16">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Why businesses choose Rubynoxx
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Corporate delivery standards for growing businesses.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Clear planning, dependable engineering, and communication that helps business teams move with confidence.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="flex items-center gap-4 rounded-xl border border-line bg-card/95 p-5 shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">{item.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
