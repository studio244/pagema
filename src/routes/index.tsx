import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/pagema-logo.png.asset.json";
import heroAsset from "@/assets/pagema-services-hero.png.asset.json";
import stampAsset from "@/assets/pagema-app-icon.png.asset.json";

const LOGO_URL = logoAsset.url;
const HERO_URL = heroAsset.url;
const STAMP_URL = stampAsset.url;

const CATEGORIES = [
  "Sécurité",
  "Nettoyage",
  "Intérim",
  "Assurance",
  "Santé",
  "Impression",
  "Publicité",
];

const HEALTH_ENTITIES = [
  "Groupe de santé",
  "Clinique",
  "Centre de soins / diagnostic",
];

const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];

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

      <section id="section-client" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="drop [animation-delay:80ms]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra-deep mb-4">
                [ a ] — Vous avez un besoin
              </p>
              <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
                Décrivez votre
                <br />
                objectif concret.
              </h2>
              <p className="mt-4 max-w-[42ch] text-lg text-ink-soft text-pretty">
                Un agent de sécurité de nuit, un nettoyage après chantier, une
                intérimaire qualifiée… Dites ce qu'il vous faut, on trouve les
                bons pros.
              </p>

              <ul className="mt-6 space-y-3">
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

      <section id="section-prestataire" className="scroll-mt-20 border-y-2 border-ink bg-paper-deep">
        <div className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="drop [animation-delay:80ms]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra-deep mb-4">
                [ b ] — Vous proposez des services
              </p>
              <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,4.2rem)]">
                Rejoignez le
                <br />
                réseau vérifié.
              </h2>
              <p className="mt-4 max-w-[42ch] text-lg text-ink-soft text-pretty">
                Inscrivez votre société pour recevoir des demandes qualifiées
                dans votre métier et votre ville.
              </p>

              <ul className="mt-6 space-y-3">
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

            <PreregistrationForm profile="prestataire" />
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
        <div className="flex items-baseline gap-3">
          <img
            src={LOGO_URL}
            alt="Page.ma"
            className="h-9 sm:h-10 w-auto"
          />
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] border border-ink px-2 py-0.5 rotate-[-2deg]">
            Pré-lancement
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#section-client"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-wide border-2 border-ink px-2.5 sm:px-3 py-1.5 lift"
          >
            Je cherche
          </a>
          <a
            href="#section-prestataire"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-wide border-2 border-ink px-2.5 sm:px-3 py-1.5 lift bg-terra text-paper"
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
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[calc(66%_-_40px)_center] sm:object-[calc(60%_-_40px)_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-5 py-12 lg:py-14 text-center text-paper">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper drop mb-4">
          Le réseau de pros vérifiés — 25 villes du Maroc
        </p>
        <h1 className="font-display leading-[0.92] tracking-tight text-[clamp(3rem,9vw,6.5rem)] drop [animation-delay:80ms]">
          Dites ce qu'il
          <br />
          vous faut. On
          <br />
          prévient <span className="text-terra">3 pros</span>.
        </h1>
        <p className="mt-5 max-w-[56ch] mx-auto text-lg text-paper text-pretty drop [animation-delay:160ms]">
          Vous décrivez votre besoin, Page.ma le qualifie par téléphone, et vous
          recevez jusqu'à trois devis de professionnels sélectionnés. Gratuit,
          sans compte, sans spam.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 drop [animation-delay:220ms]">
          <a
            href="#section-client"
            className="w-full sm:w-auto bg-terra text-paper border-2 border-paper font-display text-xl tracking-tight px-8 py-3 lift"
          >
            Je cherche un prestataire
          </a>
          <a
            href="#section-prestataire"
            className="w-full sm:w-auto bg-paper text-ink border-2 border-paper font-display text-xl tracking-tight px-8 py-3 lift hover:bg-paper-deep"
          >
            Je propose mes services
          </a>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-paper drop [animation-delay:260ms]">
          Sans engagement · Aucun compte requis · Zéro spam
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2 drop [animation-delay:300ms]">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="font-mono text-[11px] uppercase tracking-wide border-2 border-paper bg-ink/45 px-3 py-1"
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
    <section className="border-y-2 border-ink bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra mb-8">
          [ c ] — Comment ça marche
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="lift border-2 border-paper/25 p-5">
            <span className="font-display text-5xl text-terra">01</span>
            <h3 className="font-sans font-semibold text-lg mt-2">
              Décrivez le besoin
            </h3>
            <p className="text-sm text-paper/70 mt-1">
              Quelques lignes suffisent. En 2 minutes.
            </p>
          </div>
          <div className="lift border-2 border-paper/25 p-5">
            <span className="font-display text-5xl text-terra">02</span>
            <h3 className="font-sans font-semibold text-lg mt-2">
              Page.ma qualifie
            </h3>
            <p className="text-sm text-paper/70 mt-1">
              Un appel humain pour vérifier le besoin et le bon pro.
            </p>
          </div>
          <div className="lift border-2 border-paper/25 p-5">
            <span className="font-display text-5xl text-terra">03</span>
            <h3 className="font-sans font-semibold text-lg mt-2">
              Recevez les devis
            </h3>
            <p className="text-sm text-paper/70 mt-1">
              Jusqu'à 3 devis comparables. Pas de boîte noire.
            </p>
          </div>
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
    <section id="section-ia" className="scroll-mt-20 max-w-6xl mx-auto px-5 py-16">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra mb-3">
            [ e ] — Bientôt : l'IA au service de la mise en relation
          </p>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
            Ce qui arrive
            <br />
            après l'ouverture.
          </h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] border-2 border-ink px-2 py-1 rotate-[-2deg] bg-terra text-paper">
          En préparation
        </span>
      </div>

      <p className="max-w-[56ch] text-lg text-ink-soft text-pretty mb-8">
        Le cœur reste humain : un appel pour qualifier, jusqu'à 3 devis
        comparables. L'IA accélère la recherche, elle ne décide jamais à votre
        place.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AI_FEATURES.map((f) => (
          <div key={f.n} className="lift border-2 border-ink bg-paper-deep p-5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-4xl text-terra">{f.n}</span>
              <span className="font-mono text-[9px] uppercase tracking-wide border border-ink px-1.5 py-0.5">
                À venir
              </span>
            </div>
            <h3 className="font-sans font-semibold text-lg mt-2 text-pretty">
              {f.title}
            </h3>
            <p className="text-sm text-ink-soft mt-1 text-pretty">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href="#section-client"
          className="w-full sm:w-auto text-center bg-terra text-paper border-2 border-ink font-display text-xl tracking-tight px-8 py-3 lift"
        >
          Accès anticipé — je cherche un pro
        </a>
        <a
          href="#section-prestataire"
          className="w-full sm:w-auto text-center bg-paper text-ink border-2 border-ink font-display text-xl tracking-tight px-8 py-3 lift hover:bg-paper-deep"
        >
          Accès anticipé — je suis pro
        </a>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-12">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra">
          [ d ] — Où on arrive
        </p>
        <span className="font-display text-3xl">25 villes</span>
      </div>
      <p className="font-mono text-sm leading-relaxed max-w-[60ch]">
        Casablanca · Rabat · Marrakech · Fès · Tanger · Agadir · Meknès ·
        Oujda · Kénitra · Tétouan · Salé · Essaouira · Safi · El Jadida ·
        Nador · Béni Mellal · Mohammédia · Khouribga · Laâyoune · Dakhla ·
        Settat · Chefchaouen · Ifrane · Ouarzazate · Al Hoceïma.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-ink zellige">
      <div className="max-w-6xl mx-auto px-5 py-8 flex items-center justify-between flex-wrap gap-3">
        <img src={LOGO_URL} alt="Page.ma" className="h-8 w-auto" />
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          © 2026 · Casablanca · Aucun compte requis
        </span>
      </div>
    </footer>
  );
}

function Benefit({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-ink">
      <span className="mt-0.5 text-terra font-mono text-sm">✓</span>
      <span className="text-pretty">{children}</span>
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
    });
    setStatus(error ? "error" : "done");
  }

  return (
    <div className="drop [animation-delay:120ms]">
      <div className="relative border-2 border-ink bg-paper-deep p-5 shadow-cut">
        <span className="absolute -top-3 -right-3 w-14 h-14 stamp" aria-hidden="true">
          <img
            src={STAMP_URL}
            alt=""
            className="w-full h-full object-cover rounded-lg border-2 border-ink shadow-cut"
          />
        </span>
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="text-terra w-6 h-6"
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
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft">
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
                ? "On s'occupe de trouver vos pros."
                : "Bienvenue dans le réseau."}
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {profile === "client"
                ? "On vous appelle dès l'ouverture dans votre ville pour valider votre besoin."
                : "On vous contacte pour vérifier votre société avant l'ouverture."}
            </p>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
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
                  Votre besoin (optionnel)
                </label>
                <textarea
                  id={`${idPrefix}-need`}
                  rows={3}
                  className={inputClass}
                  placeholder="Ex : 2 agents de sécurité de nuit, site à Casablanca…"
                  value={needDetails}
                  onChange={(e) => setNeedDetails(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-terra text-paper border-2 border-ink font-display text-xl tracking-tight py-3 lift disabled:opacity-60"
            >
              {status === "sending"
                ? "Envoi…"
                : profile === "client"
                  ? "Je cherche un pro"
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
