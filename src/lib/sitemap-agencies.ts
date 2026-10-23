import type { SitemapEntry } from "./sitemap";

export type PublicAgencySlug = { slug: string };
export const SITEMAP_AGENCY_PAGE_SIZE = 500;

/** Read every public page; a failed page must reject instead of publishing partial XML. */
export async function publishedAgencySitemapEntries(
  readPage: (from: number, to: number) => Promise<PublicAgencySlug[]>,
): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  for (let from = 0; ; from += SITEMAP_AGENCY_PAGE_SIZE) {
    const rows = await readPage(from, from + SITEMAP_AGENCY_PAGE_SIZE - 1);
    for (const { slug } of rows) {
      if (!slug || /[/\\?#]/.test(slug)) throw new Error("Invalid published agency slug");
      const segment = encodeURIComponent(slug);
      entries.push({ path: `/services/${segment}` }, { path: `/ar/services/${segment}` });
    }
    if (rows.length < SITEMAP_AGENCY_PAGE_SIZE) return entries;
  }
}