import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-xl border border-line bg-card/95 px-6 py-10 text-center shadow-card sm:px-10 sm:py-14">
          <div className="absolute inset-x-8 top-0 h-1 bg-accent/70" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
            Start a conversation
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Need a website, software system, automation, or AI solution?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
            Share the business problem. We will help you define the right first version and the next step.
          </p>
          <a
            href={buildWhatsAppUrl("Hi Rubynoxx, I have a requirement. Let's discuss it.")}
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-accent-soft"
          >
            Discuss Requirement
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
