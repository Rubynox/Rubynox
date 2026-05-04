"use client";

import { ArrowDown, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const proofPoints = [
  "Automation-first delivery",
  "Reliable business systems",
  "Clear execution from idea to launch"
];

export function Hero() {
  return (
    <section className="relative section-shell flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-12rem] top-12 h-[26rem] w-[26rem] rounded-full bg-accent-soft/8 blur-3xl" />
        <div className="absolute left-[-14rem] top-36 h-[22rem] w-[22rem] rounded-full bg-accent/6 blur-3xl" />
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex rounded-full border border-accent/15 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent shadow-sm"
          >
            AI-powered software agency
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            Build faster. Automate smarter.
            <br />
            <span className="text-accent">Scale without chaos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl"
          >
            We help businesses build reliable software and automate daily operations using AI,
            so teams can focus on growth instead of manual work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
              className="group focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              <MessageCircle className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
              Chat on WhatsApp
            </a>

            <a
              href="#services"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-ink shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent"
            >
              Explore Services
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          aria-hidden="true"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-accent-soft/5" />
          <div className="relative rounded-[1.5rem] border border-line bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Business systems</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Calm operations, cleaner growth.</h2>
              </div>
              <div className="h-12 w-12 rounded-2xl border border-accent/15 bg-accent/8" />
            </div>

            <div className="mt-7 space-y-4">
              {[
                ["Lead workflow", "Captured, routed, followed up"],
                ["Team dashboard", "Status, owners, priorities"],
                ["AI support", "Simple answers, human handoff"]
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-line bg-midnight/45 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-sm">
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

            <div className="mt-6 rounded-2xl border border-accent/15 bg-accent/6 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Project clarity</span>
                <span className="font-semibold text-accent">92%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-card">
                <div className="h-full w-[92%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32 }}
        className="mt-16 grid gap-4 rounded-2xl border border-line bg-card p-4 text-sm text-muted shadow-sm sm:grid-cols-3 sm:p-5"
      >
        {proofPoints.map((point) => (
          <p key={point} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {point}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
