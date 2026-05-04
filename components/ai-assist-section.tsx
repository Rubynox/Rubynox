import { CheckCircle2 } from "lucide-react";

const points = [
  "Automate repeated tasks without forcing your team to change everything overnight.",
  "Reduce manual data entry, lead sorting, follow-ups, and report preparation.",
  "Use AI where it saves time, with simple controls and a clear handoff to people.",
  "Connect AI support with WhatsApp, forms, dashboards, CRM records, and internal workflows."
];

export function AIAssistSection() {
  return (
    <section id="ai" className="border-t border-line py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">AI support</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Practical AI that helps your team move faster.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-line bg-card/95 p-6 shadow-card sm:p-8">
          <div className="absolute right-0 top-0 h-full w-1 bg-accent" />
          <p className="text-lg leading-8 text-muted">
            We treat AI as a support tool, not a replacement for good systems. The goal is simple:
            less repetitive work, faster decisions, cleaner daily operations, and better response
            times for customers without making your process harder to manage.
          </p>

          <div className="mt-8 space-y-4">
            {points.map((point) => (
              <div key={point} className="flex gap-3 text-muted">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
