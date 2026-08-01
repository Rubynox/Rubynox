import { CheckCircle2 } from "lucide-react";

const points = [
  "Business requirement discovery",
  "Feature recommendations",
  "Technology suggestions",
  "Project roadmap",
  "Budget estimation",
  "Timeline estimation"
];

export function AIAssistSection() {
  return (
    <section id="ai" className="stacked-section py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
            AI Project Advisor
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Describe your business and we will recommend the right digital solution based on your goals.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-line bg-card/95 p-6 shadow-card sm:p-8">
          <div className="absolute right-0 top-0 h-full w-1 bg-accent" />
          <p className="text-base leading-7 text-muted sm:text-lg">
            Rubynoxx AI works like a first-step project consultant. It helps clarify your business problem,
            identify the right type of solution, and prepare a useful brief before a consultation.
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
