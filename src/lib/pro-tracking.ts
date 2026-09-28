import { supabase } from "@/integrations/supabase/client";

export type HeroVariant = "a" | "b";
export type ProEvent = "visit" | "cta_click" | "form_start" | "form_submit";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const SESSION_KEY = "pagema-pro-session";
// Steps counted once per session, whatever the number of page reloads or clicks.
const ONCE_PER_SESSION: ProEvent[] = ["visit", "form_start"];

function storage(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function sessionId(): string {
  const store = storage();
  const existing = store?.getItem(SESSION_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  store?.setItem(SESSION_KEY, id);
  return id;
}

function utm(name: string): string | null {
  const value = new URLSearchParams(window.location.search).get(name);
  return value ? value.slice(0, 200) : null;
}

/**
 * Logs one step of the /pro funnel (visit → CTA click → form started → form submitted)
 * to Supabase, and mirrors it to Google Analytics / Meta Pixel when they are loaded.
 * Never throws: tracking must not break the page.
 */
export function trackPro(
  event: ProEvent,
  heroVariant: HeroVariant,
  extra: { category?: string; city?: string } = {},
) {
  try {
    if (ONCE_PER_SESSION.includes(event)) {
      const key = `pagema-pro-${event}`;
      const store = storage();
      if (store?.getItem(key)) return;
      store?.setItem(key, "1");
    }

    window.gtag?.("event", `pro_${event}`, { hero_variant: heroVariant, ...extra });
    if (event === "form_submit")
      window.fbq?.("track", "Lead", { content_category: extra.category });
    else window.fbq?.("trackCustom", `Pro_${event}`, { hero_variant: heroVariant });

    void (supabase as any)
      .from("pro_funnel_events")
      .insert({
        event,
        session_id: sessionId(),
        hero_variant: heroVariant,
        category: extra.category ?? null,
        city: extra.city ?? null,
        utm_source: utm("utm_source"),
        utm_medium: utm("utm_medium"),
        utm_campaign: utm("utm_campaign"),
        utm_content: utm("utm_content"),
      })
      .then(({ error }) => {
        if (error) console.warn("pro funnel tracking failed", error.message);
      });
  } catch (error) {
    console.warn("pro funnel tracking failed", error);
  }
}
