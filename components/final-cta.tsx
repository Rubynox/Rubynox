import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-card/95 px-6 py-10 text-center shadow-card sm:px-10 sm:py-14">
          <div className="absolute inset-x-8 top-0 h-1 bg-accent/70" />
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-soft">Start a conversation</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Have a requirement? Let's discuss it.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
            Share what you need. We will help you clarify the scope, the simplest first version, and the next practical step.
          </p>
          <a
            href={buildWhatsAppUrl("Hi Rubynox, I have a requirement. Let's discuss it.")}
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
          >
            Chat on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
