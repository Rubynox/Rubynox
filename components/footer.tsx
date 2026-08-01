import Link from "next/link";
import { Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="site-footer-inverse relative border-t border-line">
      <div className="section-shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">Rubynoxx</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Building websites, software, automation systems, and AI solutions that help businesses grow.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link className="transition hover:text-accent" href="/services">Business Websites</Link></li>
              <li><Link className="transition hover:text-accent" href="/services">Mobile Apps</Link></li>
              <li><Link className="transition hover:text-accent" href="/services">AI Solutions</Link></li>
              <li><Link className="transition hover:text-accent" href="/services">Business Automation</Link></li>
              <li><Link className="transition hover:text-accent" href="/services">Custom Software</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link className="transition hover:text-accent" href="/about">About</Link></li>
              <li><Link className="transition hover:text-accent" href="/work">Case Studies</Link></li>
              <li><Link className="transition hover:text-accent" href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a className="transition hover:text-accent" href="mailto:hello@rubynoxx.com">
                  hello@rubynoxx.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 87796 36850</span>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl("Hi Rubynoxx, I want to discuss a requirement.")}
                  className="inline-flex items-center gap-2 text-accent transition hover:text-accent-soft"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/rubynoxx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent transition hover:text-accent-soft"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Rubynoxx. All rights reserved.</p>
          <div className="flex gap-6">
            <Link className="transition hover:text-accent" href="/privacy">Privacy</Link>
            <Link className="transition hover:text-accent" href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
