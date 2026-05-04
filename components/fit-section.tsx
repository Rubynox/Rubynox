const fits = [
  "Businesses replacing spreadsheets with a proper dashboard or CRM.",
  "Founders building an MVP, SaaS platform, or customer portal.",
  "Teams that want automation for follow-ups, reports, approvals, or support.",
  "Companies that need APIs and integrations between existing tools."
];

export function FitSection() {
  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">Best fit</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Built for teams that need useful software, not extra confusion.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fits.map((fit) => (
            <div key={fit} className="rounded-xl border border-line bg-card/95 p-6 text-sm leading-6 text-muted shadow-card">
              {fit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
