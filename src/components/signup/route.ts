import type { Lang } from "@/lib/i18n";
import { SIGNUP_COPY } from "./copy";

export function signupHead(lang: Lang) {
  const copy = SIGNUP_COPY[lang];
  return {
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.title },
      { property: "og:description", content: copy.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: copy.meta.locale },
    ],
    links: [
      { rel: "alternate", hrefLang: "fr", href: "https://page.ma/inscription" },
      { rel: "alternate", hrefLang: "ar", href: "https://page.ma/ar/inscription" },
      { rel: "alternate", hrefLang: "x-default", href: "https://page.ma/inscription" },
    ],
  };
}
