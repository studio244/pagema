import { useState } from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CircleCheck,
  Clock,
  Gift,
  Inbox,
  Lock,
  MapPin,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  UtensilsCrossed,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { DICTS, type Lang } from "@/lib/i18n";
import MarrakechForm, { selectSignupTab } from "./MarrakechForm";
import { MARRAKECH_COPY, type MarrakechCopy } from "./copy";

import heroPhoto from "@/assets/pagema-services-hero-2.webp";
import partner1 from "@/assets/partner-1.png";
import partner2 from "@/assets/partner-2.png";
import partner3 from "@/assets/partner-3.png";
import partner4 from "@/assets/partner-4.png";
import partner5 from "@/assets/partner-5.png";
import securitePhoto from "@/assets/marrakech/socits-de-scurit-gardiennage-et-surveillance-pour-vos-sites.png";
import nettoyagePhoto from "@/assets/marrakech/quipes-de-nettoyage-professionnel-pour-bureaux-locaux-et-domiciles.png";
import clientPhoto from "@/assets/marrakech/client-dcrivant-son-besoin-sur-pagema.webp";
import entreprisePhoto from "@/assets/marrakech/entreprise-partenaire-consultant-ses-demandes-clients.webp";
import clientAvatar from "@/assets/marrakech/avatar.png";
import companyLogo1 from "@/assets/marrakech/avatar-2.png";
import companyLogo2 from "@/assets/marrakech/avatar-3.png";
import companyLogo3 from "@/assets/marrakech/avatar-4.png";
import launchPhoto from "@/assets/marrakech/group-35.webp";
import logoSquare from "./assets/vector-31.svg";
import logoP from "@/assets/marrakech/group-38.png";
import logoPBlade from "./assets/vector-32.svg";
import logoPBlade2 from "./assets/vector-33.svg";
import footerP from "@/assets/marrakech/group-37.png";
import footerPBlade from "./assets/vector-29.svg";
import footerPBlade2 from "./assets/vector-30.svg";
import { whatsappUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/brand";
import footerWordmark from "@/assets/marrakech/group-36.png";
import { FrequentlyAskedQuestions } from "@/components/faq/FrequentlyAskedQuestions";

const PARTNERS = [
  { src: partner1, name: "Asomovit Nettoyage" },
  { src: partner2, name: "Azur Protection" },
  { src: partner3, name: "S4U (Safety For You)" },
  { src: partner4, name: "Azur Facilities" },
  { src: partner5, name: "Asomovit Sécurité Privée" },
];

/** Keys are the French service names (also the saved values); text comes from copy.ts. */
const CATEGORIES: {
  key: string;
  /** null until a photo is available: the card then shows a branded icon panel. */
  photo: string | null;
  Icon: typeof ShieldCheck;
}[] = [
  { key: "Sécurité", photo: securitePhoto, Icon: ShieldCheck },
  { key: "Nettoyage", photo: nettoyagePhoto, Icon: Sparkles },
  { key: "Jardinage", photo: "/agencies/categories/gardening.jpg", Icon: Sprout },
  { key: "Piscine", photo: "/agencies/categories/pool.jpg", Icon: Waves },
  { key: "Traiteur", photo: null, Icon: UtensilsCrossed },
];

const ENGAGEMENT_ICONS = [MapPin, Zap, BadgeCheck, Lock];
const JOURNEY_STYLES = [
  {
    photo: clientPhoto,
    tagClass: "bg-[#16181f] text-white",
    href: "#inscription",
    ctaClass: "bg-[#16181f] text-white hover:bg-black",
  },
  {
    photo: entreprisePhoto,
    tagClass: "bg-[#ffd000] text-[#16181f]",
    href: "/annuaire-ai",
    ctaClass: "bg-[#ffd000] text-[#16181f] hover:bg-[#f5c800]",
  },
];
const ADVANTAGE_STYLES = [
  {
    tagClass: "text-[#404653]/70",
    iconClass: "bg-[#16181f]/5 text-[#16181f]",
    icons: [Clock, CircleCheck, MessageSquareText],
  },
  {
    tagClass: "text-[#e0b400]",
    iconClass: "bg-[#ffd000]/15 text-[#16181f]",
    icons: [Inbox, TrendingUp, Award],
  },
];
const FOOTER_CITIES = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir"];

const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";
const eyebrow = "text-xs font-medium uppercase tracking-[1.76px] text-[#404653]/70";
const h2 =
  "text-[clamp(1.9rem,4.2vw,2.625rem)] font-black leading-[1.15] tracking-tight text-balance";
const pill =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium leading-tight shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)] transition-colors";

type Ctx = { lang: Lang; copy: MarrakechCopy; proHref: string };

function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Yellow Page.ma "P" in its black rounded square (header). */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block h-12 w-12 shrink-0 ${className}`} dir="ltr">
      <img className="absolute inset-0 h-12 w-12" src={logoSquare} alt="" />
      <span className="absolute left-[14px] top-[10px] h-[29px] w-6">
        <img className="absolute h-[29px] w-6" src={logoP} alt="" />
        <img className="absolute h-[29px] w-4" src={logoPBlade} alt="" />
        <img className="absolute h-[29px] w-2.5" src={logoPBlade2} alt="" />
      </span>
    </span>
  );
}

/** White "Page.ma" wordmark with the yellow P (footer). */
function FooterLogo() {
  return (
    <span className="relative block h-[91px] w-[196px]" role="img" aria-label="Page.ma" dir="ltr">
      <span className="absolute left-0 top-0 h-[86px] w-[73px]">
        <img className="absolute h-[86px] w-[73px]" src={footerP} alt="" />
        <img className="absolute h-[86px] w-[45px]" src={footerPBlade} alt="" />
        <img className="absolute h-[86px] w-[30px]" src={footerPBlade2} alt="" />
      </span>
      <img
        className="absolute left-[49px] top-[66px] h-[22px] w-[146px]"
        src={footerWordmark}
        alt=""
      />
    </span>
  );
}

function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-[7px] rounded-full bg-[#ffd000] sm:-bottom-1"
      />
    </span>
  );
}

/** ↗ in French, mirrored to ↖ in Arabic. */
function Arrow() {
  return <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />;
}

function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const other = lang === "ar" ? "fr" : "ar";
  return (
    <a
      href={lang === "ar" ? "/annuaire" : "/ar/annuaire"}
      hrefLang={other}
      lang={other}
      className={`text-sm font-semibold text-[#404653] underline-offset-4 hover:text-[#16181f] hover:underline ${className}`}
    >
      {MARRAKECH_COPY[lang].switchLabel}
    </a>
  );
}

function Header({ lang, copy }: Ctx) {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: copy.nav.services, href: "#services" },
    { label: copy.nav.how, href: "#fonctionnement" },
    { label: copy.nav.advantages, href: "#avantages" },
    { label: copy.nav.contact, href: whatsappUrl(lang) },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[#16181f]/10 bg-white/70 backdrop-blur-xl">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <a href="#top" aria-label={copy.nav.top}>
          <LogoMark />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label={copy.nav.main}>
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              {...externalProps(l.href)}
              className="text-sm font-medium text-[#404653] hover:text-[#16181f]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LangSwitch lang={lang} />
          <a
            href="#inscription"
            onClick={() => selectSignupTab("client")}
            className={`${pill} border border-[#16181f]/15 bg-white px-4 py-2.5 text-[#16181f] hover:bg-[#16181f]/5`}
          >
            {copy.nav.search}
          </a>
          <a
            href="#inscription"
            onClick={() => selectSignupTab("prestataire")}
            className={`${pill} bg-[#ffd000] px-4 py-2.5 text-black hover:bg-[#f5c800]`}
          >
            {copy.nav.partner}
          </a>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch lang={lang} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16181f]/15"
            aria-expanded={open}
            aria-controls="mk-mobile-menu"
            aria-label={open ? copy.nav.close : copy.nav.open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mk-mobile-menu" className="border-t border-[#16181f]/10 bg-white md:hidden">
          <nav className={`${container} flex flex-col py-3`} aria-label={copy.nav.mobile}>
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...externalProps(l.href)}
                onClick={() => setOpen(false)}
                className="border-b border-[#16181f]/10 py-3 text-base font-medium text-[#16181f] last:border-b-0"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="#inscription"
                onClick={() => {
                  selectSignupTab("client");
                  setOpen(false);
                }}
                className={`${pill} border border-[#16181f]/15 bg-white text-[#16181f]`}
              >
                {copy.nav.search}
              </a>
              <a
                href="#inscription"
                onClick={() => {
                  selectSignupTab("prestataire");
                  setOpen(false);
                }}
                className={`${pill} bg-[#ffd000] text-black`}
              >
                {copy.nav.partner}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ copy, proHref }: Ctx) {
  return (
    <section className="relative isolate overflow-hidden bg-[#16181f]">
      <img
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[35%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden="true" />
      {/* Yellow Page.ma blade on the end side, as in the design (large screens only). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 450 651"
        preserveAspectRatio="none"
        className="absolute inset-y-0 end-0 -z-10 hidden h-full w-[31%] rtl:-scale-x-100 lg:block"
      >
        <defs>
          <linearGradient id="mk-blade-shade" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0" stopColor="#000" stopOpacity="0.45" />
            <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L330 392 Q362 430 330 468 C272 540 250 600 262 651 L450 651 L450 0 Z"
          fill="#ffd000"
        />
        <path
          d="M0 0 L330 392 Q362 430 330 468 C272 540 250 600 262 651 L450 651 L450 0 Z"
          fill="url(#mk-blade-shade)"
        />
      </svg>

      <div
        className={`${container} flex min-h-[560px] flex-col items-center justify-center py-20 text-center text-white sm:min-h-[620px] lg:py-28`}
      >
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ffd000] px-4 py-1.5 text-sm font-semibold text-[#16181f] shadow-[0_8px_24px_-8px_rgb(255_208_0_/_0.7)]">
          <Gift className="h-4 w-4" aria-hidden="true" />
          {copy.hero.offer}
        </p>
        <h1 className="max-w-3xl text-[clamp(2.2rem,5.4vw,3.75rem)] font-bold leading-[1.12] tracking-[0.01em] text-balance">
          {copy.hero.title} <span className="text-[#ffd000]">{copy.hero.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          {copy.hero.body}
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a href={proHref} className={`${pill} bg-[#ffd000] text-black hover:bg-[#f5c800]`}>
            {copy.hero.partner} <Arrow />
          </a>
          <a href="#inscription" className={`${pill} bg-[#16181f] text-white hover:bg-black`}>
            {copy.hero.quotes} <Arrow />
          </a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck className="h-4 w-4 text-[#ffd000]" aria-hidden="true" />
          {copy.hero.free}
        </p>
      </div>
    </section>
  );
}

function PartnersStrip({ copy }: Ctx) {
  return (
    <section aria-label={copy.partnersLabel} className="border-y border-[#16181f]/10 bg-white">
      <div className="partners-marquee partners-mask overflow-hidden py-8" dir="ltr">
        <div className="partners-track flex w-max">
          {[0, 1].map((copyIndex) => (
            <ul
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:gap-16 lg:px-8"
            >
              {PARTNERS.map((p) => (
                <li key={p.name} className="flex w-36 shrink-0 justify-center sm:w-44">
                  <img
                    src={p.src}
                    alt={copyIndex === 0 ? p.name : ""}
                    className="h-12 w-auto max-w-full object-contain sm:h-14"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories({ copy }: Ctx) {
  return (
    <section id="services" className="scroll-mt-16 bg-[#ffd000]">
      <div className={`${container} py-16 sm:py-24`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className={eyebrow}>{copy.categories.eyebrow}</p>
          <h2 className={`${h2} mt-4`}>{copy.categories.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#404653]">{copy.categories.body}</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CATEGORIES.map(({ key, photo, Icon }) => (
            <li
              key={key}
              className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_16px_-4px_rgb(22_24_31_/_0.08)]"
            >
              {photo ? (
                <div className="relative aspect-[533/384]">
                  <img src={photo} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute start-3 top-3 flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/30 text-[#ffd000] backdrop-blur-md">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              ) : (
                <div className="relative flex aspect-[533/384] items-center justify-center overflow-hidden bg-[#16181f]">
                  <span
                    aria-hidden="true"
                    className="absolute -end-10 -top-10 h-40 w-40 rounded-full bg-[#ffd000]/15 blur-2xl"
                  />
                  <Icon className="h-16 w-16 text-[#ffd000]" strokeWidth={1.5} aria-hidden="true" />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl leading-snug tracking-tight">{copy.services[key]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#404653]">
                  {copy.categories.items[key]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-[#16181f]/10">
        <ul className={`${container} grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4`}>
          {copy.engagements.map(({ title, body }, i) => {
            const Icon = ENGAGEMENT_ICONS[i] ?? MapPin;
            return (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#16181f]">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#404653]">{body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks({ copy, proHref }: Ctx) {
  return (
    <section id="fonctionnement" className="scroll-mt-16 bg-white">
      <div className={`${container} py-16 sm:py-24`}>
        <p className={eyebrow}>{copy.how.eyebrow}</p>
        <h2 className={`${h2} mt-4`}>
          {copy.how.title} <Underlined>{copy.how.titleAccent}</Underlined>
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {copy.how.journeys.map((j, index) => {
            const style = JOURNEY_STYLES[index] ?? JOURNEY_STYLES[0]!;
            const href = style.href === "/annuaire-ai" ? proHref : style.href;
            return (
              <article
                key={j.tag}
                className="flex flex-col gap-8 rounded-3xl bg-white/55 p-6 shadow-[0px_0px_0px_1px_rgb(22_24_31_/_0.1)] sm:p-8"
              >
                <img
                  src={style.photo}
                  alt={j.alt}
                  className="aspect-[958/576] w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col">
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1.76px] ${style.tagClass}`}
                  >
                    {j.tag}
                  </span>
                  <ol className="mt-6 space-y-6">
                    {j.steps.map((s, i) => (
                      <li key={s.t} className="flex gap-4">
                        <span className="font-fraunces flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffd000]/15 text-sm">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-fraunces text-base font-medium leading-snug">{s.t}</p>
                          <p className="mt-1 text-sm leading-relaxed text-[#404653]">{s.b}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <a href={href} className={`${pill} mt-8 w-full py-3.5 ${style.ctaClass}`}>
                    {j.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Yellow link with a pulse travelling along it: horizontal on desktop, vertical when stacked. */
function EcoLink({ delay = 0 }: { delay?: number }) {
  const style = { "--eco-delay": `${delay}ms` } as React.CSSProperties;
  return (
    <>
      <span className="eco-link eco-link-x hidden md:block" style={style} aria-hidden="true" />
      <span className="eco-link eco-link-y md:hidden" style={style} aria-hidden="true" />
    </>
  );
}

/** Fixed positions so server and client render the same sparkles. */
const ECO_SPARKS = [
  { x: 6, y: 18, s: 3, d: 0 },
  { x: 14, y: 72, s: 2, d: 1.4 },
  { x: 22, y: 40, s: 4, d: 2.6 },
  { x: 31, y: 88, s: 2, d: 0.8 },
  { x: 44, y: 12, s: 3, d: 3.2 },
  { x: 52, y: 62, s: 2, d: 1.9 },
  { x: 63, y: 30, s: 3, d: 0.4 },
  { x: 71, y: 82, s: 4, d: 2.2 },
  { x: 79, y: 16, s: 2, d: 3.6 },
  { x: 86, y: 52, s: 3, d: 1.1 },
  { x: 93, y: 78, s: 2, d: 2.9 },
  { x: 97, y: 34, s: 3, d: 0.6 },
];

/** Tilts the card toward the pointer; CSS reads --rx/--ry and ignores them under reduced motion. */
function tiltHandlers() {
  return {
    onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
      if (e.pointerType !== "mouse") return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${px * 6}deg`);
      el.style.setProperty("--rx", `${py * -6}deg`);
      el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    },
    onPointerLeave(e: React.PointerEvent<HTMLDivElement>) {
      const el = e.currentTarget;
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    },
  };
}

function Ecosystem({ copy }: Ctx) {
  const words = copy.ecosystem.title.split(" ");
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="eco-glow absolute -start-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#ffd000]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="eco-glow eco-glow-alt absolute -bottom-48 end-0 -z-10 h-[520px] w-[640px] rounded-full bg-white/10 blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {ECO_SPARKS.map((p, i) => (
          <span
            key={i}
            className="eco-spark"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.s,
                height: p.s,
                "--eco-delay": `${p.d}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className={`${container} py-16 sm:py-24`}>
        <Reveal className="eco-title mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[1.76px] text-white/70">
            {copy.ecosystem.eyebrow}
          </p>
          <h2 className={`${h2} mt-4`} aria-label={copy.ecosystem.title}>
            {words.map((w, i) => (
              <span key={i} aria-hidden="true">
                <span className="eco-word inline-block" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={120} className="eco-stage mx-auto mt-12 max-w-5xl">
          <div className="eco-tilt" {...tiltHandlers()}>
            <div className="eco-frame rounded-[29px] p-[2px]">
              <div className="eco-card relative overflow-hidden rounded-[27px] bg-white p-5 text-[#16181f] sm:p-8 lg:p-11">
                <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8">
                  <div className="eco-side eco-side-start flex flex-col items-center gap-2 rounded-[22px] bg-[#16181f]/4 p-7 text-center">
                    <div className="flex -space-x-3">
                      {[clientAvatar, clientPhoto, entreprisePhoto].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className="eco-avatar h-12 w-12 rounded-full border-2 border-white object-cover"
                          style={
                            {
                              "--eco-delay": `${i * 220}ms`,
                              "--pop": `${400 + i * 110}ms`,
                            } as React.CSSProperties
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[1.76px] text-[#404653]/70">
                      {copy.ecosystem.clients}
                    </p>
                    <p className="text-base leading-relaxed text-[#404653]">
                      {copy.ecosystem.clientsBody}
                    </p>
                  </div>

                  <div className="eco-center flex flex-col items-center justify-center gap-3 md:flex-row">
                    <EcoLink />
                    <span className="eco-hub relative inline-flex">
                      <span className="eco-orbit" aria-hidden="true">
                        <span />
                        <span />
                      </span>
                      <LogoMark className="eco-logo scale-125" />
                    </span>
                    <EcoLink delay={900} />
                  </div>

                  <div className="eco-side eco-side-end flex flex-col items-center gap-2 rounded-[22px] bg-[#ffd000]/15 p-7 text-center">
                    <div className="flex -space-x-3">
                      {[companyLogo1, companyLogo2, companyLogo3].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className="eco-avatar h-12 w-12 rounded-full border-2 border-white object-cover"
                          style={
                            {
                              "--eco-delay": `${660 + i * 220}ms`,
                              "--pop": `${620 + i * 110}ms`,
                            } as React.CSSProperties
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[1.76px]">
                      {copy.ecosystem.companies}
                    </p>
                    <p className="text-base leading-relaxed text-[#404653]">
                      {copy.ecosystem.companiesBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal delay={240 + i * 90}>
                <a
                  href="#services"
                  className="eco-chip group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white/15 px-4 py-4 text-sm font-medium shadow-[0px_0px_0px_1px_rgb(255_255_255_/_0.15)] backdrop-blur-xl transition-[background-color,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white/25 hover:shadow-[0px_0px_0px_1px_rgb(255_208_0_/_0.6),0_10px_30px_-10px_rgb(255_208_0_/_0.5)] sm:text-base"
                  style={{ "--eco-delay": `${i * 0.7}s` } as React.CSSProperties}
                >
                  <Icon
                    className="h-5 w-5 text-[#ffd000] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  {copy.services[key]}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Advantages({ copy }: Ctx) {
  return (
    <section id="avantages" className="scroll-mt-16 bg-white">
      <div className={`${container} py-16 sm:py-24`}>
        <p className={eyebrow}>{copy.advantages.eyebrow}</p>
        <h2 className={`${h2} mt-4`}>{copy.advantages.title}</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {copy.advantages.groups.map((group, g) => {
            const style = ADVANTAGE_STYLES[g] ?? ADVANTAGE_STYLES[0]!;
            return (
              <div
                key={group.tag}
                className="rounded-[22px] border border-[#ffd000] bg-white/55 p-6 sm:p-8"
              >
                <p className={`text-xs font-medium uppercase tracking-[1.76px] ${style.tagClass}`}>
                  {group.tag}
                </p>
                <ul className="mt-6 space-y-5">
                  {group.items.map(({ t, b }, i) => {
                    const Icon = style.icons[i] ?? Clock;
                    return (
                      <li key={t} className="flex gap-4">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconClass}`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-fraunces text-base font-medium leading-snug">{t}</p>
                          <p className="mt-1 text-sm leading-relaxed text-[#404653]">{b}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Launch({ copy, proHref }: Ctx) {
  return (
    <section className="bg-[#fefcee]">
      <div className={`${container} py-16 sm:py-24`}>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ffa800] via-[#ffb400] to-[#ffd000] rtl:bg-gradient-to-bl">
          <img
            src={launchPhoto}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 end-0 -z-10 hidden h-full w-auto object-contain object-right-bottom rtl:-scale-x-100 lg:block"
          />
          <div className="flex flex-col items-center px-6 py-14 text-center sm:px-10 lg:w-[62%] lg:py-20">
            <p className="flex items-center gap-2 rounded-full bg-[#ffd000] px-4 py-1.5 text-xs font-medium text-[#16181f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16181f]" aria-hidden="true" />
              {copy.launch.badge}
            </p>
            <h2 className={`${h2} mt-6 text-white`}>{copy.launch.title}</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#16181f]/80">
              {copy.launch.body}
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#inscription"
                className={`${pill} bg-[#ffd000] text-[#16181f] hover:bg-[#ffe14d]`}
              >
                {copy.launch.search}
              </a>
              <a href={proHref} className={`${pill} bg-[#16181f] text-white hover:bg-black`}>
                {copy.launch.partner}
              </a>
            </div>
            <ol className="mt-10 grid w-full max-w-md grid-cols-3 gap-3">
              {copy.launch.steps.map((label, i) => (
                <li key={label} className="rounded-[14px] bg-white px-3 py-4 text-center">
                  <p className="font-fraunces text-xl text-[#e0b400]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-xs text-[#404653]">{label}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signup({ lang, copy }: Ctx) {
  return (
    <section id="inscription" className="scroll-mt-16 bg-[#fefcee]">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col items-center gap-10 px-5 pb-20 pt-4 sm:px-8 sm:pb-24">
        <div className="max-w-4xl text-center">
          <h2 className={h2}>
            {copy.signup.title} <Underlined>{copy.signup.titleAccent}</Underlined>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#404653]">{copy.signup.body}</p>
        </div>
        <MarrakechForm lang={lang} />
      </div>
    </section>
  );
}

function Footer({ lang, copy, proHref }: Ctx) {
  const cityLabels = DICTS[lang].cityLabels;
  const columns: { title: string; links: { label: string; href?: string }[] }[] = [
    {
      title: copy.footer.services,
      links: CATEGORIES.map(({ key }) => ({
        label: copy.services[key] ?? key,
        href: key === "Nettoyage" ? (lang === "ar" ? "/ar/nettoyage-casablanca" : "/nettoyage-casablanca") : "#services",
      })),
    },
    { title: copy.footer.cities, links: FOOTER_CITIES.map((c) => ({ label: cityLabels[c] ?? c })) },
    {
      title: copy.footer.platform,
      links: [
        { label: copy.footer.how, href: "#fonctionnement" },
        { label: copy.footer.partner, href: proHref },
        { label: copy.footer.signup, href: "#inscription" },
        { label: copy.footer.contact, href: whatsappUrl(lang) },
      ],
    },
  ];
  return (
    <footer className="bg-[#16181f] text-white">
      <div
        className={`${container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16`}
      >
        <div>
          <FooterLogo />
          <p className="mt-5 max-w-60 text-sm leading-relaxed text-white/75">{copy.footer.about}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[1.76px]">{col.title}</p>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((l) => (
                <li key={l.label} className="text-sm text-white/75">
                  {l.href ? (
                    <a href={l.href} {...externalProps(l.href)} className="hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    l.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div
          className={`${container} flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>{copy.footer.rights}</p>
          <div className="flex gap-6">
            <span>{copy.footer.legal}</span>
            <span>{copy.footer.privacy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Pagema({ lang }: { lang: Lang }) {
  const ctx: Ctx = {
    lang,
    copy: MARRAKECH_COPY[lang],
    proHref: lang === "ar" ? "/ar/annuaire-ai" : "/annuaire-ai",
  };
  return (
    <div
      id="top"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-[#16181f]"
    >
      <Header {...ctx} />
      <main>
        <Hero {...ctx} />
        <PartnersStrip {...ctx} />
        <Categories {...ctx} />
        <HowItWorks {...ctx} />
        <Ecosystem {...ctx} />
        <Advantages {...ctx} />
        <Launch {...ctx} />
        <Signup {...ctx} />
        <FrequentlyAskedQuestions lang={lang} variant="annuaire" />
      </main>
      <Footer {...ctx} />
    </div>
  );
}
