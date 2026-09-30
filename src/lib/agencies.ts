import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/lib/i18n";
import { SEED_AGENCIES } from "./agencies-seed";

/** One row of the public.agencies table (see supabase/migrations/20260930100000_agencies.sql). */
export type Agency = {
  slug: string;
  name: string;
  logo_url: string | null;
  summary_fr: string | null;
  summary_ar: string | null;
  description_fr: string | null;
  description_ar: string | null;
  /** French service names, same values as CATEGORIES and the forms. */
  services: string[];
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  is_partner: boolean;
  is_verified: boolean;
  /** "Clients générés par Page.ma", entered by hand in Supabase. */
  clients_generated: number;
};

const COLUMNS =
  "slug, name, logo_url, summary_fr, summary_ar, description_fr, description_ar, services, phone, website, address, city, is_partner, is_verified, clients_generated";

// The generated Supabase types don't include this table until Lovable regenerates them.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const agenciesTable = () => (supabase as any).from("agencies");

/** Published agencies, partners first. */
export async function fetchAgencies(): Promise<Agency[]> {
  const { data, error } = await agenciesTable()
    .select(COLUMNS)
    .eq("published", true)
    .order("sort_order")
    .order("name");
  if (error) {
    console.warn("agencies table unavailable, using the built-in partner list:", error.message);
    return SEED_AGENCIES;
  }
  return data as Agency[];
}

/**
 * Visitors who contacted this agency from its page (call, website, WhatsApp), counted once each.
 * 0 while the agency_stats migration is not applied.
 */
export async function fetchContactCount(slug: string): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).rpc("agency_contact_counts");
  if (error) {
    console.warn("agency contact counts unavailable:", error.message);
    return 0;
  }
  const row = (data as { agency_slug: string; contacts: number }[]).find(
    (r) => r.agency_slug === slug,
  );
  return Number(row?.contacts ?? 0);
}

/** One published agency, or null when the slug is unknown. */
export async function fetchAgency(slug: string): Promise<Agency | null> {
  const { data, error } = await agenciesTable()
    .select(COLUMNS)
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.warn("agencies table unavailable, using the built-in partner list:", error.message);
    return SEED_AGENCIES.find((a) => a.slug === slug) ?? null;
  }
  return (data as Agency | null) ?? null;
}

export function agencySummary(agency: Agency, lang: Lang): string | null {
  return lang === "ar"
    ? (agency.summary_ar ?? agency.summary_fr)
    : (agency.summary_fr ?? agency.summary_ar);
}

export function agencyDescription(agency: Agency, lang: Lang): string | null {
  return lang === "ar"
    ? (agency.description_ar ?? agency.description_fr)
    : (agency.description_fr ?? agency.description_ar);
}

/** "https://example.ma" for links, whatever the admin typed ("example.ma", "www.example.ma"…). */
export function websiteHref(website: string): string {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

/** "example.ma" for display. */
export function websiteLabel(website: string): string {
  return website
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}

/** What to search on the map: the address (plus the city when missing from it), else the city. */
export function agencyMapQuery(agency: Agency): string | null {
  const { address, city } = agency;
  if (address)
    return city && !address.includes(city) ? `${address}, ${city}, Maroc` : `${address}, Maroc`;
  return city ? `${city}, Maroc` : null;
}

/** Google Maps page for the agency (opens in a new tab). */
export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Keyless Google Maps embed, shown in an iframe on the agency page. */
export function mapsEmbed(query: string, lang: Lang): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=${lang}&z=15&output=embed`;
}

export function agencyPath(lang: Lang, slug?: string): string {
  const base = lang === "ar" ? "/ar/services" : "/services";
  return slug ? `${base}/${slug}` : base;
}
