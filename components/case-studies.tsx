import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    title: "Service Business CRM",
    mobileSummary: "Centralized leads and follow-ups into one CRM with WhatsApp handoff.",
    problem:
      "Leads were coming from calls, forms, WhatsApp, and referrals. Follow-ups were getting missed because everything lived in different places.",
    solution:
      "Built a simple CRM with lead stages, reminders, team notes, and WhatsApp handoff for quick follow-ups.",
    result:
      "All enquiries were tracked in one place. Follow-ups became consistent, and response time improved across the team."
  },
  {
    title: "Operations Dashboard",
    mobileSummary: "Replaced spreadsheet reporting with one clean operations dashboard.",
    problem:
      "Managers relied on multiple spreadsheets to track orders, revenue, delays, and team workload.",
    solution:
      "Created a clean dashboard combining key data with filters, daily summaries, and clear status tracking.",
    result:
      "Reports became easier to read, review meetings became faster, and issues were identified earlier."
  },
  {
    title: "AI Assisted Support",
    mobileSummary: "Handled routine queries instantly and routed serious enquiries to the team.",
    problem:
      "Customer queries were repetitive and time-consuming, but important enquiries still needed human attention.",
    solution:
      "Implemented a guided assistant to handle common queries and route serious enquiries directly to WhatsApp.",
    result:
      "Routine questions were handled instantly while valuable leads reached the team faster."
  }
];

export function CaseStudies() {
  return (
    <section id="work" className="border-t border-line py-20 sm:py-24">
      <div className="section-shell">
        
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">
            Case studies
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl leading-tight">
            Real problems solved
            <br className="hidden sm:block" />
            with practical systems.
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="group rounded-xl border border-line bg-card/95 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow sm:p-6"
            >
              {/* Title */}
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-ink">
                  {study.title}
                </h3>

                <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-accent" />
              </div>

              {/* Content */}
              <p className="mt-4 text-sm leading-6 text-muted sm:hidden">
                {study.mobileSummary}
              </p>

              <div className="mt-6 hidden space-y-5 text-sm leading-6 sm:block">
                
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Problem
                  </p>
                  <p className="mt-1 text-muted">{study.problem}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Solution
                  </p>
                  <p className="mt-1 text-muted">{study.solution}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Result
                  </p>
                  <p className="mt-1 font-medium text-ink">{study.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
