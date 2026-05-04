import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function StickyWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl("Hi Rubynox, I have a requirement. Let's discuss it.")}
      className="focus-ring fixed bottom-24 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-500 text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-auto sm:px-5"
      aria-label="Chat with Rubynox on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
