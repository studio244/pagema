import { useState } from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CircleCheck,
  Clock,
  Inbox,
  Lock,
  MapPin,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Waves,
  X,
  Zap,
} from "lucide-react";
import MarrakechForm from "./MarrakechForm";

import heroPhoto from "@/assets/pagema-services-hero-2.png";
import partner1 from "@/assets/partner-1.png";
import partner2 from "@/assets/partner-2.png";
import partner3 from "@/assets/partner-3.png";
import partner4 from "@/assets/partner-4.png";
import partner5 from "@/assets/partner-5.png";
import securitePhoto from "@/assets/marrakech/socits-de-scurit-gardiennage-et-surveillance-pour-vos-sites.png";
import nettoyagePhoto from "@/assets/marrakech/quipes-de-nettoyage-professionnel-pour-bureaux-locaux-et-domiciles.png";
import clientPhoto from "@/assets/marrakech/client-dcrivant-son-besoin-sur-pagema.png";
import entreprisePhoto from "@/assets/marrakech/entreprise-partenaire-consultant-ses-demandes-clients.png";
import clientAvatar from "@/assets/marrakech/avatar.png";
import companyLogo1 from "@/assets/marrakech/avatar-2.png";
import companyLogo2 from "@/assets/marrakech/avatar-3.png";
import companyLogo3 from "@/assets/marrakech/avatar-4.png";
import launchPhoto from "@/assets/marrakech/group-35.png";
import logoSquare from "./assets/vector-31.svg";
import logoP from "@/assets/marrakech/group-38.png";
import logoPBlade from "./assets/vector-32.svg";
import logoPBlade2 from "./assets/vector-33.svg";
import footerP from "@/assets/marrakech/group-37.png";
import footerPBlade from "./assets/vector-29.svg";
import footerPBlade2 from "./assets/vector-30.svg";
import footerWordmark from "@/assets/marrakech/group-36.png";

const WHATSAPP_URL = "https://wa.me/212664272854";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Fonctionnement", href: "#fonctionnement" },
  { label: "Avantages", href: "#avantages" },
  { label: "Contact", href: WHATSAPP_URL },
];

const PARTNERS = [
  { src: partner1, name: "Asomovit Nettoyage" },
  { src: partner2, name: "Azur Protection" },
  { src: partner3, name: "S4U — Safety For You" },
  { src: partner4, name: "Azur Facilities" },
  { src: partner5, name: "Asomovit Sécurité Privée" },
];

const CATEGORIES: {
  title: string;
  body: string;
  /** null until a photo is available: the card then shows a branded icon panel. */
  photo: string | null;
  Icon: typeof ShieldCheck;
}[] = [
  {
    title: "Sécurité",
    body: "Sociétés de sécurité, gardiennage et surveillance pour vos sites.",
    photo: securitePhoto,
    Icon: ShieldCheck,
  },
  {
    title: "Nettoyage",
    body: "Équipes de nettoyage professionnel pour bureaux, locaux et domiciles.",
    photo: nettoyagePhoto,
    Icon: Sparkles,
  },
  {
    title: "Jardinage",
    body: "Entretien de jardins, espaces verts et aménagements extérieurs.",
    photo: null,
    Icon: Sprout,
  },
  {
    title: "Piscine",
    body: "Entretien, nettoyage et maintenance de piscines.",
    photo: null,
    Icon: Waves,
  },
];

const ENGAGEMENTS = [
  { title: "Disponible au Maroc", body: "Un service pensé pour les besoins locaux.", Icon: MapPin },
  { title: "Réponse rapide", body: "Votre demande atteint les bons professionnels.", Icon: Zap },
  {
    title: "Professionnels adaptés",
    body: "Des entreprises selon votre service et votre ville.",
    Icon: BadgeCheck,
  },
  { title: "Simple et sécurisée", body: "Vos coordonnées restent confidentielles.", Icon: Lock },
];

const JOURNEYS = [
  {
    tag: "Pour les clients",
    tagClass: "bg-[#16181f] text-white",
    photo: clientPhoto,
    alt: "Cliente décrivant son besoin sur Page.ma depuis son téléphone",
    steps: [
      { t: "Décrivez votre besoin", b: "Un formulaire simple, en moins d'une minute." },
      {
        t: "Les professionnels reçoivent la demande",
        b: "Page.ma identifie les entreprises adaptées.",
      },
      { t: "Recevez des propositions", b: "Comparez et choisissez en toute sérénité." },
    ],
    cta: {
      label: "Je cherche un prestataire",
      href: "#inscription",
      className: "bg-[#16181f] text-white hover:bg-black",
    },
  },
  {
    tag: "Pour les entreprises",
    tagClass: "bg-[#ffd000] text-[#16181f]",
    photo: entreprisePhoto,
    alt: "Entreprise partenaire consultant ses demandes clients",
    steps: [
      { t: "Créez votre présence partenaire", b: "Votre activité, vos services, vos villes." },
      { t: "Recevez des opportunités qualifiées", b: "Des demandes correspondant à votre métier." },
      { t: "Développez votre activité", b: "Transformez les demandes en nouveaux clients." },
    ],
    cta: {
      label: "Devenir partenaire",
      href: "/pro",
      className: "bg-[#ffd000] text-[#16181f] hover:bg-[#f5c800]",
    },
  },
];

const ADVANTAGES = [
  {
    tag: "Pour les clients",
    tagClass: "text-[#404653]/70",
    iconClass: "bg-[#16181f]/5 text-[#16181f]",
    items: [
      {
        t: "Gagnez du temps",
        b: "Une seule demande, plusieurs professionnels contactés.",
        Icon: Clock,
      },
      {
        t: "Trouvez les bons professionnels",
        b: "Des entreprises dont l'activité correspond à votre besoin.",
        Icon: CircleCheck,
      },
      {
        t: "Une demande simple",
        b: "Décrivez votre besoin, recevez des propositions.",
        Icon: MessageSquareText,
      },
    ],
  },
  {
    tag: "Pour les entreprises",
    tagClass: "text-[#e0b400]",
    iconClass: "bg-[#ffd000]/15 text-[#16181f]",
    items: [
      {
        t: "Recevez de nouvelles opportunités",
        b: "Des demandes qualifiées dans vos villes d'intervention.",
        Icon: Inbox,
      },
      {
        t: "Développez votre activité",
        b: "Un canal d'acquisition dédié à votre métier.",
        Icon: TrendingUp,
      },
      {
        t: "Soyez parmi les premiers partenaires",
        b: "Une visibilité prioritaire dès le lancement.",
        Icon: Award,
      },
    ],
  },
];

const LAUNCH_STEPS = [
  { n: "01", label: "Inscription" },
  { n: "02", label: "Sélection" },
  { n: "03", label: "Lancement" },
];

const FOOTER_COLUMNS: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: "Services",
    links: ["Sécurité", "Nettoyage", "Jardinage", "Piscine"].map((label) => ({
      label,
      href: "#services",
    })),
  },
  {
    title: "Villes",
    links: ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir"].map((label) => ({ label })),
  },
  {
    title: "Plateforme",
    links: [
      { label: "Comment ça marche", href: "#fonctionnement" },
      { label: "Devenir partenaire", href: "/pro" },
      { label: "Préinscription", href: "#inscription" },
      { label: "Contact", href: WHATSAPP_URL },
    ],
  },
];

const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";
const eyebrow = "text-xs font-medium uppercase tracking-[1.76px] text-[#404653]/70";
const h2 =
  "text-[clamp(1.9rem,4.2vw,2.625rem)] font-black leading-[1.15] tracking-tight text-balance";
const pill =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium leading-tight shadow-[0px_1px_2px_-1px_rgb(0_0_0_/_0.1),_0px_1px_3px_0px_rgb(0_0_0_/_0.1)] transition-colors";

function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Yellow Page.ma "P" in its black rounded square (header). */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block h-12 w-12 shrink-0 ${className}`}>
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
    <span className="relative block h-[91px] w-[196px]" role="img" aria-label="Page.ma">
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

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#16181f]/10 bg-white/70 backdrop-blur-xl">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <a href="#top" aria-label="Page.ma — haut de page">
          <LogoMark />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...externalProps(l.href)}
              className="text-sm font-medium text-[#404653] hover:text-[#16181f]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#inscription"
            className={`${pill} border border-[#16181f]/15 bg-white px-4 py-2.5 text-[#16181f] hover:bg-[#16181f]/5`}
          >
            Je cherche
          </a>
          <a
            href="/pro"
            className={`${pill} bg-[#ffd000] px-4 py-2.5 text-black hover:bg-[#f5c800]`}
          >
            Devenir partenaire
          </a>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#16181f]/15 md:hidden"
          aria-expanded={open}
          aria-controls="mk-mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div id="mk-mobile-menu" className="border-t border-[#16181f]/10 bg-white md:hidden">
          <nav className={`${container} flex flex-col py-3`} aria-label="Navigation mobile">
            {NAV.map((l) => (
              <a
                key={l.label}
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
                onClick={() => setOpen(false)}
                className={`${pill} border border-[#16181f]/15 bg-white text-[#16181f]`}
              >
                Je cherche
              </a>
              <a href="/pro" className={`${pill} bg-[#ffd000] text-black`}>
                Devenir partenaire
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
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
      {/* Yellow Page.ma blade on the right, as in the design (large screens only). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 450 651"
        preserveAspectRatio="none"
        className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[31%] lg:block"
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
        <h1 className="max-w-3xl text-[clamp(2.2rem,5.4vw,3.75rem)] font-bold leading-[1.12] tracking-[0.01em] text-balance">
          Trouvez le bon service. <span className="text-[#ffd000]">Développez votre activité.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Page.ma met en relation les clients avec des entreprises de services au Maroc. Choisissez
          votre parcours et rejoignez les premiers inscrits.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a href="/pro" className={`${pill} bg-[#ffd000] text-black hover:bg-[#f5c800]`}>
            Devenir partenaire <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="#inscription" className={`${pill} bg-[#16181f] text-white hover:bg-black`}>
            Recevoir des devis <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck className="h-4 w-4 text-[#ffd000]" aria-hidden="true" />
          Inscription gratuite, sans engagement.
        </p>
      </div>
    </section>
  );
}

function PartnersStrip() {
  return (
    <section aria-label="Ils nous font confiance" className="border-y border-[#16181f]/10 bg-white">
      <ul
        className={`${container} grid grid-cols-2 items-center gap-x-6 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-5`}
      >
        {PARTNERS.map((p) => (
          <li key={p.name} className="flex justify-center">
            <img
              src={p.src}
              alt={p.name}
              className="h-12 w-auto max-w-full object-contain sm:h-14"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Categories() {
  return (
    <section id="services" className="scroll-mt-16 bg-[#ffd000]">
      <div className={`${container} py-16 sm:py-24`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className={eyebrow}>Nos catégories</p>
          <h2 className={`${h2} mt-4`}>Quatre métiers, un seul point d'entrée</h2>
          <p className="mt-4 text-base leading-relaxed text-[#404653]">
            Choisissez votre catégorie : votre demande est transmise aux entreprises
            correspondantes, dans votre ville.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ title, body, photo, Icon }) => (
            <li
              key={title}
              className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_16px_-4px_rgb(22_24_31_/_0.08)]"
            >
              {photo ? (
                <div className="relative aspect-[533/384]">
                  <img src={photo} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/30 text-[#ffd000] backdrop-blur-md">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              ) : (
                <div className="relative flex aspect-[533/384] items-center justify-center overflow-hidden bg-[#16181f]">
                  <span
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ffd000]/15 blur-2xl"
                  />
                  <Icon className="h-16 w-16 text-[#ffd000]" strokeWidth={1.5} aria-hidden="true" />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl leading-snug tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#404653]">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-[#16181f]/10">
        <ul className={`${container} grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4`}>
          {ENGAGEMENTS.map(({ title, body, Icon }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#16181f]">
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#404653]">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="fonctionnement" className="scroll-mt-16 bg-white">
      <div className={`${container} py-16 sm:py-24`}>
        <p className={eyebrow}>Comment ça marche</p>
        <h2 className={`${h2} mt-4`}>
          Deux parcours, <Underlined>un même objectif</Underlined>
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {JOURNEYS.map((j) => (
            <article
              key={j.tag}
              className="flex flex-col gap-8 rounded-3xl bg-white/55 p-6 shadow-[0px_0px_0px_1px_rgb(22_24_31_/_0.1)] sm:p-8"
            >
              <img
                src={j.photo}
                alt={j.alt}
                className="aspect-[958/576] w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col">
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[1.76px] ${j.tagClass}`}
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
                <a href={j.cta.href} className={`${pill} mt-8 w-full py-3.5 ${j.cta.className}`}>
                  {j.cta.label}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#ffd000]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 right-0 -z-10 h-[520px] w-[640px] rounded-full bg-white/10 blur-3xl"
      />
      <div className={`${container} py-16 sm:py-24`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[1.76px] text-white/70">
            L'écosystème
          </p>
          <h2 className={`${h2} mt-4`}>Une place de marché qui relie les deux côtés</h2>
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-[27px] bg-white p-5 text-[#16181f] shadow-[0px_0px_0px_1px_rgb(22_24_31_/_0.1)] sm:p-8 lg:p-11">
          <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8">
            <div className="flex flex-col items-center gap-2 rounded-[22px] bg-[#16181f]/4 p-7 text-center">
              <div className="flex -space-x-3">
                {[clientAvatar, clientPhoto, entreprisePhoto].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-12 w-12 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-[1.76px] text-[#404653]/70">
                Clients
              </p>
              <p className="text-base leading-relaxed text-[#404653]">
                Particuliers et entreprises qui déposent un besoin.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="hidden h-px w-16 bg-[#ffd000] md:block" aria-hidden="true" />
              <LogoMark className="scale-125" />
              <span className="hidden h-px w-16 bg-[#ffd000] md:block" aria-hidden="true" />
            </div>

            <div className="flex flex-col items-center gap-2 rounded-[22px] bg-[#ffd000]/15 p-7 text-center">
              <div className="flex -space-x-3">
                {[companyLogo1, companyLogo2, companyLogo3].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-12 w-12 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-[1.76px]">Entreprises</p>
              <p className="text-base leading-relaxed text-[#404653]">
                Sociétés professionnelles qui reçoivent des opportunités.
              </p>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4">
          {CATEGORIES.map(({ title, Icon }) => (
            <li key={title}>
              <a
                href="#services"
                className="flex items-center justify-center gap-3 rounded-2xl bg-white/15 px-4 py-4 text-sm font-medium shadow-[0px_0px_0px_1px_rgb(255_255_255_/_0.15)] backdrop-blur-xl hover:bg-white/25 sm:text-base"
              >
                <Icon className="h-5 w-5 text-[#ffd000]" aria-hidden="true" />
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section id="avantages" className="scroll-mt-16 bg-white">
      <div className={`${container} py-16 sm:py-24`}>
        <p className={eyebrow}>Avantages</p>
        <h2 className={`${h2} mt-4`}>Pourquoi rejoindre Page.ma&nbsp;?</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {ADVANTAGES.map((group) => (
            <div
              key={group.tag}
              className="rounded-[22px] border border-[#ffd000] bg-white/55 p-6 sm:p-8"
            >
              <p className={`text-xs font-medium uppercase tracking-[1.76px] ${group.tagClass}`}>
                {group.tag}
              </p>
              <ul className="mt-6 space-y-5">
                {group.items.map(({ t, b, Icon }) => (
                  <li key={t} className="flex gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${group.iconClass}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-fraunces text-base font-medium leading-snug">{t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#404653]">{b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Launch() {
  return (
    <section className="bg-[#fefcee]">
      <div className={`${container} py-16 sm:py-24`}>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ffa800] via-[#ffb400] to-[#ffd000]">
          <img
            src={launchPhoto}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-full w-auto object-contain object-right-bottom lg:block"
          />
          <div className="flex flex-col items-center px-6 py-14 text-center sm:px-10 lg:w-[62%] lg:py-20">
            <p className="flex items-center gap-2 rounded-full bg-[#ffd000] px-4 py-1.5 text-xs font-medium text-[#16181f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16181f]" aria-hidden="true" />
              Places partenaires limitées pour le lancement
            </p>
            <h2 className={`${h2} mt-6 text-white`}>Le lancement approche</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#16181f]/80">
              Rejoignez les premiers utilisateurs et partenaires Page.ma au Maroc.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#inscription"
                className={`${pill} bg-[#ffd000] text-[#16181f] hover:bg-[#ffe14d]`}
              >
                Je cherche un service
              </a>
              <a href="/pro" className={`${pill} bg-[#16181f] text-white hover:bg-black`}>
                Je deviens partenaire
              </a>
            </div>
            <ol className="mt-10 grid w-full max-w-md grid-cols-3 gap-3">
              {LAUNCH_STEPS.map((s) => (
                <li key={s.n} className="rounded-[14px] bg-white px-3 py-4 text-center">
                  <p className="font-fraunces text-xl text-[#e0b400]">{s.n}</p>
                  <p className="mt-1 text-xs text-[#404653]">{s.label}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section id="inscription" className="scroll-mt-16 bg-[#fefcee]">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col items-center gap-10 px-5 pb-20 pt-4 sm:px-8 sm:pb-24">
        <div className="max-w-4xl text-center">
          <h2 className={h2}>
            Vous êtes intéressé(e)&nbsp;? <Underlined>Dites-le nous.</Underlined>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#404653]">
            Dites-nous ce que vous cherchez ou présentez ce que vous proposez — rejoignez la
            plateforme et nous vous recontacterons.
          </p>
        </div>
        <MarrakechForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#16181f] text-white">
      <div
        className={`${container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16`}
      >
        <div>
          <FooterLogo />
          <p className="mt-5 max-w-60 text-sm leading-relaxed text-white/75">
            Plateforme marocaine de mise en relation entre entreprises et prestataires vérifiés.
          </p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
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
          <p>© 2026 Page.ma · Tous droits réservés</p>
          <div className="flex gap-6">
            <span>Mentions légales</span>
            <span>Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Pagema = () => (
  <div id="top" className="min-h-screen bg-white text-[#16181f]">
    <Header />
    <main>
      <Hero />
      <PartnersStrip />
      <Categories />
      <HowItWorks />
      <Ecosystem />
      <Advantages />
      <Launch />
      <Signup />
    </main>
    <Footer />
  </div>
);

export default Pagema;
