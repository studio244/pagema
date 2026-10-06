import type { Lang } from "@/lib/i18n";
import { SITE_URL, organizationJsonLd, seoHead } from "@/lib/seo";
import { MARRAKECH_COPY } from "./copy";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Fraunces:wght@400;600;700&display=swap";

export function marrakechHead(lang: Lang) {
  const meta = MARRAKECH_COPY[lang].meta;
  const path = lang === "ar" ? "/ar/annuaire" : "/annuaire";
  const head = seoHead({
    lang,
    paths: { fr: "/annuaire", ar: "/ar/annuaire" },
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
    jsonLd: [
      organizationJsonLd(lang),
      {
        "@type": "Service",
        name: meta.title,
        description: meta.description,
        url: SITE_URL + path,
        inLanguage: lang,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "City", name: lang === "ar" ? "مراكش" : "Marrakech" },
        serviceType:
          lang === "ar"
            ? ["الأمن", "النظافة", "البستنة", "المسابح", "ممون الحفلات"]
            : ["Sécurité", "Nettoyage", "Jardinage", "Piscine", "Traiteur"],
      },
    ],
  });
  return { ...head, links: [{ rel: "stylesheet", href: FONTS }, ...head.links] };
}
