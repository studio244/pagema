import { supabase } from "@/integrations/supabase/client";

export type ContactChannel = "phone" | "website" | "whatsapp";

const VISITOR_KEY = "pagema-visitor";

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function visitorId(): string {
  const s = store();
  const existing = s?.getItem(VISITOR_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  s?.setItem(VISITOR_KEY, id);
  return id;
}

/**
 * Records that this visitor contacted the agency (call, website or WhatsApp click).
 * Returns true the first time for this visitor and agency, i.e. when the public
 * "demandes de contact" count goes up by one. Never throws: tracking must not block the click.
 */
export function trackAgencyContact(slug: string, channel: ContactChannel): boolean {
  try {
    const key = `pagema-contacted-${slug}`;
    const firstTime = !store()?.getItem(key);
    store()?.setItem(key, "1");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    void (supabase as any)
      .from("agency_contact_events")
      .insert({ agency_slug: slug, channel, visitor_id: visitorId() })
      .then(({ error }: { error: { message: string } | null }) => {
        if (error) console.warn("agency contact tracking failed:", error.message);
      });
    window.fbq?.("track", "Contact", { content_name: slug, channel });
    window.gtag?.("event", "agency_contact", { agency: slug, channel });
    return firstTime;
  } catch (error) {
    console.warn("agency contact tracking failed", error);
    return false;
  }
}
