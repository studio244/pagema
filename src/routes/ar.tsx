import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/home/HomePage";

export const Route = createFileRoute("/ar")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Page.ma — منصة الظهور وتوليد الفرص لمقدّمي الخدمات في المغرب" },
      {
        name: "description",
        content:
          "كن مرئياً. استقبل الفرص. طوّر نشاطك. الأمن، النظافة، التشغيل المؤقت، التأمين — في 25 مدينة بالمغرب. سجّل شركتك مسبقاً.",
      },
      {
        property: "og:title",
        content: "Page.ma — منصة الظهور وتوليد الفرص لمقدّمي الخدمات في المغرب",
      },
      {
        property: "og:description",
        content: "كن مرئياً. استقبل الفرص. طوّر نشاطك. مجاني · بدون التزام · بدون رسائل مزعجة",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_MA" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "alternate", hrefLang: "fr", href: "https://page.ma/" },
      { rel: "alternate", hrefLang: "ar", href: "https://page.ma/ar" },
      { rel: "alternate", hrefLang: "x-default", href: "https://page.ma/" },
    ],
  }),
  component: () => <HomePage lang="ar" />,
});
