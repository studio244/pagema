import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { DICTS, LangContext, useT, type Dict, type Lang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import logoAsset from "@/assets/pagema-logo.png";
import heroAsset from "@/assets/pagema-services-hero-2.png";
import stampAsset from "@/assets/pagema-app-icon.png";
import prosAsset from "@/assets/pagema-pros-equipe.jpg";
import requestIllustration from "@/assets/process-step-1.png";
import qualifyIllustration from "@/assets/process-step-2.png";
import quotesIllustration from "@/assets/process-step-3.png";
import partner1 from "@/assets/partner-1.png";
import partner2 from "@/assets/partner-2.png";
import partner3 from "@/assets/partner-3.png";
import partner4 from "@/assets/partner-4.png";
import partner5 from "@/assets/partner-5.png";
import whatsappMockup from "@/assets/whatsapp-opportunity.png";

const LOGO_URL = logoAsset;
const HERO_URL = heroAsset;
const STAMP_URL = stampAsset;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.dataset["visible"] = "true";
        observer.unobserve(element);
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/** Marque Page.ma (la lame terre cuite du logo), utilisée comme motif de marque. */
function BrandMark({
  className = "",
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 130"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
      {...rest}
    >
      <path d="M2 3 L92 96 a9 9 0 0 1 -2 14 c-20 12 -24 40 -7 60 l4 5 H8 a6 6 0 0 1 -6 -6 Z" />
    </svg>
  );
}

function Eyebrow({
  children,
  className = "",
  markClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  markClassName?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] ${className}`}
    >
      <BrandMark className={`h-3.5 w-auto shrink-0 ${markClassName}`} />
      <span>{children}</span>
    </p>
  );
}

const REAL_ESTATE = "Immobilier";
const INVESTMENT = "Investissement";

const CATEGORIES = [
  "Sécurité",
  "Nettoyage",
  "Intérim",
  "Assurance",
  "Santé",
  "Impression",
  "Publicité",
  "Conciergerie",
  REAL_ESTATE,
  INVESTMENT,
];

const HEALTH_ENTITIES = [
  "Groupe de santé",
  "Clinique",
  "Centre de soins / diagnostic",
];

const REAL_ESTATE_INTENTS = [
  "Acheter un bien",
  "Vendre un bien",
  "Louer un bien",
  "Gestion locative / conciergerie",
];

const INVESTMENT_INTENTS = [
  "Investir (rendement locatif)",
  "Acheter pour revendre",
  "Projet de promotion immobilière",
  "Terrain / foncier",
  "Investissement en société / participation",
];

const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];


const COVERAGE_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "Salé",
  "Essaouira",
  "Safi",
  "El Jadida",
  "Nador",
  "Béni Mellal",
  "Mohammédia",
  "Khouribga",
  "Laâyoune",
  "Dakhla",
  "Settat",
  "Chefchaouen",
  "Ifrane",
  "Ouarzazate",
  "Al Hoceïma",
];

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Page.ma — Le bon prestataire, vérifié et proche de vous" },
      {
        name: "description",
        content:
          "Décrivez votre besoin, Page.ma le qualifie par téléphone et vous envoie jusqu'à 3 devis de professionnels vérifiés. Sécurité, nettoyage, intérim, assurance — dans 25 villes du Maroc. Pré-inscrivez-vous.",
      },
      {
        property: "og:title",
        content: "Page.ma — Le bon prestataire, vérifié et proche de vous",
      },
      {
        property: "og:description",
        content:
          "Jusqu'à 3 devis de pros vérifiés pour la sécurité, le nettoyage, l'intérim et l'assurance. Gratuit, sans compte, sans spam.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("pagema-lang");
    if (saved === "ar" || saved === "fr") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("pagema-lang", l);
  };
  const t = DICTS[lang];

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <div
        id="top"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-paper text-ink font-sans paper-noise"
      >
        <Nav />
        <Hero />
        <Promises />
        <Categories />
        <ProSection />
        <WhatsAppSection />
        <Pricing />
        <Partners />
        <ClientSection />
        <AiFeatures />
        <Coverage />
        <Footer />
        <WhatsAppWidget />
      </div>
    </LangContext.Provider>
  );
}

function ProSection() {
  const { t } = useT();
  return (
    <section id="section-prestataire" className="relative isolate overflow-hidden scroll-mt-24 bg-paper-deep">
      <BrandMark className="pointer-events-none absolute -right-10 -bottom-16 -z-10 h-[26rem] w-auto text-terra/10" />
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal className="order-2 lg:order-1">
            <PreregistrationForm profile="prestataire" />
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <Eyebrow className="text-terra-deep mb-4">{t.pro.eyebrow}</Eyebrow>
            <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
              {t.pro.title1}
              <br />
              {t.pro.title2}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">{t.pro.body}</p>
            <ul className="mt-8 space-y-4 max-w-prose">
              {t.pro.benefits.map((b) => (
                <Benefit key={b}>{b}</Benefit>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClientSection() {
  const { t } = useT();
  return (
    <section id="section-client" className="relative isolate overflow-hidden scroll-mt-24 border-b-2 border-ink">
      <img
        src={prosAsset}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-ink/85" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal className="text-paper">
            <Eyebrow className="text-terra mb-4">{t.client.eyebrow}</Eyebrow>
            <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
              {t.client.title1}
              <br />
              {t.client.title2}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-paper/85 text-pretty">{t.client.body}</p>
            <ul className="mt-8 space-y-4 max-w-prose">
              {t.client.benefits.map((b) => (
                <Benefit key={b} tone="paper">{b}</Benefit>
              ))}
            </ul>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">{t.client.caption}</p>
          </Reveal>
          <Reveal delay={120}>
            <PreregistrationForm profile="client" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const WHATSAPP_URL = "https://wa.me/212664272854";

function WhatsAppWidget() {
  const { t } = useT();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappWidget}
      className="wa-widget fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#ffffff" aria-hidden="true">
      <path d="M16.04 3C9.03 3 3.34 8.69 3.34 15.7c0 2.24.59 4.42 1.7 6.35L3.2 29l7.11-1.86a12.65 12.65 0 0 0 5.72 1.37h.01c7 0 12.7-5.7 12.7-12.7C28.74 8.69 23.05 3 16.04 3Zm0 23.24h-.01a10.6 10.6 0 0 1-5.36-1.47l-.38-.23-4.22 1.1 1.13-4.11-.25-.42a10.53 10.53 0 0 1-1.62-5.61c0-5.84 4.76-10.6 10.61-10.6 2.83 0 5.5 1.1 7.5 3.11a10.52 10.52 0 0 1 3.1 7.5c0 5.85-4.76 10.73-10.5 10.73Zm5.82-7.94c-.32-.16-1.98-.98-2.28-1.09-.31-.11-.53-.17-.75.16-.22.32-.86 1.09-1.06 1.31-.19.22-.39.24-.71.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.82-.98-2.49-.26-.65-.52-.56-.71-.57h-.64c-.22 0-.58.08-.88.4-.3.32-1.15 1.13-1.15 2.75 0 1.62 1.18 3.19 1.34 3.41.16.21 2.32 3.54 5.62 4.96.79.34 1.4.54 1.88.69.79.25 1.51.22 2.08.13.63-.09 1.98-.81 2.26-1.59.28-.78.28-1.45.2-1.59-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs leading-none ${className}`}>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`py-1 border-b-2 ${lang === "ar" ? "border-terra text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}
      >
        العربية
      </button>
      <span aria-hidden="true" className="text-ink-soft">|</span>
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={`py-1 border-b-2 uppercase tracking-wide ${lang === "fr" ? "border-terra text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}
      >
        Français
      </button>
    </span>
  );
}

function Nav() {
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <a href="#top" className="shrink-0" aria-label={t.nav.home}>
            <img src={LOGO_URL} alt="Page.ma" className="h-9 sm:h-10 w-auto" />
          </a>
          <span className="hidden sm:inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] border border-ink px-2 py-1 rotate-[-2deg]">
            {t.nav.prelaunch}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs leading-none uppercase tracking-wide text-ink-soft hover:text-ink border-b-2 border-transparent hover:border-terra py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitch className="hidden sm:inline-flex" />
          <a
            href="#section-prestataire"
            className="hidden md:inline-flex items-center font-mono text-[10px] sm:text-xs leading-none uppercase tracking-wide border-2 border-ink px-3 sm:px-4 py-2 lift bg-terra text-paper"
          >
            {t.nav.pro}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="nav-menu-panel"
            aria-label={menuOpen ? t.nav.close : t.nav.open}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border-2 border-ink lift bg-paper"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="square" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="square" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="nav-menu-panel" className="lg:hidden border-t-2 border-ink bg-paper paper-noise">
          <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wide py-3 border-b border-ink/20 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <LangSwitch className="sm:hidden py-3" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="#section-client"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center text-center font-mono text-xs leading-tight uppercase tracking-wide border-2 border-ink px-3 py-3 lift"
              >
                {t.nav.client}
              </a>
              <a
                href="#section-prestataire"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center text-center font-mono text-xs leading-tight uppercase tracking-wide border-2 border-ink px-3 py-3 lift bg-terra text-paper"
              >
                {t.nav.pro}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const LAUNCH_DATE = new Date("2026-11-01T00:00:00+01:00").getTime();

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, LAUNCH_DATE - Date.now()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  if (left === null) return null;
  const mins = Math.floor(left / 60_000);
  return { days: Math.floor(mins / 1440), hours: Math.floor((mins % 1440) / 60), minutes: mins % 60 };
}

function Hero() {
  const { t } = useT();
  const cd = useCountdown();
  const units = [
    { v: cd?.days, l: t.hero.days },
    { v: cd?.hours, l: t.hero.hours },
    { v: cd?.minutes, l: t.hero.minutes },
  ];

  return (
    <header className="relative isolate overflow-hidden border-b-2 border-ink">
      <img
        src={HERO_URL}
        alt={t.hero.imgAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-5 py-20 lg:py-24 text-center text-paper">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra drop mb-6">{t.hero.kicker}</p>
        <h1 className="font-display leading-[1.02] tracking-tight text-[clamp(2.2rem,5.6vw,4.4rem)] text-balance drop [animation-delay:80ms]">
          {highlightWords(t.hero.title, t.hero.titleHighlights)}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-paper text-pretty drop [animation-delay:160ms]">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 flex justify-center gap-3 drop [animation-delay:200ms]" aria-live="polite">
          {units.map((u) => (
            <div key={u.l} className="min-w-[5.5rem] border-2 border-paper bg-ink/50 px-3 py-3">
              <span className="block font-display text-4xl leading-none tabular-nums">
                {u.v === undefined ? "--" : String(u.v).padStart(2, "0")}
              </span>
              <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-wide text-paper/80">{u.l}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 drop [animation-delay:240ms]">
          <a
            href="#section-prestataire"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-terra text-paper border-2 border-paper font-display text-xl leading-none tracking-tight px-8 py-4 lift"
          >
            {t.cta}
          </a>
          <a
            href="#section-client"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-paper text-ink border-2 border-paper font-display text-xl leading-none tracking-tight px-8 py-4 lift hover:bg-paper-deep"
          >
            {t.hero.secondary}
          </a>
        </div>

        <div className="mt-10 mx-auto max-w-2xl rotate-[-1deg] border-2 border-paper bg-paper text-ink p-4 sm:p-5 text-start shadow-[6px_6px_0_var(--terra)] drop [animation-delay:300ms]">
          <span className="inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] bg-terra text-paper px-2 py-1">
            {t.hero.offerTag}
          </span>
          <p className="mt-3 font-semibold leading-relaxed text-pretty">{t.hero.offer}</p>
        </div>
      </div>
    </header>
  );
}

function Promises() {
  const { t } = useT();
  const images = [requestIllustration, qualifyIllustration, quotesIllustration];
  return (
    <section id="section-processus" className="scroll-mt-24 border-y-2 border-ink bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
        <Reveal>
          <Eyebrow className="text-terra mb-10">{t.promises.eyebrow}</Eyebrow>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {t.promises.items.map((s, index) => (
            <Reveal key={index} delay={index * 90} className="h-full">
              <div className="lift-card lift-card-invert flex h-full flex-col border-2 border-paper/25 p-6">
                <span className="font-display text-5xl leading-none text-terra">{String(index + 1).padStart(2, "0")}</span>
                <div className="my-5 flex overflow-hidden border-y-2 border-paper/20 bg-white">
                  <img src={images[index]} alt={s.alt} loading="lazy" width={768} height={768} className="h-auto w-full object-cover" />
                </div>
                <h3 className="font-sans font-semibold text-xl mt-4">{s.t}</h3>
                <p className="text-sm leading-relaxed text-paper/70 mt-2">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-16 text-center font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight tracking-tight text-balance">
            {t.promises.concept}
          </p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {t.promises.pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className="h-full">
              <div className="h-full border-2 border-paper/25 p-6">
                <span className="inline-flex font-mono text-[10px] uppercase tracking-[0.18em] bg-terra text-paper px-2 py-1">{p.tag}</span>
                <h3 className="mt-4 font-display text-3xl leading-none">{p.t}</h3>
                <p className="mt-3 text-paper/75 leading-relaxed">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-10 mx-auto max-w-2xl text-center text-paper/80 leading-relaxed text-pretty">{t.promises.trust}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Categories() {
  const { t } = useT();
  return (
    <section className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
      <Reveal>
        <Eyebrow className="text-terra mb-4">{t.categories.eyebrow}</Eyebrow>
        <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">{t.categories.title}</h2>
        <p className="mt-4 max-w-prose text-lg text-ink-soft">{t.categories.body}</p>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c} delay={(i % 4) * 60} className="h-full">
            <div className="lift-card relative h-full border-2 border-ink bg-paper-deep p-5">
              {i < 2 && (
                <span className="absolute -top-2.5 end-3 font-mono text-[9px] uppercase tracking-wide bg-terra text-paper px-1.5 py-0.5">
                  {t.categories.featured}
                </span>
              )}
              <BrandMark className="h-5 w-auto text-terra" />
              <p className="mt-3 font-sans font-semibold text-lg leading-tight">{catLabel(t, c)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function highlightWords(text: string, words: string[]) {
  return text.split(new RegExp(`(${words.join("|")})`)).map((part, i) =>
    words.includes(part) ? (
      <span key={i} className="text-terra">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function catLabel(t: Dict, c: string) {
  return t.categoryLabels[c] ?? c;
}

function WhatsAppSection() {
  const { t } = useT();
  return (
    <section id="section-whatsapp" className="scroll-mt-24 border-y-2 border-ink bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow className="text-terra mb-4">{t.whatsapp.eyebrow}</Eyebrow>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">{t.whatsapp.title}</h2>
          <p className="mt-4 max-w-prose text-lg text-paper/80">{t.whatsapp.body}</p>
          <ul className="mt-8 space-y-4">
            {t.whatsapp.features.map((f) => (
              <Benefit key={f} tone="paper">{f}</Benefit>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <img
            src={whatsappMockup}
            alt={`${t.whatsapp.chatName} — ${t.whatsapp.message}`}
            width={400}
            height={636}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-sm rounded-3xl"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useT();
  return (
    <section id="section-tarifs" className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-28">
      <Reveal>
        <Eyebrow className="text-terra mb-4">{t.pricing.eyebrow}</Eyebrow>
        <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">{t.pricing.title}</h2>
      </Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
        {t.pricing.plans.map((p, i) => {
          const rec = i === 1;
          return (
            <Reveal key={p.name} delay={i * 90} className="h-full">
              <div className={`lift-card relative flex h-full flex-col border-2 border-ink p-6 ${rec ? "bg-terra text-paper" : "bg-paper-deep"}`}>
                {rec && (
                  <span className="absolute -top-3 start-5 font-mono text-[10px] uppercase tracking-wide border-2 border-ink bg-paper text-ink px-2 py-1">
                    {t.pricing.recommended}
                  </span>
                )}
                <h3 className="font-mono text-xs uppercase tracking-[0.2em]">{p.name}</h3>
                <p className="mt-4 font-display text-5xl leading-none">
                  {p.price} <span className="text-lg">MAD</span>
                </p>
                <p className={`mt-1 font-mono text-[11px] uppercase ${rec ? "text-paper/80" : "text-ink-soft"}`}>{t.pricing.perMonth}</p>
                <p className="mt-6 font-semibold text-xl">{p.credits} {t.pricing.credits}</p>
                <p className={`mt-2 text-sm ${rec ? "text-paper/85" : "text-ink-soft"}`}>{p.detail}</p>
                <p className="mt-auto pt-6 font-semibold">{p.ideal}</p>
                <a
                  href="#section-prestataire"
                  className={`mt-5 inline-flex items-center justify-center border-2 border-ink py-3 font-display text-lg leading-none lift ${rec ? "bg-paper text-ink" : "bg-terra text-paper"}`}
                >
                  {t.cta}
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={120}>
        <div className="mt-10 border-2 border-ink bg-paper p-6 sm:flex sm:items-center sm:justify-between gap-6">
          <p className="font-display text-2xl leading-tight">{t.pricing.rulesTitle}</p>
          <dl className="mt-4 sm:mt-0 flex flex-wrap gap-6">
            {t.pricing.rules.map((r) => (
              <div key={r.k}>
                <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">{r.k}</dt>
                <dd className="font-semibold text-lg text-terra-deep">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

function AiFeatures() {
  const { t } = useT();
  return (
    <section id="section-ia" className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-28">
      <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div>
          <Eyebrow className="text-terra mb-4">{t.ai.eyebrow}</Eyebrow>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
            {t.ai.title1}
            <br />
            {t.ai.title2}
          </h2>
        </div>
        <span className="inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] border-2 border-ink px-2.5 py-1.5 rotate-[-2deg] bg-terra text-paper">
          {t.ai.badge}
        </span>
      </Reveal>
      <Reveal delay={70}>
        <p className="max-w-prose text-lg leading-relaxed text-ink-soft text-pretty mb-12">{t.ai.body}</p>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {t.ai.features.map((f, index) => (
          <Reveal key={f.title} delay={(index % 3) * 75} className="h-full">
            <div className="lift-card flex h-full flex-col border-2 border-ink bg-paper-deep p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-4xl leading-none text-terra">{String(index + 1).padStart(2, "0")}</span>
                <span className="inline-flex items-center font-mono text-[9px] leading-none uppercase tracking-wide border border-ink px-2 py-1">
                  {t.ai.soon}
                </span>
              </div>
              <h3 className="font-sans font-semibold text-xl mt-4 text-pretty">{f.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft mt-2 text-pretty">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120} className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href="#section-prestataire"
          className="inline-flex items-center justify-center w-full sm:w-auto text-center bg-terra text-paper border-2 border-ink font-display text-xl leading-none tracking-tight px-8 py-4 lift"
        >
          {t.cta}
        </a>
        <a
          href="#section-client"
          className="inline-flex items-center justify-center w-full sm:w-auto text-center bg-paper text-ink border-2 border-ink font-display text-xl leading-none tracking-tight px-8 py-4 lift hover:bg-paper-deep"
        >
          {t.ai.ctaClient}
        </a>
      </Reveal>
    </section>
  );
}

const MAP_CITIES: { name: string; x: number; y: number }[] = [
  { name: "Tanger", x: 250, y: 10 },
  { name: "Nador", x: 311, y: 24 },
  { name: "Oujda", x: 333, y: 36 },
  { name: "Fès", x: 267, y: 52 },
  { name: "Meknès", x: 256, y: 55 },
  { name: "Rabat", x: 228, y: 53 },
  { name: "Casablanca", x: 212, y: 63 },
  { name: "El Jadida", x: 192, y: 71 },
  { name: "Béni Mellal", x: 239, y: 93 },
  { name: "Safi", x: 177, y: 94 },
  { name: "Marrakech", x: 203, y: 110 },
  { name: "Agadir", x: 169, y: 139 },
  { name: "Laâyoune", x: 92, y: 218 },
  { name: "Dakhla", x: 34, y: 302 },
];

const MAP_VIEW = { width: 372, height: 390 };
const LABEL_CHAR_WIDTH = 5.4;
const LABEL_HEIGHT = 8.5;

type LabelBox = { x1: number; y1: number; x2: number; y2: number };
type PlacedLabel = {
  name: string;
  x: number;
  y: number;
  anchor: "start" | "end" | "middle";
  cityX: number;
  cityY: number;
  leader: boolean;
};

// Candidate slots: eight directions around the dot, at growing distances.
const LABEL_CANDIDATES: { dx: number; dy: number; anchor: "start" | "end" | "middle" }[] = (() => {
  const slots: { dx: number; dy: number; anchor: "start" | "end" | "middle" }[] = [];
  for (const r of [6, 12, 20, 30, 42, 56]) {
    slots.push({ dx: r, dy: 3, anchor: "start" });
    slots.push({ dx: -r, dy: 3, anchor: "end" });
    slots.push({ dx: r * 0.8, dy: -r * 0.7 - 3, anchor: "start" });
    slots.push({ dx: -r * 0.8, dy: -r * 0.7 - 3, anchor: "end" });
    slots.push({ dx: r * 0.8, dy: r * 0.7 + 6, anchor: "start" });
    slots.push({ dx: -r * 0.8, dy: r * 0.7 + 6, anchor: "end" });
    slots.push({ dx: 0, dy: -r - 4, anchor: "middle" });
    slots.push({ dx: 0, dy: r + 9, anchor: "middle" });
  }
  return slots;
})();

function overlaps(a: LabelBox, b: LabelBox) {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

function segmentHitsBox(ax: number, ay: number, bx: number, by: number, box: LabelBox) {
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = ax + (bx - ax) * t;
    const y = ay + (by - ay) * t;
    if (x >= box.x1 && x <= box.x2 && y >= box.y1 && y <= box.y2) return true;
  }
  return false;
}

// Deterministic label layout: every city name takes the closest free slot around
// its dot. Names never overlap each other or a dot; link lines are avoided when
// possible, and a thin leader line ties a pushed-away name back to its dot.
function layoutMapLabels(): PlacedLabel[] {
  const dotBoxes: LabelBox[] = MAP_CITIES.map((c) => ({
    x1: c.x - 4,
    y1: c.y - 4,
    x2: c.x + 4,
    y2: c.y + 4,
  }));
  const cityByName = new Map(MAP_CITIES.map((c) => [c.name, c]));
  const linkSegments = MAP_LINKS.flatMap(([a, b]) => {
    const from = cityByName.get(a);
    const to = cityByName.get(b);
    return from && to ? [[from.x, from.y, to.x, to.y] as const] : [];
  });
  const placedBoxes: LabelBox[] = [];
  const placed: PlacedLabel[] = [];
  const order = [...MAP_CITIES].sort((a, b) => b.name.length - a.name.length);

  for (const city of order) {
    const width = city.name.length * LABEL_CHAR_WIDTH;

    const evaluate = (
      candidate: (typeof LABEL_CANDIDATES)[number],
      avoidLinks: boolean,
    ): PlacedLabel | null => {
      const x = city.x + candidate.dx;
      const y = city.y + candidate.dy;
      const x1 =
        candidate.anchor === "start" ? x : candidate.anchor === "end" ? x - width : x - width / 2;
      const box: LabelBox = {
        x1: x1 - 1,
        y1: y - LABEL_HEIGHT,
        x2: x1 + width + 1,
        y2: y + 2,
      };
      if (
        box.x1 < 2 ||
        box.x2 > MAP_VIEW.width - 2 ||
        box.y1 < 2 ||
        box.y2 > MAP_VIEW.height - 2
      )
        return null;
      if (placedBoxes.some((b) => overlaps(box, b))) return null;
      if (dotBoxes.some((b) => overlaps(box, b))) return null;
      if (avoidLinks && linkSegments.some(([ax, ay, bx, by]) => segmentHitsBox(ax, ay, bx, by, box)))
        return null;

      placedBoxes.push(box);
      return {
        name: city.name,
        x,
        y,
        anchor: candidate.anchor,
        cityX: city.x,
        cityY: city.y,
        leader: Math.abs(candidate.dx) > 10 || Math.abs(candidate.dy) > 12,
      };
    };

    let chosen: PlacedLabel | null = null;
    for (const candidate of LABEL_CANDIDATES) {
      chosen = evaluate(candidate, true);
      if (chosen) break;
    }
    if (!chosen) {
      for (const candidate of LABEL_CANDIDATES) {
        chosen = evaluate(candidate, false);
        if (chosen) break;
      }
    }
    if (chosen) placed.push(chosen);
  }

  return placed;
}

const MAP_LINKS: [string, string][] = [
  ["Tanger", "Nador"],
  ["Nador", "Oujda"],
  ["Oujda", "Fès"],
  ["Fès", "Meknès"],
  ["Meknès", "Rabat"],
  ["Tanger", "Rabat"],
  ["Rabat", "Casablanca"],
  ["Casablanca", "El Jadida"],
  ["Casablanca", "Béni Mellal"],
  ["Béni Mellal", "Marrakech"],
  ["El Jadida", "Safi"],
  ["Safi", "Marrakech"],
  ["Marrakech", "Agadir"],
  ["Agadir", "Laâyoune"],
  ["Laâyoune", "Dakhla"],
];

const MAP_LABELS = layoutMapLabels();

function MoroccoNetwork() {
  const byName = new Map(MAP_CITIES.map((c) => [c.name, c]));
  return (
    <svg
      viewBox="0 0 372 390"
      className="absolute inset-0 h-full w-full p-4 transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
      role="img"
      aria-label="Carte du Maroc et réseau des principales villes couvertes, de Tanger à Dakhla"
    >
      <path
        d="M10.0 366.6 L11.9 345.2 L20.1 338.6 L27.0 326.1 L25.7 317.8 L33.1 300.8 L44.9 285.4 L52.2 281.4 L57.7 267.5 L58.3 254.6 L66.0 239.6 L80.2 230.8 L93.7 206.2 L104.8 196.6 L124.7 193.8 L141.5 177.4 L152.2 170.9 L169.8 150.9 L164.6 120.7 L175.6 87.2 L189.3 70.9 L226.5 49.9 L247.5 10.0 L263.2 10.1 L276.1 20.4 L296.3 18.7 L327.7 24.3 L335.7 39.8 L337.0 54.5 L344.4 79.9 L350.0 85.1 L346.1 94.5 L318.3 98.5 L308.5 107.5 L296.4 109.6 L295.3 127.5 L270.4 137.0 L262.2 149.1 L244.7 155.6 L223.4 159.3 L189.1 177.1 L188.7 248.7 L118.8 247.6 L119.3 309.2 L99.3 311.6 L94.2 323.9 L98.2 358.7 L14.8 358.5 L10.0 366.6 Z"
        className="fill-paper stroke-ink"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {MAP_LINKS.map(([a, b], i) => {
        const from = byName.get(a);
        const to = byName.get(b);
        if (!from || !to) return null;
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className="net-line stroke-terra/55"
            strokeWidth={1.2}
            style={{ animationDelay: `${0.25 + i * 0.07}s` }}
          />
        );
      })}
      {MAP_CITIES.map((city, i) => (
        <g key={city.name}>
          <circle
            cx={city.x}
            cy={city.y}
            r={3}
            className="net-halo fill-terra"
            style={{ animationDelay: `${(i % 8) * 0.32}s` }}
          />
          <circle
            cx={city.x}
            cy={city.y}
            r={2.6}
            className="net-dot fill-terra stroke-ink"
            strokeWidth={1}
            style={{ animationDelay: `${(i % 8) * 0.32}s` }}
          />
        </g>
      ))}
      {MAP_LABELS.map((label, i) => (
        <g key={`label-${label.name}`}>
          {label.leader && (
            <line
              x1={label.cityX}
              y1={label.cityY}
              x2={label.anchor === "end" ? label.x + 1 : label.anchor === "start" ? label.x - 1 : label.x}
              y2={label.y - 2}
              className="net-label stroke-ink/45"
              strokeWidth={0.7}
              style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            />
          )}
          <text
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            className="net-label fill-ink font-mono text-[8px] font-bold uppercase"
            style={{ animationDelay: `${0.5 + i * 0.06}s` }}
          >
            {label.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Coverage() {
  const { t } = useT();
  return (
    <section id="section-villes" className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-28" aria-labelledby="coverage-title">
      <Reveal className="flex flex-col overflow-hidden border-[3px] border-ink bg-paper shadow-[10px_10px_0_var(--ink)] lg:flex-row">
        <div className="flex flex-col border-b-[3px] border-ink lg:w-[38%] lg:border-r-[3px] lg:border-b-0">
          <div className="border-b-[3px] border-ink bg-terra p-7 sm:p-9">
            <Eyebrow className="mb-4 !text-[10px] font-bold text-paper">
              {t.coverage.eyebrow}
            </Eyebrow>
            <h2 id="coverage-title" className="font-display text-7xl leading-[0.82] text-paper sm:text-8xl">
              25
              <span className="block h-3 sm:h-5" />
              {t.coverage.cities}
            </h2>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper">
              {t.coverage.tagline}
            </p>
          </div>

          <div className="group relative min-h-96 flex-1 overflow-hidden bg-paper-deep">
            <MoroccoNetwork />
            <div className="absolute right-5 bottom-5 left-5 rotate-[-1deg] border-2 border-ink bg-paper/90 p-4 shadow-[5px_5px_0_var(--terra)] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
              <p className="font-sans text-base font-bold leading-tight uppercase">
                {t.coverage.card}
              </p>
            </div>
          </div>

        </div>

        <div className="flex flex-1 flex-col">
          <div className="border-b-[3px] border-ink p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <h3 className="font-display text-4xl leading-none sm:text-5xl">
                {t.coverage.title1}
                <br />
                {t.coverage.title2}
              </h3>
              <span className="inline-flex items-center border border-terra px-2.5 py-1.5 font-mono text-[9px] font-bold leading-none uppercase tracking-[0.16em] text-terra-deep">
                {t.coverage.badge}
              </span>
            </div>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
              {t.coverage.body}
            </p>

          </div>

          <div className="grid flex-1 grid-cols-2 gap-px bg-ink sm:grid-cols-3">
            {COVERAGE_CITIES.map((city, index) => (
              <div
                key={city}
                className="group min-h-20 bg-paper p-3 transition-colors duration-200 hover:bg-ink sm:min-h-24 sm:p-4 motion-reduce:transition-none"
              >
                <span className="block font-mono text-[9px] font-bold text-terra transition-colors group-hover:text-paper">
                  {String(index + 1).padStart(2, "0")} //
                </span>
                <span className="mt-2 block font-sans text-sm font-bold leading-tight text-ink transition-colors group-hover:text-paper sm:text-base">
                  {city}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-ink px-5 py-4 text-paper">
            <span className="h-3 w-3 shrink-0 rounded-full bg-terra" aria-hidden="true" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]">
              {t.coverage.strip}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const FOOTER_CITIES = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir"];

const PARTNERS = [
  { name: "Asomovit Nettoyage", url: partner1 },
  { name: "Azur Protection", url: partner2 },
  { name: "S4U — Safety For You", url: partner3 },
  { name: "Azur Facilities", url: partner4 },
  { name: "Asomovit Sécurité Privée", url: partner5 },
];

function Partners() {
  const { t } = useT();
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="section-partenaires"
      className="scroll-mt-24 bg-paper-deep py-14 lg:py-20"
      aria-labelledby="partners-title"
    >
      <Reveal className="mx-auto max-w-6xl px-5">
        <Eyebrow className="mb-3 text-terra">{t.partners.eyebrow}</Eyebrow>
        <h2
          id="partners-title"
          className="font-display text-3xl leading-[0.95] text-ink sm:text-4xl"
        >
          {t.partners.title}
        </h2>
      </Reveal>

      <Reveal delay={100} className="marquee-viewport marquee-mask mt-9 overflow-hidden">
        <ul className="marquee-track flex items-center gap-10 sm:gap-16 lg:gap-20">
          {loop.map((partner, index) => (
            <li key={`${partner.name}-${index}`} className="shrink-0">
              <img
                src={partner.url}
                alt={index < PARTNERS.length ? partner.name : ""}
                aria-hidden={index >= PARTNERS.length}
                loading="lazy"
                className="h-14 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-[4.5rem] lg:h-24"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Footer() {
  const { t } = useT();
  const columns = [
    { title: t.footer.columns.services, links: ["Sécurité", "Nettoyage", "Piscine", "Jardinage", "Immobilier"].map((c) => ({ label: catLabel(t, c), href: "#section-prestataire" })) },
    { title: t.footer.columns.cities, links: FOOTER_CITIES.map((c) => ({ label: c, href: "#coverage-title" })) },
    { title: t.footer.columns.platform, links: t.footer.platformLinks },
  ];
  return (
    <footer className="relative isolate overflow-hidden border-t-2 border-ink zellige">
      <BrandMark className="pointer-events-none absolute -right-14 -bottom-20 -z-10 h-[24rem] w-auto text-ink/[0.07]" />
      <Reveal className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="lg:pr-8">
            <img src={LOGO_URL} alt="Page.ma" className="h-9 w-auto" />
            <p className="mt-6 max-w-prose font-semibold leading-relaxed text-ink-soft text-pretty">
              {t.footer.about}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61594526347174"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.footer.on} Facebook`}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Facebook size={18} strokeWidth={2} />
              </a>
              <a
                href="https://www.instagram.com/page.ma22/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.footer.on} Instagram`}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a
                href="https://www.linkedin.com/showcase/page-ma/home/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.footer.on} LinkedIn`}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Linkedin size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-terra">
                <BrandMark className="h-3 w-auto shrink-0" />
                <span>{column.title}</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center text-sm font-semibold leading-none text-ink-soft transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            © 2026 PAGE.MA ·
          </span>
          <span className="flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            <span>{t.footer.legal}</span>
            <span>
              Powered by{" "}
              <a
                href="https://hoverswitch.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terra underline decoration-terra/50 underline-offset-2 transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
              >
                HoverSwitch
              </a>
            </span>
          </span>
        </div>
      </Reveal>
    </footer>
  );
}

function Benefit({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "paper";
}) {
  return (
    <li className={`flex items-start gap-3 ${tone === "paper" ? "text-paper" : "text-ink"}`}>
      <BrandMark className="mt-1.5 h-3.5 w-auto shrink-0 text-terra" />
      <span className="leading-relaxed text-pretty">{children}</span>
    </li>

  );
}

type Profile = "client" | "prestataire";

function PreregistrationForm({ profile }: { profile: Profile }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]!);
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState<string>(TEAM_SIZES[0]!);
  const [needDetails, setNeedDetails] = useState("");
  const [healthEntity, setHealthEntity] = useState<string>(HEALTH_ENTITIES[0]!);
  const [realEstateIntent, setRealEstateIntent] = useState<string>(
    REAL_ESTATE_INTENTS[0]!,
  );

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const inputClass =
    "w-full bg-transparent border-2 border-ink px-3 py-2.5 text-sm placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-terra/50";
  const selectClass =
    "w-full bg-transparent border-2 border-ink px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terra/50";
  const labelClass =
    "block font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-1";

  const isHealth = profile === "prestataire" && category === "Santé";
  const isInvestment = category === INVESTMENT;
  const isRealEstate = category === REAL_ESTATE || isInvestment;
  const intentOptions = isInvestment ? INVESTMENT_INTENTS : REAL_ESTATE_INTENTS;
  const intentValue = intentOptions.includes(realEstateIntent)
    ? realEstateIntent
    : intentOptions[0]!;
  const idPrefix = profile;

  function resetForm() {
    setFullName("");
    setPhone("");
    setEmail("");
    setCity("");
    setCategory(CATEGORIES[0]!);
    setCompanyName("");
    setTeamSize(TEAM_SIZES[0]!);
    setNeedDetails("");
    setHealthEntity(HEALTH_ENTITIES[0]!);
    setRealEstateIntent(REAL_ESTATE_INTENTS[0]!);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      category,
      profile,
      company_name: profile === "prestataire" ? companyName.trim() || null : null,
      team_size: profile === "prestataire" ? teamSize : null,
      need_details: profile === "client" ? needDetails.trim() || null : null,
      health_entity_type: isHealth ? healthEntity : null,
      real_estate_intent: isRealEstate ? intentValue : null,
    };
    const { error } = await supabase.from("preregistrations").insert(payload);
    if (error) {
      setStatus("error");
      return;
    }

    try {
      await sendPreregistrationEmail({
        data: {
          profile,
          fullName: payload.full_name,
          phone: payload.phone,
          email: payload.email,
          city: payload.city,
          category: payload.category,
          companyName: payload.company_name,
          teamSize: payload.team_size,
          needDetails: payload.need_details,
          healthEntityType: payload.health_entity_type,
          realEstateIntent: payload.real_estate_intent,
        },
      });
    } catch (emailError) {
      console.error(emailError);
      setStatus("error");
      return;
    }

    resetForm();
    setStatus("done");
  }

  return (
    <div>
      <div className="relative border-2 border-ink bg-paper-deep p-6 sm:p-7 shadow-cut">
        <span className="absolute -top-3 -right-3 w-14 h-14 stamp" aria-hidden="true">
          <img
            src={STAMP_URL}
            alt=""
            className="w-full h-full object-cover rounded-lg border-2 border-ink shadow-cut"
          />
        </span>
        <div className="flex items-center gap-2.5 mb-6">

          <svg
            className="text-terra w-6 h-6 shrink-0"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path className="drawl" d="M6 24 C 14 10, 26 10, 34 18" />
            <path className="drawl" d="M34 18 l -6 -1 M34 18 l -1 -6" />
          </svg>
          <p className="font-mono text-[11px] leading-none uppercase tracking-[0.15em] text-ink-soft">
            Pré-inscription {profile === "client" ? "client" : "prestataire"}{" "}
            · gratuit
          </p>

        </div>

        {status === "done" ? (
          <div className="border-2 border-ink bg-paper px-4 py-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-wide text-terra-deep font-medium">
              Reçu ✓
            </span>
            <p className="mt-2 font-display text-2xl tracking-tight">
              {profile === "client"
                ? isRealEstate
                  ? "On vous met en relation."
                  : "On s'occupe de trouver vos pros."
                : "Bienvenue dans le réseau."}
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {profile === "client"
                ? isRealEstate
                  ? isInvestment
                    ? "Un appel pour comprendre votre projet, puis une mise en relation avec un partenaire d'investissement vérifié."
                    : "Un appel pour comprendre votre projet, puis une mise en relation avec un professionnel de l'immobilier vérifié."
                  : "On vous appelle dès l'ouverture dans votre ville pour valider votre besoin."
                : "On vous contacte pour vérifier votre société avant l'ouverture."}
            </p>

          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {profile === "prestataire" && (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-company`}>
                  Raison sociale
                </label>
                <input
                  id={`${idPrefix}-company`}
                  className={inputClass}
                  placeholder="Nom de la société"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor={`${idPrefix}-name`}>
                {profile === "client" ? "Votre nom" : "Personne de contact"}
              </label>
              <input
                id={`${idPrefix}-name`}
                className={inputClass}
                placeholder="Prénom & nom"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-phone`}>
                  Téléphone
                </label>
                <input
                  id={`${idPrefix}-phone`}
                  className={inputClass}
                  placeholder="06…"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-email`}>
                  Email
                </label>
                <input
                  id={`${idPrefix}-email`}
                  className={inputClass}
                  placeholder={
                    profile === "client"
                      ? "vous@email.ma"
                      : "contact@societe.ma"
                  }
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-city`}>
                  Ville
                </label>
                <input
                  id={`${idPrefix}-city`}
                  className={inputClass}
                  placeholder="Casablanca"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-category`}>
                  {profile === "client" ? "Service cherché" : "Votre métier"}
                </label>
                <select
                  id={`${idPrefix}-category`}
                  className={selectClass}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {isHealth && (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-health`}>
                  Type d'établissement de santé
                </label>
                <select
                  id={`${idPrefix}-health`}
                  className={selectClass}
                  value={healthEntity}
                  onChange={(e) => setHealthEntity(e.target.value)}
                >
                  {HEALTH_ENTITIES.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-ink-soft">
                  Groupes, cliniques et centres uniquement — ni médecins
                  indépendants, ni établissements publics.
                </p>
              </div>
            )}

            {isRealEstate && (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-realestate`}>
                  {profile === "client"
                    ? isInvestment
                      ? "Votre projet d'investissement"
                      : "Votre projet immobilier"
                    : isInvestment
                      ? "Votre spécialité en investissement"
                      : "Votre spécialité immobilière"}
                </label>
                <select
                  id={`${idPrefix}-realestate`}
                  className={selectClass}
                  value={intentValue}
                  onChange={(e) => setRealEstateIntent(e.target.value)}
                >
                  {intentOptions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-ink-soft">
                  {isInvestment
                    ? "Investissement : pas de devis, mais une mise en relation directe avec un partenaire qualifié."
                    : "Immobilier : pas de devis, mais une mise en relation directe avec un professionnel qualifié."}
                </p>
              </div>
            )}

            {profile === "prestataire" ? (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-team`}>
                  Taille de l'équipe
                </label>
                <select
                  id={`${idPrefix}-team`}
                  className={selectClass}
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                >
                  {TEAM_SIZES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className={labelClass} htmlFor={`${idPrefix}-need`}>
                  {isRealEstate
                    ? "Votre projet en quelques lignes (optionnel)"
                    : "Votre besoin (optionnel)"}
                </label>
                <textarea
                  id={`${idPrefix}-need`}
                  rows={3}
                  className={inputClass}
                  placeholder={
                    isRealEstate
                      ? "Ex : appartement 2 chambres à Casablanca, budget 1,2 M DH, achat pour location…"
                      : "Ex : 2 agents de sécurité de nuit, site à Casablanca…"
                  }
                  value={needDetails}
                  onChange={(e) => setNeedDetails(e.target.value)}
                />
              </div>
            )}


            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center bg-terra text-paper border-2 border-ink font-display text-xl leading-none tracking-tight py-4 mt-2 lift disabled:opacity-60"
            >
              {status === "sending"
                ? "Envoi…"
                : profile === "client"
                  ? isRealEstate
                    ? "Je veux être mis en relation"
                    : "Je cherche un pro"
                  : "Je m'inscris comme pro"}

            </button>
            {status === "error" && (
              <p className="text-sm text-terra-deep text-center font-medium">
                Une erreur est survenue — réessayez.
              </p>
            )}
            <p className="text-center font-mono text-[10px] uppercase tracking-wide text-ink-soft">
              Gratuit · Sans engagement · Zéro spam
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
