import type { Lang } from "@/lib/i18n";

export const SITE_URL = "https://page.ma";
export const SITE_NAME = "Page.ma";
export const CONTACT_EMAIL = "contact@page.ma";
export const CONTACT_PHONE = "+212664272854";

/** 1200×630 share images in /public/og (shown by WhatsApp, Facebook, LinkedIn, X…). */
const OG_IMAGE: Record<Lang, { src: string; alt: string }> = {
  fr: {
    src: "/og/pagema-fr.jpg",
    alt: "Page.ma : des prestataires vérifiés près de chez vous, au Maroc",
  },
  ar: {
    src: "/og/pagema-ar.jpg",
    alt: "Page.ma: مقدّمو خدمات موثوقون بالقرب منك في المغرب",
  },
};

const LOCALE: Record<Lang, string> = { fr: "fr_MA", ar: "ar_MA" };

type JsonLd = Record<string, unknown>;

/**
 * Full SEO head for a page that exists in French and Arabic:
 * title, description, canonical, hreflang, Open Graph, Twitter card and optional JSON-LD.
 */
export function seoHead({
  lang,
  paths,
  title,
  description,
  ogTitle = title,
  ogDescription = description,
  noindex = false,
  jsonLd = [],
}: {
  lang: Lang;
  /** Path of the page in each language, e.g. { fr: "/annuaire-ai", ar: "/ar/annuaire-ai" }. */
  paths: Record<Lang, string>;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Keep the page out of search results (links on it are still followed). */
  noindex?: boolean;
  jsonLd?: JsonLd[];
}) {
  const url = SITE_URL + paths[lang];
  const image = OG_IMAGE[lang];
  const imageUrl = SITE_URL + image.src;
  const otherLang: Lang = lang === "fr" ? "ar" : "fr";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:locale", content: LOCALE[lang] },
      { property: "og:locale:alternate", content: LOCALE[otherLang] },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: image.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "fr", href: SITE_URL + paths.fr },
      { rel: "alternate", hrefLang: "ar", href: SITE_URL + paths.ar },
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL + paths.fr },
    ],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", ...data }),
    })),
  };
}

/** Schema.org description of Page.ma itself, reused by the pages' structured data. */
export function organizationJsonLd(lang: Lang): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    areaServed: { "@type": "Country", name: lang === "ar" ? "المغرب" : "Maroc" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      availableLanguage: ["French", "Arabic"],
    },
  };
}
