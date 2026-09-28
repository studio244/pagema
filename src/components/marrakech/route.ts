import type { Lang } from "@/lib/i18n";
import { MARRAKECH_COPY } from "./copy";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Fraunces:wght@400;600;700&display=swap";

export function marrakechHead(lang: Lang) {
  const meta = MARRAKECH_COPY[lang].meta;
  return {
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.ogTitle },
      { property: "og:description", content: meta.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: meta.locale },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: FONTS },
      { rel: "alternate", hrefLang: "fr", href: "https://page.ma/marrakech" },
      { rel: "alternate", hrefLang: "ar", href: "https://page.ma/ar/marrakech" },
      { rel: "alternate", hrefLang: "x-default", href: "https://page.ma/marrakech" },
    ],
  };
}
