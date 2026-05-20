const defaultWhatsAppNumber = "918779636850";

export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || defaultWhatsAppNumber;
}

export function buildWhatsAppUrl(message: string) {
  const number = getWhatsAppNumber().replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function notifyWhatsApp(memo: string) {
  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = (process.env.WHATSAPP_NOTIFY_NUMBER || defaultWhatsAppNumber).replace(/\D/g, "");

  if (!token || !phoneNumberId) {
    return {
      sent: false,
      reason: "WhatsApp Cloud API credentials are not configured.",
      fallbackUrl: buildWhatsAppUrl(memo)
    };
  }

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        preview_url: false,
        body: memo.slice(0, 3900)
      }
    })
  });

  if (!response.ok) {
    return {
      sent: false,
      reason: "WhatsApp Cloud API rejected the message.",
      fallbackUrl: buildWhatsAppUrl(memo)
    };
  }

  return { sent: true, reason: null, fallbackUrl: null };
}
