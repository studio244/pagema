import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { DICTS, LangContext, useT, type Lang } from "@/lib/i18n";
import { Benefit, BrandMark, Eyebrow, Reveal, WhatsAppIcon } from "@/components/brand";
import { MoroccoNetwork } from "@/components/MoroccoNetwork";
import { PreregistrationForm } from "@/components/home/PreregistrationForm";
import { whatsappUrl } from "@/lib/whatsapp";
import { CLEANING_COPY } from "./copy";
import logoAsset from "@/assets/pagema-logo.png";
import heroAsset from "@/assets/pagema-services-hero-2.webp";
import prosAsset from "@/assets/pagema-pros-equipe.jpg";
import step1 from "@/assets/process-step-1.png";
import step2 from "@/assets/process-step-2.png";
import step3 from "@/assets/process-step-3.png";

const LOGO_URL = logoAsset;
const HERO_URL = heroAsset;
const STEP_IMAGES = [step1, step2, step3];

/** Same official opening date as the homepage countdown. */
const LAUNCH_DATE = new Date("2026-11-01T00:00:00+01:00").getTime();

export default function NettoyageCasablancaPage({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t: DICTS[lang], setLang: () => {} }}>
      <div
        id="top"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-paper text-ink font-sans paper-noise"
      >
        <Nav />
        <Hero />
        <Steps />
        <Why />
        <Services />
        <Coverage />
        <Demande />
        <Faq />
        <ProSection />
        <Footer />
        <WhatsAppWidget />
      </div>
    </LangContext.Provider>
  );
}

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
  return {
    days: Math.floor(mins / 1440),
    hours: Math.floor((mins % 1440) / 60),
    minutes: mins % 60,
  };
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

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang } = useT();
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs leading-none ${className}`}>
      <Link
        to={lang === "fr" ? "/ar/nettoyage-casablanca" : "/nettoyage-casablanca"}
        hrefLang={lang === "fr" ? "ar" : "fr"}
        lang={lang === "fr" ? "ar" : "fr"}
        className="py-1 border-b-2 border-transparent text-ink-soft hover:text-ink"
      >
        {lang === "fr" ? "العربية" : "Français"}
      </Link>
    </span>
  );
}

function Nav() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <a href="#top" className="shrink-0" aria-label={c.home}>
            <img src={LOGO_URL} alt="Page.ma" className="h-9 sm:h-10 w-auto" />
          </a>
          <span className="hidden sm:inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] border border-ink px-2 py-1 rotate-[-2deg]">
            {c.prelaunch}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {c.links.map((link) => (
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
            href="#section-demande"
            className="hidden md:inline-flex items-center font-mono text-[10px] sm:text-xs leading-none uppercase tracking-wide border-2 border-ink px-3 sm:px-4 py-2 lift bg-terra text-paper"
          >
            {c.client}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="nav-menu-panel"
            aria-label={menuOpen ? c.close : c.open}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border-2 border-ink lift bg-paper"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="square" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="square" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="nav-menu-panel" className="lg:hidden border-t-2 border-ink bg-paper paper-noise">
          <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col">
            {c.links.map((link) => (
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
                href="#section-demande"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center text-center font-mono text-xs leading-tight uppercase tracking-wide border-2 border-ink px-3 py-3 lift"
              >
                {c.client}
              </a>
              <a
                href="#section-prestataire"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center text-center font-mono text-xs leading-tight uppercase tracking-wide border-2 border-ink px-3 py-3 lift bg-terra text-paper"
              >
                {c.pro}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].hero;
  const cd = useCountdown();
  const units = [
    { v: cd?.days, l: c.days },
    { v: cd?.hours, l: c.hours },
    { v: cd?.minutes, l: c.minutes },
  ];

  return (
    <header className="relative isolate overflow-hidden border-b-2 border-ink">
      <img
        src={HERO_URL}
        alt={c.imgAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-5 py-20 lg:py-24 text-center text-paper">
        <p className="drop mb-6">
          <span className="inline-block border-2 border-paper bg-terra px-3 py-1.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-paper shadow-[4px_4px_0_var(--ink)]">
            {c.kicker}
          </span>
        </p>
        <h1 className="font-display leading-[1.02] tracking-tight text-[clamp(2rem,5.2vw,4rem)] text-balance drop [animation-delay:80ms]">
          {highlightWords(c.title, c.titleHighlights)}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-paper text-pretty drop [animation-delay:160ms]">
          {c.subtitle}
        </p>

        <div className="mt-8 flex justify-center gap-3 drop [animation-delay:200ms]" aria-live="polite">
          {units.map((u) => (
            <div key={u.l} className="min-w-[5.5rem] border-2 border-paper bg-ink/50 px-3 py-3">
              <span className="block font-display text-4xl leading-none tabular-nums">
                {u.v === undefined ? "--" : String(u.v).padStart(2, "0")}
              </span>
              <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-wide text-paper/80">
                {u.l}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 drop [animation-delay:240ms]">
          <a
            href="#section-demande"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-terra text-paper border-2 border-paper font-display text-xl leading-none tracking-tight px-8 py-4 lift"
          >
            {c.ctaMain}
          </a>
          <a
            href="#section-prestataire"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-paper text-ink border-2 border-paper font-display text-xl leading-none tracking-tight px-8 py-4 lift hover:bg-paper-deep"
          >
            {c.ctaSecondary}
          </a>
        </div>

        <div className="mt-10 mx-auto max-w-2xl rotate-[-1deg] border-2 border-paper bg-paper text-ink p-4 sm:p-5 text-start shadow-[6px_6px_0_var(--terra)] drop [animation-delay:300ms]">
          <span className="inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] bg-terra text-paper px-2 py-1">
            {c.offerTag}
          </span>
          <p className="mt-3 font-semibold leading-relaxed text-pretty">{c.offer}</p>
        </div>
      </div>
    </header>
  );
}

function Steps() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].steps;
  return (
    <section id="section-processus" className="scroll-mt-24 border-b-2 border-ink bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
        <Reveal>
          <Eyebrow className="text-terra mb-4">{c.eyebrow}</Eyebrow>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
            {c.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6 items-stretch">
          {c.items.map((s, index) => (
            <Reveal key={s.t} delay={index * 90} className="h-full">
              <div className="lift-card lift-card-invert flex h-full flex-col border-2 border-paper/25 p-6">
                <span className="font-display text-5xl leading-none text-terra">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="my-5 flex overflow-hidden border-y-2 border-paper/20 bg-white">
                  <img
                    src={STEP_IMAGES[index]}
                    alt={s.alt}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <h3 className="font-sans font-semibold text-xl mt-4">{s.t}</h3>
                <p className="text-sm leading-relaxed text-paper/70 mt-2">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].why;
  return (
    <section
      id="section-pourquoi"
      className="relative isolate overflow-hidden scroll-mt-24 border-b-2 border-ink bg-paper-deep"
    >
      <BrandMark className="pointer-events-none absolute -left-12 -bottom-16 -z-10 h-[24rem] w-auto text-terra/10" />
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow className="text-terra-deep mb-4">{c.eyebrow}</Eyebrow>
            <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
              {c.title}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              {c.body}
            </p>
            <p className="mt-8 max-w-prose border-2 border-ink bg-paper p-4 font-mono text-[11px] leading-relaxed uppercase tracking-wide text-ink-soft">
              {c.note}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-6">
              {c.points.map((p) => (
                <li key={p.t} className="lift-card border-2 border-ink bg-paper p-5">
                  <div className="flex items-start gap-3">
                    <BrandMark className="mt-1.5 h-4 w-auto shrink-0 text-terra" />
                    <div>
                      <h3 className="font-sans font-bold text-lg leading-tight">{p.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">{p.b}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].services;
  return (
    <section id="section-prestations" className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-24">
      <Reveal>
        <Eyebrow className="text-terra mb-4">{c.eyebrow}</Eyebrow>
        <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
          {c.title}
        </h2>
        <p className="mt-4 max-w-prose text-lg text-ink-soft">{c.body}</p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {c.items.map((item, i) => (
          <Reveal key={item.t} delay={(i % 3) * 60} className="h-full">
            <div className="lift-card relative h-full border-2 border-ink bg-paper-deep p-5">
              <BrandMark className="h-5 w-auto text-terra" />
              <h3 className="mt-3 font-sans font-semibold text-lg leading-tight">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Coverage() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].coverage;
  return (
    <section
      id="section-villes"
      className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-28"
      aria-labelledby="coverage-title"
    >
      <Reveal className="flex flex-col overflow-hidden border-[3px] border-ink bg-paper shadow-[10px_10px_0_var(--ink)] lg:flex-row">
        <div className="flex flex-col border-b-[3px] border-ink lg:w-[38%] lg:border-r-[3px] lg:border-b-0">
          <div className="border-b-[3px] border-ink bg-terra p-7 sm:p-9">
            <Eyebrow className="mb-4 !text-[10px] font-bold text-paper">{c.eyebrow}</Eyebrow>
            <h2
              id="coverage-title"
              className="font-display text-7xl leading-[0.82] text-paper sm:text-8xl"
            >
              25
              <span className="block h-3 sm:h-5" />
              {c.cities}
            </h2>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper">
              {c.tagline}
            </p>
          </div>

          <div className="group relative min-h-96 flex-1 overflow-hidden bg-paper-deep">
            <MoroccoNetwork />
            <div className="absolute right-5 bottom-5 left-5 rotate-[-1deg] border-2 border-ink bg-paper/90 p-4 shadow-[5px_5px_0_var(--terra)] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
              <p className="font-sans text-base font-bold leading-tight uppercase">{c.card}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="border-b-[3px] border-ink p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <h3 className="font-display text-4xl leading-none sm:text-5xl">
                {c.title1}
                <br />
                {c.title2}
              </h3>
              <span className="inline-flex items-center border border-terra px-2.5 py-1.5 font-mono text-[9px] font-bold leading-none uppercase tracking-[0.16em] text-terra-deep">
                {c.badge}
              </span>
            </div>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
              {c.body}
            </p>
          </div>

          <div className="p-7 sm:p-9">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-terra-deep">
              {c.zonesTitle}
            </h4>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.zones.map((zone) => (
                <li
                  key={zone}
                  className="border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide"
                >
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Demande() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].demand;
  return (
    <section
      id="section-demande"
      className="relative isolate overflow-hidden scroll-mt-24 border-y-2 border-ink"
    >
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
            <Eyebrow className="text-terra mb-4">{c.eyebrow}</Eyebrow>
            <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-paper/85 text-pretty">
              {c.body}
            </p>
            <ul className="mt-8 space-y-4 max-w-prose">
              {c.benefits.map((b) => (
                <Benefit key={b} tone="paper">
                  {b}
                </Benefit>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <PreregistrationForm
              profile="client"
              defaultCity="Casablanca"
              defaultCategory="Nettoyage"
              source="Page /nettoyage-casablanca"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].faq;
  return (
    <section
      id="section-faq"
      className="scroll-mt-24 max-w-4xl mx-auto px-5 py-20 lg:py-28"
      aria-labelledby="faq-title"
    >
      <Reveal>
        <Eyebrow className="text-terra mb-4">{c.eyebrow}</Eyebrow>
        <h2
          id="faq-title"
          className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]"
        >
          {c.title}
        </h2>
      </Reveal>
      <div className="mt-10 space-y-4">
        {c.items.map((item, i) => (
          <Reveal key={item.q} delay={(i % 4) * 60}>
            <details className="group border-2 border-ink bg-paper-deep">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-sans font-bold leading-snug [&::-webkit-details-marker]:hidden">
                <span className="text-pretty">{item.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-terra transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="square" />
                </svg>
              </summary>
              <p className="border-t-2 border-ink/20 px-5 py-4 text-sm leading-relaxed text-ink-soft text-pretty">
                {item.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProSection() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].pro;
  return (
    <section
      id="section-prestataire"
      className="relative isolate overflow-hidden scroll-mt-24 border-t-2 border-ink bg-paper-deep"
    >
      <BrandMark className="pointer-events-none absolute -right-10 -bottom-16 -z-10 h-[26rem] w-auto text-terra/10" />
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal className="order-2 lg:order-1">
            <PreregistrationForm
              profile="prestataire"
              defaultCity="Casablanca"
              defaultCategory="Nettoyage"
              source="Page /nettoyage-casablanca"
            />
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <Eyebrow className="text-terra-deep mb-4">{c.eyebrow}</Eyebrow>
            <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              {c.body}
            </p>
            <ul className="mt-8 space-y-4 max-w-prose">
              {c.benefits.map((b) => (
                <Benefit key={b}>{b}</Benefit>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594526347174",
    Icon: Facebook,
  },
  { name: "Instagram", href: "https://www.instagram.com/page.ma22/", Icon: Instagram },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/showcase/page-ma/",
    Icon: Linkedin,
  },
];

function Footer() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].footer;
  const n = CLEANING_COPY[lang].nav;
  return (
    <footer className="relative isolate overflow-hidden border-t-2 border-ink zellige">
      <BrandMark className="pointer-events-none absolute -right-14 -bottom-20 -z-10 h-[24rem] w-auto text-ink/[0.07]" />
      <Reveal className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="lg:col-span-2 lg:pr-8">
            <img src={LOGO_URL} alt="Page.ma" className="h-9 w-auto" />
            <p className="mt-6 max-w-prose font-semibold leading-relaxed text-ink-soft text-pretty">
              {c.about}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.on} ${name}`}
                  className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <Icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={c.servicesTitle}>
            <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-terra">
              <BrandMark className="h-3 w-auto shrink-0" />
              <span>{c.servicesTitle}</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {n.links.map((link) => (
                <li key={link.href}>
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

          <nav aria-label={c.platformTitle}>
            <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-terra">
              <BrandMark className="h-3 w-auto shrink-0" />
              <span>{c.platformTitle}</span>
            </h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="#section-demande"
                  className="inline-flex items-center text-sm font-semibold leading-none text-ink-soft transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                >
                  {n.client}
                </a>
              </li>
              <li>
                <a
                  href="#section-prestataire"
                  className="inline-flex items-center text-sm font-semibold leading-none text-ink-soft transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                >
                  {n.pro}
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-semibold leading-none text-ink-soft transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                >
                  {c.backHome}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            © 2026 PAGE.MA ·
          </span>
          <span className="flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            <span>{c.legal}</span>
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

function WhatsAppWidget() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang];
  return (
    <a
      href={whatsappUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.whatsappWidget}
      className="wa-widget fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
