"use client";

import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const proofPoints = [
  "Corporate-grade web presence",
  "Clear business positioning",
  "Built for long-term visibility"
];

export function Hero() {
  return (
    <section className="stacked-section corporate-hero mt-24 flex min-h-[calc(100vh-7rem)] flex-col justify-center px-5 py-16 sm:mt-28 sm:px-8 sm:py-20 lg:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex rounded-full border border-accent/15 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent shadow-sm"
          >
            Digital presence for growing businesses
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            We build the digital presence growing businesses deserve.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg"
          >
            From high-converting corporate websites to custom digital platforms, we help your
            business establish a powerful, scalable online presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl("Hi Rubynoxx, I want to book a free consultation.")}
              className="group focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Book Free Consultation
            </a>

            <Link
              href="/work"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-ink shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent"
            >
              View Our Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          aria-hidden="true"
        >
          <div className="rounded-2xl border border-line bg-card/95 p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Online presence framework
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                  Build trust before the first conversation.
                </h2>
              </div>
              <div className="h-12 w-12 rounded-xl border border-accent/15 bg-accent/10" />
            </div>

            <div className="mt-7 space-y-4">
              {[
                ["Corporate positioning", "Present services, proof, and capability with clarity"],
                ["Conversion pathways", "Guide visitors toward WhatsApp, calls, email, and form enquiries"],
                ["Scalable foundations", "Prepare your presence for future platforms and automation"]
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-line bg-midnight-soft/55 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold text-ink">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-accent/15 bg-accent/8 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Presence readiness</span>
                <span className="font-semibold text-accent">94%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-card">
                <div className="h-full w-[94%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32 }}
        className="mt-12 grid gap-4 rounded-xl border border-line bg-card/80 p-4 text-sm text-muted shadow-sm sm:grid-cols-3 sm:p-5"
      >
        {proofPoints.map((point) => (
          <p key={point} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {point}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
