import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/pagema-logo.png.asset.json";
import heroAsset from "@/assets/pagema-services-hero-2.png.asset.json";
import stampAsset from "@/assets/pagema-app-icon.png.asset.json";
import coverageAsset from "@/assets/pagema-morocco-map.png.asset.json";

const LOGO_URL = logoAsset.url;
const HERO_URL = heroAsset.url;
const STAMP_URL = stampAsset.url;
const COVERAGE_URL = coverageAsset.url;

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
  return (
    <div className="min-h-screen bg-paper text-ink font-sans paper-noise">
      <Nav />

      <Hero />

      <HowItWorks />

      <section id="section-client" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div className="drop [animation-delay:80ms]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra-deep mb-4">
                [ a ] — Vous avez un besoin
              </p>
              <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
                Décrivez votre
                <br />
                objectif concret.
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
                Un agent de sécurité de nuit, un nettoyage après chantier, une
                intérimaire qualifiée… Dites ce qu'il vous faut, on trouve les
                bons pros.
              </p>

              <ul className="mt-8 space-y-4 max-w-prose">

                <Benefit>
                  Jusqu'à 3 devis de professionnels vérifiés et comparables.
                </Benefit>
                <Benefit>
                  Validation humaine par téléphone avant chaque mise en
                  relation.
                </Benefit>
                <Benefit>
                  Pas de boîte noire : vous savez pourquoi chaque pro est
                  sélectionné.
                </Benefit>
                <Benefit>
                  Gratuit, sans compte, zéro spam.
                </Benefit>
              </ul>
            </div>

            <PreregistrationForm profile="client" />
          </div>
        </div>
      </section>

      <section id="section-prestataire" className="scroll-mt-24 border-y-2 border-ink bg-paper-deep">
        <div className="max-w-6xl mx-auto px-5 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <PreregistrationForm profile="prestataire" />

            <div className="drop [animation-delay:80ms]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra-deep mb-4">
                [ b ] — Vous proposez des services
              </p>
              <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
                Rejoignez le
                <br />
                réseau vérifié.
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
                Inscrivez votre société pour recevoir des demandes qualifiées
                dans votre métier et votre ville.
              </p>

              <ul className="mt-8 space-y-4 max-w-prose">

                <Benefit>
                  Accès anticipé : vous faites partie des premiers prestataires
                  et vous façonnez le produit.
                </Benefit>
                <Benefit>
                  Demandes pré-qualifiées par un appel humain.
                </Benefit>
                <Benefit>
                  Processus transparent : pas de commission cachée, pas de
                  boîte noire.
                </Benefit>
                <Benefit>
                  Santé réservée aux groupes, cliniques et centres — ni
                  médecins indépendants, ni établissements publics.
                </Benefit>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AiFeatures />

      <Coverage />

      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={LOGO_URL}
            alt="Page.ma"
            className="h-9 sm:h-10 w-auto"
          />
          <span className="hidden sm:inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] border border-ink px-2 py-1 rotate-[-2deg]">
            Pré-lancement
          </span>

        </div>
        <div className="flex items-center gap-2">
          <a
            href="#section-client"
            className="inline-flex items-center font-mono text-[10px] sm:text-xs leading-none uppercase tracking-wide border-2 border-ink px-3 sm:px-4 py-2 lift"
          >
            Je cherche
          </a>
          <a
            href="#section-prestataire"
            className="inline-flex items-center font-mono text-[10px] sm:text-xs leading-none uppercase tracking-wide border-2 border-ink px-3 sm:px-4 py-2 lift bg-terra text-paper"
          >
            Je suis pro
          </a>

        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative isolate overflow-hidden border-b-2 border-ink">
      <img
        src={HERO_URL}
        alt="Professionnels marocains de la sécurité, du nettoyage et des services"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-5 py-20 lg:py-28 text-center text-paper">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper drop mb-6">

          Le réseau de pros vérifiés — 25 villes du Maroc
        </p>
        <h1 className="font-display leading-[0.92] tracking-tight text-[clamp(3rem,9vw,6.5rem)] drop [animation-delay:80ms]">
          Dites ce qu'il
          <br />
          vous faut. On
          <br />
          prévient <span className="text-terra">3 pros</span>.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-paper text-pretty drop [animation-delay:160ms]">
          Vous décrivez votre besoin, Page.ma le qualifie par téléphone, et vous
          recevez jusqu'à trois devis de professionnels sélectionnés. Gratuit,
          sans compte, sans spam.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 drop [animation-delay:220ms]">
          <a
            href="#section-client"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-terra text-paper border-2 border-paper font-display text-xl leading-none tracking-tight px-8 py-4 lift"
          >
            Je cherche un prestataire
          </a>
          <a
            href="#section-prestataire"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-paper text-ink border-2 border-paper font-display text-xl leading-none tracking-tight px-8 py-4 lift hover:bg-paper-deep"
          >
            Je propose mes services
          </a>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-paper drop [animation-delay:260ms]">
          Sans engagement · Aucun compte requis · Zéro spam
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5 drop [animation-delay:300ms]">

          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="inline-flex items-center font-mono text-[11px] leading-none uppercase tracking-wide border-2 border-paper bg-ink/45 px-3 py-1.5"
            >
              {c}
            </span>
          ))}

        </div>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section
      id="section-processus"
      className="scroll-mt-24 border-y-2 border-ink bg-ink text-paper"
    >
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra mb-10">
          [ c ] — Comment ça marche
        </p>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {[
            {
              n: "01",
              t: "Décrivez le besoin",
              b: "Quelques lignes suffisent. En 2 minutes.",
            },
            {
              n: "02",
              t: "Page.ma qualifie",
              b: "Un appel humain pour vérifier le besoin et le bon pro.",
            },
            {
              n: "03",
              t: "Recevez les devis",
              b: "Jusqu'à 3 devis comparables. Pas de boîte noire.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="lift-card lift-card-invert flex h-full flex-col border-2 border-paper/25 p-6"
            >
              <span className="font-display text-5xl leading-none text-terra">
                {s.n}
              </span>
              <h3 className="font-sans font-semibold text-xl mt-4">{s.t}</h3>
              <p className="text-sm leading-relaxed text-paper/70 mt-2">
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

const AI_FEATURES = [
  {
    n: "01",
    title: "Demande en langage naturel",
    body: "« 2 agents de sécurité de nuit à Casablanca, budget 12 000 DH, avant le 30 » — l'IA structure la demande à votre place.",
  },
  {
    n: "02",
    title: "Score de correspondance expliqué",
    body: "Chaque pro proposé reçoit une note sur 100, avec les raisons affichées : métier, ville, taille d'équipe, disponibilité.",
  },
  {
    n: "03",
    title: "Validation humaine obligatoire",
    body: "Aucune mise en relation n'est envoyée sans votre accord. L'IA prépare, vous décidez.",
  },
  {
    n: "04",
    title: "Indice de confiance transparent",
    body: "Vérification des documents, historique des missions, avis vérifiés — jamais de boîte noire.",
  },
  {
    n: "05",
    title: "Veille de marché continue",
    body: "Pour les prestataires : alertes automatiques dès qu'une demande correspond à votre métier et votre ville.",
  },
  {
    n: "06",
    title: "Bouton d'arrêt de l'IA",
    body: "Un seul clic met en pause toute action automatique sur votre dossier.",
  },
];

function AiFeatures() {
  return (
    <section id="section-ia" className="scroll-mt-24 max-w-6xl mx-auto px-5 py-20 lg:py-28">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra mb-4">
            [ e ] — Bientôt : l'IA au service de la mise en relation
          </p>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
            Ce qui arrive
            <br />
            après l'ouverture.
          </h2>
        </div>
        <span className="inline-flex items-center font-mono text-[10px] leading-none uppercase tracking-[0.18em] border-2 border-ink px-2.5 py-1.5 rotate-[-2deg] bg-terra text-paper">
          En préparation
        </span>
      </div>

      <p className="max-w-prose text-lg leading-relaxed text-ink-soft text-pretty mb-12">
        Le cœur reste humain : un appel pour qualifier, jusqu'à 3 devis
        comparables. L'IA accélère la recherche, elle ne décide jamais à votre
        place.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {AI_FEATURES.map((f) => (
          <div
            key={f.n}
            className="lift-card flex h-full flex-col border-2 border-ink bg-paper-deep p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-4xl leading-none text-terra">
                {f.n}
              </span>
              <span className="inline-flex items-center font-mono text-[9px] leading-none uppercase tracking-wide border border-ink px-2 py-1">
                À venir
              </span>
            </div>
            <h3 className="font-sans font-semibold text-xl mt-4 text-pretty">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft mt-2 text-pretty">
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href="#section-client"
          className="inline-flex items-center justify-center w-full sm:w-auto text-center bg-terra text-paper border-2 border-ink font-display text-xl leading-none tracking-tight px-8 py-4 lift"
        >
          Accès anticipé — je cherche un pro
        </a>
        <a
          href="#section-prestataire"
          className="inline-flex items-center justify-center w-full sm:w-auto text-center bg-paper text-ink border-2 border-ink font-display text-xl leading-none tracking-tight px-8 py-4 lift hover:bg-paper-deep"
        >
          Accès anticipé — je suis pro
        </a>
      </div>

    </section>
  );
}

function Coverage() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20 lg:py-28" aria-labelledby="coverage-title">
      <div className="flex flex-col overflow-hidden border-[3px] border-ink bg-paper shadow-[10px_10px_0_var(--ink)] lg:flex-row">
        <div className="flex flex-col border-b-[3px] border-ink lg:w-[38%] lg:border-r-[3px] lg:border-b-0">
          <div className="border-b-[3px] border-ink bg-terra p-7 sm:p-9">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper">
              [ d ] — Couverture nationale
            </p>
            <h2 id="coverage-title" className="font-display text-7xl leading-[0.82] text-paper sm:text-8xl">
              25
              <br />
              villes
            </h2>
            <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper">
              Un réseau de proximité au Maroc
            </p>
          </div>

          <div className="group relative min-h-80 flex-1 overflow-hidden bg-ink sm:min-h-96">
            <img
              src={COVERAGE_URL}
              alt="Carte politique et routière du Maroc, de Tanger à Lagouira"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              loading="lazy"
            />
            <div className="absolute right-5 bottom-5 left-5 rotate-[-1deg] border-2 border-ink bg-paper/90 p-4 shadow-[5px_5px_0_var(--terra)] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
              <p className="font-sans text-base font-bold leading-tight uppercase">
                Des professionnels vérifiés, au plus près de votre besoin.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="border-b-[3px] border-ink p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <h3 className="font-display text-4xl leading-none sm:text-5xl">
                Partout où
                <br />
                vous êtes.
              </h3>
              <span className="inline-flex items-center border border-terra px-2.5 py-1.5 font-mono text-[9px] font-bold leading-none uppercase tracking-[0.16em] text-terra-deep">
                Maroc · 25 points
              </span>
            </div>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">
              De Tanger à Dakhla, Page.ma vous met en relation avec des prestataires qualifiés dans les principaux pôles du Royaume.
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
              Qualification téléphonique · Jusqu'à 3 professionnels vérifiés
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Sécurité", href: "#section-client" },
      { label: "Nettoyage", href: "#section-client" },
      { label: "Intérim", href: "#section-client" },
      { label: "Assurance", href: "#section-client" },
      { label: "Immobilier", href: "#section-client" },
    ],
  },
  {
    title: "Villes",
    links: [
      { label: "Casablanca", href: "#coverage-title" },
      { label: "Rabat", href: "#coverage-title" },
      { label: "Marrakech", href: "#coverage-title" },
      { label: "Tanger", href: "#coverage-title" },
      { label: "Agadir", href: "#coverage-title" },
    ],
  },
  {
    title: "Plateforme",
    links: [
      { label: "Comment ça marche", href: "#section-processus" },
      { label: "Devenir partenaire", href: "#section-prestataire" },
      { label: "Préinscription", href: "#section-client" },
      { label: "Bientôt : l'IA", href: "#section-ia" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t-2 border-ink zellige">
      <div className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="lg:pr-8">
            <img src={LOGO_URL} alt="Page.ma" className="h-9 w-auto" />
            <p className="mt-6 max-w-prose font-semibold leading-relaxed text-ink-soft text-pretty">
              Plateforme marocaine de mise en relation entre entreprises et
              prestataires vérifiés.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-terra">
                {column.title}
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
            © 2026 Page.ma · Casablanca · Aucun compte requis
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            Mentions légales · Confidentialité
          </span>
        </div>
      </div>
    </footer>
  );
}

function Benefit({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-ink">
      <span className="mt-1 shrink-0 font-mono text-sm leading-none text-terra">✓</span>
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("preregistrations").insert({
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
    });

    setStatus(error ? "error" : "done");
  }

  return (
    <div className="drop [animation-delay:120ms]">
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
