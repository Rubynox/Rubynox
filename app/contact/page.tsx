import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Chatbot } from "@/components/chatbot";
import { SiteHeader } from "@/components/site-header";
import { StackedCardController } from "@/components/stacked-card-controller";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rubunoxx for websites, apps, AI tools, automation, dashboards, CRM systems, and custom software.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-midnight">
      <div className="relative z-10">
        <SiteHeader />

        <div className="page-stack">
          <StackedCardController />
          <section className="stacked-section mt-24 px-5 pb-20 pt-12 sm:mt-28 sm:px-8 sm:pt-16 lg:px-12">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">
                Contact Rubunoxx
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                Let us talk about your project.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                The full requirement form is on the homepage. For faster replies, WhatsApp is best.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildWhatsAppUrl("Hi Rubunoxx, I want to discuss a requirement.")}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition hover:bg-accent-soft"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/#contact"
                  className="focus-ring inline-flex items-center justify-center rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/60 hover:text-accent"
                >
                  Open requirement form
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <StickyWhatsApp />
      <Chatbot />
    </main>
  );
}
