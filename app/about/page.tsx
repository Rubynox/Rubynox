import { Chatbot } from "@/components/chatbot";
import { SiteHeader } from "@/components/site-header";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="ambient-field absolute inset-0" />
        <div className="noise-layer absolute inset-[-5%] opacity-[0.18]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        <section className="section-shell py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              About Rubynox
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Rubynox builds clean, reliable software systems for businesses that want clarity,
              speed, and long-term scalability.
            </p>

            <div className="mt-14 space-y-10">
              <div className="rounded-2xl border border-line bg-card/90 p-6 shadow-card">
                <h2 className="text-xl font-semibold text-ink">What we do</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  We design and develop web apps, mobile apps, dashboards, automation systems,
                  and AI-assisted tools that solve real operational problems, not just demos.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-card/90 p-6 shadow-card">
                <h2 className="text-xl font-semibold text-ink">How we work</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  We start by understanding your workflow, then build a simple and scalable
                  system around it. We avoid unnecessary complexity and focus on practical execution.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-card/90 p-6 shadow-card">
                <h2 className="text-xl font-semibold text-ink">Why businesses choose us</h2>
                <ul className="mt-3 space-y-2 text-muted">
                  <li>- Clear planning before development</li>
                  <li>- Systems built for real usage, not theory</li>
                  <li>- Automation that reduces manual effort</li>
                  <li>- Clean architecture for future growth</li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <a
                href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
              >
                Talk to us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
