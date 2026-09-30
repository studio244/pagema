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
};

const COLUMNS =
  "slug, name, logo_url, summary_fr, summary_ar, description_fr, description_ar, services, phone, website, address, city, is_partner, is_verified";

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

export function agencyPath(lang: Lang, slug?: string): string {
  const base = lang === "ar" ? "/ar/services" : "/services";
  return slug ? `${base}/${slug}` : base;
}
