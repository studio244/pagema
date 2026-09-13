import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = [
  "Sécurité",
  "Nettoyage",
  "Intérim",
  "Assurance",
  "Santé",
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
      {/* NAV */}
      <nav className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl leading-none tracking-tight">
              PAGE<span className="text-terra">.MA</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] border border-ink px-2 py-0.5 rotate-[-2deg]">
              Pré-lancement
            </span>
          </div>
          <a
            href="#form"
            className="font-mono text-xs uppercase tracking-wide border-2 border-ink px-3 py-1.5 lift bg-terra text-paper"
          >
            Rejoindre la liste
          </a>
        </div>
      </nav>

      {/* HERO + FORM */}
      <header className="max-w-6xl mx-auto px-5 pt-10 pb-14 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra-deep drop mb-4">
            [ a ] — Le réseau de pros vérifiés
          </p>
          <h1 className="font-display leading-[0.92] tracking-tight text-[clamp(3rem,8vw,6rem)] drop [animation-delay:80ms]">
            Dites ce qu'il
            <br />
            vous faut. On
            <br />
            prévient <span className="text-terra">3 pros</span>.
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-ink-soft text-pretty drop [animation-delay:160ms]">
            Vous décrivez votre besoin, Page.ma le qualifie par téléphone, et
            vous recevez jusqu'à trois devis de professionnels sélectionnés.
            Gratuit, sans compte, sans spam.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 drop [animation-delay:220ms]">
            {CATEGORIES.map((c) => (
              <span
                key={c}
                className="font-mono text-[11px] uppercase tracking-wide border-2 border-ink px-3 py-1"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <PreregistrationForm />
      </header>

      {/* HOW IT WORKS */}
      <section className="border-y-2 border-ink bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra mb-8">
            [ b ] — Comment ça marche
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
                Un appel pour vérifier que le pro est le bon.
              </p>
            </div>
            <div className="lift border-2 border-paper/25 p-5">
              <span className="font-display text-5xl text-terra">03</span>
              <h3 className="font-sans font-semibold text-lg mt-2">
                Recevez les devis
              </h3>
              <p className="text-sm text-paper/70 mt-1">
                Jusqu'à 3 devis de pros vérifiés. Point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terra">
            [ c ] — Où on arrive
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

      {/* FOOTER */}
      <footer className="border-t-2 border-ink zellige">
        <div className="max-w-6xl mx-auto px-5 py-8 flex items-center justify-between flex-wrap gap-3">
          <span className="font-display text-xl tracking-tight">
            PAGE<span className="text-terra">.MA</span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            © 2026 · Casablanca · Aucun compte requis
          </span>
        </div>
      </footer>
    </div>
  );
}

type Profile = "client" | "prestataire";

function PreregistrationForm() {
  const [profile, setProfile] = useState<Profile>("client");
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

  const isHealth = category === "Santé";

  function switchProfile(next: Profile) {
    setProfile(next);
    setStatus("idle");
  }

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
      company_name: companyName.trim() || null,
      team_size: profile === "prestataire" ? teamSize : null,
      need_details: needDetails.trim() || null,
      health_entity_type: isHealth ? healthEntity : null,
    });
    setStatus(error ? "error" : "done");
  }

  return (
    <div id="form" className="lg:col-span-5">
      <div className="relative border-2 border-ink bg-paper-deep p-5 shadow-cut drop [animation-delay:120ms]">
        <span className="absolute -top-3 -right-3 w-14 h-14 bg-terra border-2 border-ink grid place-items-center stamp">
          <span className="font-mono text-[9px] leading-tight text-paper text-center uppercase tracking-wide">
            Page
            <br />
            .ma
          </span>
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
            Pré-inscription · gratuit
          </p>
        </div>

        {status === "done" ? (
          <div className="border-2 border-ink bg-paper px-4 py-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-wide text-terra-deep font-medium">
              Reçu ✓
            </span>
            <p className="mt-2 font-display text-2xl tracking-tight">
              Bienvenue sur la liste.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              On vous appelle dès l'ouverture dans votre ville.
            </p>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-2 border-2 border-ink mb-4 text-center font-mono text-[11px] uppercase tracking-wide"
              role="tablist"
              aria-label="Profil"
            >
              <button
                type="button"
                onClick={() => switchProfile("client")}
                aria-selected={profile === "client"}
                className={`py-2 transition-colors ${profile === "client" ? "bg-ink text-paper" : "hover:bg-paper/60"}`}
              >
                Je cherche un service
              </button>
              <button
                type="button"
                onClick={() => switchProfile("prestataire")}
                aria-selected={profile === "prestataire"}
                className={`py-2 transition-colors border-l-2 border-ink ${profile === "prestataire" ? "bg-ink text-paper" : "hover:bg-paper/60"}`}
              >
                Je suis prestataire
              </button>
            </div>

            <p className="font-mono text-[10px] leading-relaxed uppercase tracking-[0.12em] text-ink-soft mb-3">
              {profile === "client"
                ? "Formulaire client — décrivez votre besoin"
                : "Formulaire prestataire — présentez votre société"}
            </p>


            <form
              key={profile}
              className="space-y-3"
              onSubmit={handleSubmit}
            >
              {profile === "prestataire" && (
                <div>
                  <label className={labelClass} htmlFor="company">
                    Raison sociale
                  </label>
                  <input
                    id="company"
                    className={inputClass}
                    placeholder="Nom de la société"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className={labelClass} htmlFor="name">
                  {profile === "client" ? "Votre nom" : "Personne de contact"}
                </label>
                <input
                  id="name"
                  className={inputClass}
                  placeholder="Prénom & nom"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    className={inputClass}
                    placeholder="06…"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className={inputClass}
                    placeholder={
                      profile === "client" ? "vous@email.ma" : "contact@societe.ma"
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
                  <label className={labelClass} htmlFor="city">
                    Ville
                  </label>
                  <input
                    id="city"
                    className={inputClass}
                    placeholder="Casablanca"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="category">
                    {profile === "client" ? "Service cherché" : "Votre métier"}
                  </label>
                  <select
                    id="category"
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
                  <label className={labelClass} htmlFor="health">
                    Type d'établissement de santé
                  </label>
                  <select
                    id="health"
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
                  <label className={labelClass} htmlFor="team">
                    Taille de l'équipe
                  </label>
                  <select
                    id="team"
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
                  <label className={labelClass} htmlFor="need">
                    Votre besoin (optionnel)
                  </label>
                  <textarea
                    id="need"
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
          </>
        )}
      </div>
    </div>
  );
}
