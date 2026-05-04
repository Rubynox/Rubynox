"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ThemeToggle } from "@/components/theme-toggle";

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
      
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div
          className="
          flex items-center justify-between
          rounded-none sm:rounded-2xl
          border border-[rgba(15,61,94,0.15)]
          bg-white/80
          backdrop-blur-xl
          px-4 py-3
          shadow-[0_8px_30px_rgba(15,61,94,0.12)]
        "
        >
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-[#0f172a]">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#0f3d5e]" />
            Rubynox
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#475569]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[#0f3d5e]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
              className="
                hidden sm:inline-flex items-center gap-2
                rounded-full bg-[#0f3d5e]
                px-4 py-2 text-sm font-medium text-white
                transition hover:bg-[#1f5f8b]
              "
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <nav className="flex flex-col gap-4 text-sm text-gray-600">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b pb-2 last:border-none hover:text-[#0f3d5e]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-6">
              <a
                href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
                className="flex items-center justify-center gap-2 rounded-full bg-[#0f3d5e] px-5 py-3 text-sm font-medium text-white"
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