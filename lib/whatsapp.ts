const defaultWhatsAppNumber = "918779636850";

export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultWhatsAppNumber;
}

export function buildWhatsAppUrl(message: string) {
  const number = getWhatsAppNumber().replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
