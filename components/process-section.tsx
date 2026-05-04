const steps = [
  {
    title: "Clarify",
    description:
      "We understand your business, current workflow, users, and the main problem the software should solve."
  },
  {
    title: "Plan",
    description:
      "We define the first useful version, key screens, integrations, timeline, and what can wait for later."
  },
  {
    title: "Build",
    description:
      "We design and develop in clean stages so you can review progress without getting buried in technical details."
  },
  {
    title: "Launch",
    description:
      "We test, deploy, connect the required tools, and help your team start using the system confidently."
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="border-t border-line py-20 sm:py-24">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">Process</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            A simple build process for business owners and teams.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            Every project starts with clarity. We avoid unnecessary complexity and focus on the
            version that can create value quickly, then improve it with real feedback.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="relative overflow-hidden rounded-xl border border-line bg-card/95 p-6 shadow-card">
              <span className="absolute right-4 top-3 text-5xl font-semibold text-accent/10">0{index + 1}</span>
              <span className="text-sm font-semibold text-accent-soft">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
