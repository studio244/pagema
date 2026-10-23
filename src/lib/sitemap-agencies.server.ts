import { createClient } from "@supabase/supabase-js";
import { publishedAgencySitemapEntries, type PublicAgencySlug } from "./sitemap-agencies";

/** Anonymous published-only reads; never use an admin client or the seed fallback. */
export async function fetchPublishedAgencySitemapEntries() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Public sitemap credentials are unavailable");
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  return publishedAgencySitemapEntries(async (from, to) => {
    const { data, error } = await client.from("agencies").select("slug")
      .eq("published", true).order("slug").range(from, to);
    if (error) throw new Error(`Could not read published sitemap agencies: ${error.message}`);
    if (!data) throw new Error("Published sitemap agencies returned no data");
    return data as PublicAgencySlug[];
  });
}