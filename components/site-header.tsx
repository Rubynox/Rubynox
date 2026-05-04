"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "AI", href: "/#ai" },
  { label: "Process", href: "/#process" },
  { label: "Case Studies", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div
          className="
          flex items-center justify-between
          min-h-[72px]
          rounded-none sm:rounded-2xl
          border border-line
          bg-[rgb(var(--color-card))]/85
          backdrop-blur-xl
          px-6
          shadow-[0_10px_30px_rgba(15,61,94,0.12)]
        "
        >
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] text-muted">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition duration-200 hover:text-[rgb(var(--color-accent))]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
{/* 
          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
              className="
                hidden sm:inline-flex items-center gap-2
                rounded-full bg-[rgb(var(--color-accent))]
                px-5 py-2.5 text-sm font-medium text-white
                transition duration-200
                hover:bg-[rgb(var(--color-accent-soft))]
                hover:shadow-[0_6px_20px_rgba(15,61,94,0.25)]
              "
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-lg border border-line p-2 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <div className="rounded-2xl border border-line bg-[rgb(var(--color-card))] p-6 shadow-xl">
            <nav className="flex flex-col gap-4 text-sm text-muted">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line pb-2 last:border-none hover:text-[rgb(var(--color-accent))]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-line pt-6">
              <a
                href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
                className="flex items-center justify-center gap-2 rounded-full bg-[rgb(var(--color-accent))] px-5 py-3 text-sm font-medium text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Start on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}