import type { Lang } from "@/lib/i18n";
import { SITE_NAME, SITE_URL, organizationJsonLd, seoHead } from "@/lib/seo";

const META = {
  fr: {
    title: "Page.ma | Visibilité et clients pour les prestataires au Maroc",
    description:
      "Sécurité, nettoyage, jardinage, piscine… Page.ma rend les prestataires visibles et leur envoie des demandes de clients sur WhatsApp. 25 villes du Maroc.",
    ogDescription:
      "La plateforme de visibilité et de génération de leads pour les prestataires au Maroc. Pré-inscription gratuite, sans engagement.",
  },
  ar: {
    title: "Page.ma | منصة الظهور وتوليد الفرص لمقدّمي الخدمات في المغرب",
    description:
      "الأمن، النظافة، البستنة، المسابح… Page.ma يجعل مقدّمي الخدمات مرئيين ويرسل لهم طلبات الزبناء على واتساب. 25 مدينة في المغرب.",
    ogDescription:
      "منصة الظهور وتوليد الفرص لمقدّمي الخدمات في المغرب. تسجيل مسبق مجاني وبدون التزام.",
  },
} satisfies Record<Lang, { title: string; description: string; ogDescription: string }>;

export function homeHead(lang: Lang) {
  const meta = META[lang];
  const path = lang === "ar" ? "/ar" : "/";
  return seoHead({
    lang,
    paths: { fr: "/", ar: "/ar" },
    title: meta.title,
    description: meta.description,
    ogDescription: meta.ogDescription,
    jsonLd: [
      organizationJsonLd(lang),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}${path}#website`,
        name: SITE_NAME,
        url: SITE_URL + path,
        inLanguage: lang,
        description: meta.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  });
}
