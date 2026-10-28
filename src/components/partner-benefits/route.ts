import type { Lang } from "@/lib/i18n";
import { breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { crumbs } from "@/components/site/nav";
import { PARTNER_COPY } from "./copy";

export function partnerBenefitsHead(lang: Lang) {
  return seoHead({
    lang,
    paths: { fr: "/avantages-partenaires", ar: "/ar/avantages-partenaires" },
    title: PARTNER_COPY[lang].meta.title,
    description: PARTNER_COPY[lang].meta.description,
    jsonLd: [breadcrumbJsonLd(crumbs(lang).partners)],
  });
}
