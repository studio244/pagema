import type { Lang } from "@/lib/i18n";
import { SITE_URL, organizationJsonLd, seoHead } from "@/lib/seo";
import { CLEANING_COPY } from "./copy";

/** URL of the page in each language. */
export const NETTOYAGE_PATHS: Record<Lang, string> = {
  fr: "/nettoyage-casablanca",
  ar: "/ar/nettoyage-casablanca",
};

/** Full SEO head for the Casablanca cleaning landing page (both languages). */
export function nettoyageHead(lang: Lang) {
  const copy = CLEANING_COPY[lang];
  const meta = copy.meta;
  const url = SITE_URL + NETTOYAGE_PATHS[lang];
  const isArabic = lang === "ar";

  return seoHead({
    lang,
    paths: NETTOYAGE_PATHS,
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
    jsonLd: [
      organizationJsonLd(lang),
      {
        "@type": "Service",
        name: meta.ogTitle,
        description: meta.description,
        url,
        inLanguage: lang,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: isArabic ? "الدار البيضاء" : "Casablanca",
          containedInPlace: { "@type": "Country", name: isArabic ? "المغرب" : "Maroc" },
        },
        serviceType: isArabic
          ? [
              "تنظيف المكاتب",
              "صيانة العمارات",
              "التنظيف المنزلي",
              "تنظيف الزجاج",
              "نهاية الورش",
              "تعقيم المحلات",
            ]
          : [
              "Nettoyage de bureaux",
              "Entretien d'immeubles",
              "Ménage résidentiel",
              "Nettoyage de vitres",
              "Nettoyage de fin de chantier",
              "Désinfection des locaux",
            ],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isArabic ? "الرئيسية" : "Accueil",
            item: SITE_URL + (isArabic ? "/ar" : "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isArabic ? "شركة تنظيف في الدار البيضاء" : "Société de nettoyage à Casablanca",
            item: url,
          },
        ],
      },
    ],
  });
}
