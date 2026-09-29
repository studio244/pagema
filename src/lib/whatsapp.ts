import type { Lang } from "@/lib/i18n";

const WHATSAPP_NUMBER = "212664272854";

/** First message pre-filled in WhatsApp when a visitor taps a WhatsApp link. */
const FIRST_MESSAGE: Record<Lang, string> = {
  fr: "Bonjour Page.ma, je souhaite en savoir plus sur vos services.",
  ar: "مرحباً Page.ma، أريد معرفة المزيد عن خدماتكم.",
};

export function whatsappUrl(lang: Lang): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(FIRST_MESSAGE[lang])}`;
}
