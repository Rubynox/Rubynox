const steps = [
  {
    title: "Understand",
    description: "We learn your business, users, workflow, and the main problem to solve."
  },
  {
    title: "Plan",
    description: "We define the first useful version, key screens, integrations, timeline, and cost range."
  },
  {
    title: "Build",
    description: "We design and develop in clear stages so you can review progress easily."
  },
  {
    title: "Launch",
    description: "We test, deploy, connect tools, and help your team start using the system."
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="stacked-section stacked-section-muted py-20 sm:py-24">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
            Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            A simple way to go from idea to launch.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            We start with the smallest useful version, then improve it with real feedback.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative overflow-hidden rounded-xl border border-line bg-card/95 p-6 shadow-card"
            >
              <span className="absolute right-4 top-3 text-5xl font-semibold text-accent/10">
                0{index + 1}
              </span>
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
