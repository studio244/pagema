import type { Lang } from "@/lib/i18n";
import { seoHead } from "@/lib/seo";
import { SIGNUP_COPY } from "./copy";

export function signupHead(lang: Lang) {
  const copy = SIGNUP_COPY[lang];
  // Form-only page, same offer as /pro: kept out of search results so it doesn't compete with /pro.
  return seoHead({
    lang,
    paths: { fr: "/inscription", ar: "/ar/inscription" },
    title: copy.meta.title,
    description: copy.meta.description,
    noindex: true,
  });
}
