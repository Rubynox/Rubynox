import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="section-band relative mt-24 border-t border-line">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-24 w-full -skew-y-2 bg-accent/10 blur-2xl" />
      </div>

      <div className="section-shell py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">Rubynox</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We build clean, reliable software systems and automation solutions that help
              businesses scale without complexity.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link href="/#services">Web Development</Link></li>
              <li><Link href="/#services">Mobile Apps</Link></li>
              <li><Link href="/#services">AI Solutions</Link></li>
              <li><Link href="/#services">Automation</Link></li>
              <li><Link href="/#services">Custom Software</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#work">Case Studies</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@rubynox.com">hello@rubynox.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 87796 36850</span>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl("Hi Rubynox, I want to discuss a requirement.")}
                  className="inline-flex items-center gap-2 text-accent transition hover:text-accent-soft"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Rubynox. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
