import type { Lang } from "@/lib/i18n";
import { PRO_COPY } from "./copy";

/** Two hero versions only: /pro (A) and /pro?h=b (B), same for /ar/pro. */
export function validateProSearch(search: Record<string, unknown>): { h?: "b" } {
  return search["h"] === "b" ? { h: "b" } : {};
}

export function proHead(lang: Lang) {
  const copy = PRO_COPY[lang];
  return {
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.title },
      { property: "og:description", content: copy.meta.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: copy.meta.locale },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "alternate", hrefLang: "fr", href: "https://page.ma/pro" },
      { rel: "alternate", hrefLang: "ar", href: "https://page.ma/ar/pro" },
      { rel: "alternate", hrefLang: "x-default", href: "https://page.ma/pro" },
    ],
  };
}
