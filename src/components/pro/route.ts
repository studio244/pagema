import type { Lang } from "@/lib/i18n";
import { seoHead } from "@/lib/seo";
import { PRO_COPY } from "./copy";

/** Two hero versions only: /pro (A) and /pro?h=b (B), same for /ar/pro. */
export function validateProSearch(search: Record<string, unknown>): { h?: "b" } {
  return search["h"] === "b" ? { h: "b" } : {};
}

export function proHead(lang: Lang) {
  const copy = PRO_COPY[lang];
  // The canonical URL has no ?h=b, so both hero versions count as one page for Google.
  return seoHead({
    lang,
    paths: { fr: "/pro", ar: "/ar/pro" },
    title: copy.meta.title,
    description: copy.meta.description,
    ogDescription: copy.meta.ogDescription,
  });
}
