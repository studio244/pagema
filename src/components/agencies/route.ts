import { DICTS, type Lang } from "@/lib/i18n";
import { SITE_URL, seoHead } from "@/lib/seo";
import {
  agencyDescription,
  agencyPath,
  agencySummary,
  websiteHref,
  type Agency,
} from "@/lib/agencies";
import { CATEGORIES } from "@/lib/catalog";
import { AGENCIES_COPY } from "./copy";

export function directoryHead(lang: Lang) {
  const copy = AGENCIES_COPY[lang];
  // ?service=… filters stay on the /services canonical URL.
  return seoHead({
    lang,
    paths: { fr: "/services", ar: "/ar/services" },
    title: copy.meta.title,
    description: copy.meta.description,
  });
}

export function agencyHead(lang: Lang, agency: Agency | undefined) {
  if (!agency) return {};
  const copy = AGENCIES_COPY[lang];
  const services = agency.services
    .map((s) => DICTS[lang].categoryLabels[s] ?? s)
    .join(lang === "ar" ? "، " : ", ");
  const description =
    agencySummary(agency, lang) ?? copy.meta.agencyDescription(agency.name, services);
  const logo = agency.logo_url ? new URL(agency.logo_url, SITE_URL).toString() : undefined;
  return seoHead({
    lang,
    paths: { fr: agencyPath("fr", agency.slug), ar: agencyPath("ar", agency.slug) },
    title: copy.meta.agencyTitle(agency.name),
    description: description.slice(0, 160),
    jsonLd: [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}${agencyPath("fr", agency.slug)}#business`,
        name: agency.name,
        url: SITE_URL + agencyPath(lang, agency.slug),
        ...(logo && { logo, image: logo }),
        ...(agencyDescription(agency, lang) && { description: agencyDescription(agency, lang) }),
        ...(agency.phone && { telephone: agency.phone }),
        ...(agency.website && { sameAs: [websiteHref(agency.website)] }),
        ...((agency.address || agency.city) && {
          address: {
            "@type": "PostalAddress",
            ...(agency.address && { streetAddress: agency.address }),
            ...(agency.city && { addressLocality: agency.city }),
            addressCountry: "MA",
          },
        }),
        knowsAbout: agency.services,
      },
    ],
  });
}

/** Valid ?service= values: the French category names. */
export function validateServiceSearch(search: Record<string, unknown>): { service?: string } {
  const service = search["service"];
  return typeof service === "string" && CATEGORIES.includes(service) ? { service } : {};
}
