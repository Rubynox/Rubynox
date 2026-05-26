import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/site-data";

export function CaseStudies() {
  return (
    <section id="work" className="stacked-section stacked-section-muted py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Case studies
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Real-world proof from Rubynoxx projects.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent-soft"
          >
            See case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="group flex h-full flex-col rounded-xl border border-line bg-card/95 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-ink">
                  {study.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-accent" />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                {study.mobileSummary}
              </p>
              <p className="mt-auto border-t border-line pt-5 text-sm font-medium leading-6 text-ink">
                {study.result}
              </p>
              {"link" in study && study.link ? (
                <a
                  href={study.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent-soft"
                >
                  Visit project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
