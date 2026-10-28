import { useEffect } from "react";
import { FreeMonthCounter } from "@/components/FreeMonthCounter";
import { DICTS, LangContext, useT, type Lang } from "@/lib/i18n";
import { Benefit, BrandMark, Eyebrow, Reveal, WhatsAppIcon } from "@/components/brand";
import { MoroccoNetwork } from "@/components/MoroccoNetwork";
import { PreregistrationForm } from "@/components/home/PreregistrationForm";
import { whatsappUrl } from "@/lib/whatsapp";
import { agencyPath, type Agency } from "@/lib/agencies";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteBreadcrumb } from "@/components/site/SiteBreadcrumb";
import { crumbs, localPath, tradeHref } from "@/components/site/nav";
import { CLEANING_COPY } from "./copy";
import heroAsset from "@/assets/pagema-services-hero-2.webp";
import prosAsset from "@/assets/pagema-pros-equipe.jpg";
import step1 from "@/assets/process-step-1.png.asset.json";
import step2 from "@/assets/process-step-2.png.asset.json";
import step3 from "@/assets/process-step-3.png.asset.json";

const HERO_URL = heroAsset;
const STEP_IMAGES = [step1.url, step2.url, step3.url];

export default function NettoyageCasablancaPage({
  lang,
  agencies,
}: {
  lang: Lang;
  /** Published directory agencies offering Nettoyage in Casablanca. */
  agencies: Agency[];
}) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t: DICTS[lang], setLang: () => {} }}>
      <div
        id="top"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="brand-v2 min-h-screen bg-paper text-ink font-sans"
      >
        <SiteHeader
          lang={lang}
          switchHref={lang === "ar" ? "/nettoyage-casablanca" : "/ar/nettoyage-casablanca"}
          ctaHref="#section-prestataire"
        />
        <div className="border-b-2 border-ink bg-paper">
          <SiteBreadcrumb
            lang={lang}
            items={crumbs(lang).cleaning}
            className="max-w-6xl mx-auto px-5 py-3"
          />
        </div>
        <Hero />
        <Steps />
        <Why />
        <Services agencies={agencies} />
        <Coverage />
        <Demande />
        <Faq />
        <ProSection />
        <SiteFooter lang={lang} page="nettoyage-casablanca" />
        <WhatsAppWidget />
      </div>
    </LangContext.Provider>
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

function Hero() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].hero;

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
          <FreeMonthCounter lang={lang} />
        </div>
      </div>
    </header>
  );
}

function Steps() {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].steps;
  return (
    <section
      id="section-processus"
      className="scroll-mt-24 border-b-2 border-ink bg-ink text-paper"
    >
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
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">
                        {p.b}
                      </p>
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

function Services({ agencies }: { agencies: Agency[] }) {
  const { lang } = useT();
  const c = CLEANING_COPY[lang].services;
  const d = CLEANING_COPY[lang].directory;
  return (
    <section
      id="section-prestations"
      className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-24"
    >
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
      <Reveal className="mt-10 border-2 border-ink bg-paper p-6">
        {agencies.length > 0 && (
          <>
            <h3 className="font-sans font-semibold text-lg leading-tight">{d.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {agencies.map((agency) => (
                <li key={agency.slug}>
                  <a
                    href={agencyPath(lang, agency.slug)}
                    className="inline-flex border-2 border-ink bg-paper-deep px-3.5 py-2 text-sm font-semibold hover:bg-terra hover:text-paper"
                  >
                    {agency.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className={`${agencies.length > 0 ? "mt-5 " : ""}text-sm leading-relaxed text-ink-soft`}>
          <a
            href={tradeHref(lang, "Nettoyage")}
            className="font-semibold text-ink underline decoration-terra decoration-2 underline-offset-4 hover:text-terra-deep"
          >
            {d.category}
          </a>
          {" · "}
          <a
            href={localPath(lang, "/services")}
            className="font-semibold text-ink underline decoration-terra decoration-2 underline-offset-4 hover:text-terra-deep"
          >
            {d.all}
          </a>
        </p>
      </Reveal>
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
