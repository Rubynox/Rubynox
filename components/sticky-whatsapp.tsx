import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function StickyWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl("Hi Rubynoxx, I have a requirement. Let's discuss it.")}
      className="focus-ring fixed bottom-6 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/45 bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.32)] transition hover:-translate-y-0.5 hover:bg-[#1fb85a] sm:w-auto sm:px-5"
      aria-label="Chat with Rubynoxx on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
