import { CheckCircle2 } from "lucide-react";

const points = [
  "Answer common customer questions quickly.",
  "Collect lead details before your team joins.",
  "Reduce manual sorting, reports, and repeated updates.",
  "Connect with forms, WhatsApp links, dashboards, CRM records, and internal workflows."
];

export function AIAssistSection() {
  return (
    <section id="ai" className="stacked-section py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
            AI tools
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            AI that saves time without adding confusion.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-line bg-card/95 p-6 shadow-card sm:p-8">
          <div className="absolute right-0 top-0 h-full w-1 bg-accent" />
          <p className="text-base leading-7 text-muted sm:text-lg">
            We use AI for practical work: faster replies, better lead details, cleaner notes,
            and simple handoffs to your team.
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
