import { DICTS, type Lang } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { CONTACT_EMAIL } from "@/lib/seo";

/**
 * Shared site navigation (header menu, footer, breadcrumbs) for the public pages,
 * in French and Arabic. Every href points to a route that exists in src/routes.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = { id: string; label: string; links: NavLink[] };

/** Trades shown in the "Trouver un prestataire" menu, opened as directory filters. */
const MENU_TRADES = ["Sécurité", "Nettoyage", "Jardinage", "Piscine", "Intérim", "Assurance"];
/** Trades listed in the footer Services column. */
const FOOTER_TRADES = ["Sécurité", "Nettoyage", "Jardinage", "Piscine"];

const COPY = {
  fr: {
    home: "Accueil",
    find: "Trouver un prestataire",
    pros: "Pour les professionnels",
    partners: "Avantages partenaires",
    cta: "Inscrire mon entreprise",
    allAgencies: "Toutes les agences",
    cleaningLocal: "Nettoyage à Casablanca",
    marrakech: "Prestataires à Marrakech",
    trade: { Nettoyage: "Nettoyage / Entretien" } as Record<string, string>,
    grow: "Développer mon activité",
    howItWorks: "Comment ça marche",
    pricing: "Tarifs",
    request: "Décrire mon besoin",
    menu: { open: "Ouvrir le menu", close: "Fermer le menu", main: "Navigation principale" },
    footer: {
      about: "Plateforme marocaine de visibilité et de génération de leads pour les prestataires.",
      pagema: "Page.ma",
      services: "Services",
      pros: "Professionnels",
      info: "Informations",
      directory: "Annuaire des agences",
      pro: "Page.ma Pro à Marrakech",
      whatsapp: "Contact WhatsApp",
      email: "Écrire à Page.ma",
      legal: "Mentions légales · Confidentialité",
      on: "Page.ma sur",
    },
    breadcrumb: "Fil d'Ariane",
  },
  ar: {
    home: "الرئيسية",
    find: "ابحث عن مقدّم خدمة",
    pros: "للمهنيين",
    partners: "مزايا الشركاء",
    cta: "سجّل شركتك",
    allAgencies: "جميع الوكالات",
    cleaningLocal: "التنظيف في الدار البيضاء",
    marrakech: "مقدّمو الخدمات في مراكش",
    trade: { Nettoyage: "النظافة والصيانة" } as Record<string, string>,
    grow: "طوّر نشاطك",
    howItWorks: "كيف يعمل Page.ma",
    pricing: "الأسعار",
    request: "اشرح حاجتك",
    menu: { open: "فتح القائمة", close: "إغلاق القائمة", main: "التنقل الرئيسي" },
    footer: {
      about: "منصة مغربية لتعزيز الحضور وتوليد فرص الأعمال لمزوّدي الخدمات.",
      pagema: "Page.ma",
      services: "الخدمات",
      pros: "المهنيون",
      info: "معلومات",
      directory: "دليل الوكالات",
      pro: "Page.ma Pro في مراكش",
      whatsapp: "تواصل عبر واتساب",
      email: "راسل Page.ma",
      legal: "الإشعارات القانونية · الخصوصية",
      on: "Page.ma على",
    },
    breadcrumb: "مسار التنقل",
  },
};

export function siteCopy(lang: Lang) {
  return COPY[lang];
}

/** Path of a page in the given language: "/services" → "/ar/services". */
export function localPath(lang: Lang, path: string): string {
  if (lang === "fr") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/** Agency directory filtered on one trade (French category name). */
export function tradeHref(lang: Lang, trade: string): string {
  return `${localPath(lang, "/services")}?service=${encodeURIComponent(trade)}`;
}

function tradeLabel(lang: Lang, trade: string): string {
  return COPY[lang].trade[trade] ?? DICTS[lang].categoryLabels[trade] ?? trade;
}

/** Dropdown groups of the main menu. */
export function menuGroups(lang: Lang): NavGroup[] {
  const c = COPY[lang];
  const home = localPath(lang, "/");
  return [
    {
      id: "find",
      label: c.find,
      links: [
        { label: c.allAgencies, href: localPath(lang, "/services") },
        ...MENU_TRADES.map((t) => ({ label: tradeLabel(lang, t), href: tradeHref(lang, t) })),
        { label: c.cleaningLocal, href: localPath(lang, "/nettoyage-casablanca") },
        { label: c.marrakech, href: localPath(lang, "/annuaire") },
      ],
    },
    {
      id: "pros",
      label: c.pros,
      links: [
        { label: c.grow, href: localPath(lang, "/annuaire-ai") },
        { label: c.cta, href: localPath(lang, "/inscription") },
        { label: c.howItWorks, href: `${home}#section-processus` },
        { label: c.pricing, href: `${home}#section-tarifs` },
      ],
    },
  ];
}

/** Columns of the shared footer. */
export function footerGroups(lang: Lang): NavGroup[] {
  const c = COPY[lang];
  const f = c.footer;
  const home = localPath(lang, "/");
  return [
    {
      id: "pagema",
      label: f.pagema,
      links: [
        { label: c.home, href: home },
        { label: c.howItWorks, href: `${home}#section-processus` },
        { label: c.pricing, href: `${home}#section-tarifs` },
        { label: c.request, href: `${home}#section-client` },
      ],
    },
    {
      id: "services",
      label: f.services,
      links: [
        { label: f.directory, href: localPath(lang, "/services") },
        ...FOOTER_TRADES.map((t) => ({ label: tradeLabel(lang, t), href: tradeHref(lang, t) })),
        { label: c.cleaningLocal, href: localPath(lang, "/nettoyage-casablanca") },
        { label: c.marrakech, href: localPath(lang, "/annuaire") },
      ],
    },
    {
      id: "pros",
      label: f.pros,
      links: [
        { label: f.pro, href: localPath(lang, "/annuaire-ai") },
        { label: c.cta, href: localPath(lang, "/inscription") },
        { label: c.partners, href: localPath(lang, "/avantages-partenaires") },
      ],
    },
    {
      id: "info",
      label: f.info,
      links: [
        { label: f.whatsapp, href: whatsappUrl(lang) },
        { label: f.email, href: `mailto:${CONTACT_EMAIL}` },
      ],
    },
  ];
}

/** Breadcrumb trails, shared by the visible breadcrumb and the BreadcrumbList JSON-LD. */
export function crumbs(lang: Lang) {
  const c = COPY[lang];
  const home: NavLink = { label: c.home, href: localPath(lang, "/") };
  const directory: NavLink = { label: c.footer.directory, href: localPath(lang, "/services") };
  return {
    directory: [home, directory],
    agency: (name: string, href: string) => [home, directory, { label: name, href }],
    cleaning: [
      home,
      directory,
      { label: c.cleaningLocal, href: localPath(lang, "/nettoyage-casablanca") },
    ],
    partners: [home, { label: c.partners, href: localPath(lang, "/avantages-partenaires") }],
  };
}
