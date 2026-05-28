"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-card/90 shadow-sm backdrop-blur-md dark:bg-midnight/90" : "bg-transparent"
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-4 transition-all duration-300 sm:px-6 lg:px-8", scrolled ? "py-2.5" : "py-4")}>
        <div
          className={cn(
            "flex items-center justify-between px-3 transition-all duration-300 sm:px-5",
            scrolled
              ? "min-h-[62px] border border-line bg-card/90 shadow-[0_18px_50px_rgb(var(--shadow-color)/0.16)] backdrop-blur-2xl dark:bg-midnight/90 sm:rounded-2xl"
              : "min-h-[76px] border border-transparent bg-transparent shadow-none"
          )}
        >
          <Link href="/" className="flex items-center" aria-label="Rubynoxx home">
            <Logo />
          </Link>

          <nav className="hidden items-center rounded-full border border-line bg-midnight-soft/45 p-1 text-[14px] font-semibold text-muted md:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className={cn(
                    "premium-nav-link rounded-full px-4 py-2.5 transition duration-200 hover:bg-card hover:text-accent",
                    active ? "bg-card text-accent shadow-sm" : ""
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href={buildWhatsAppUrl("Hi Rubynoxx, I want to discuss a requirement.")}
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-accent-soft sm:inline-flex"
            >
              Start project
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card/80 text-ink md:hidden"
              aria-expanded={open}
              aria-label="Open menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="mx-auto -mt-1 max-w-7xl px-4 md:hidden">
          <div className="rounded-2xl border border-line bg-card/96 p-4 shadow-card backdrop-blur-xl">
            <nav className="flex flex-col text-sm font-semibold text-muted">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-3 transition hover:bg-accent/10 hover:text-accent",
                      active ? "bg-accent/10 text-accent" : ""
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={buildWhatsAppUrl("Hi Rubynoxx, I want to discuss a requirement.")}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast"
            >
              Start project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
