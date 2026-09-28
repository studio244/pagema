import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { DICTS } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import { getProLaunchStats, type ProLaunchStats } from "@/lib/pro.functions";
import { trackPro, type HeroVariant } from "@/lib/pro-tracking";
import { CATEGORIES, COVERAGE_CITIES } from "@/lib/catalog";
import { normalizeMoroccanPhone } from "@/lib/phone";
import { BrandMark, Eyebrow, Reveal } from "@/components/brand";
import logoAsset from "@/assets/pagema-logo.png";
import whatsappLead from "@/assets/whatsapp-opportunity.png";
import heroBackground from "@/assets/pagema-services-hero-2.png";

/* Campaign settings — adjust here. */
const DEFAULT_CITY = "Marrakech";
/** Free first month for the first N providers per activity (same rule as the homepage offer). */
const PLACES_PER_ACTIVITY = 5;
/** Only show "X professionnels déjà préinscrits" once there are at least this many. */
const SOCIAL_PROOF_MIN = 5;
const CTA_LABEL = "Je réserve ma place gratuitement";
const REASSURANCE = ["0 MAD", "Sans carte bancaire", "Sans engagement"];

/** Two hero versions only. Meta ads point to /pro (version A) or /pro?h=b (version B). */
const HEROES: Record<HeroVariant, { title: string; highlight: string }> = {
  a: {
    title: "Trouvez de nouveaux clients à Marrakech avec Page.ma.",
    highlight: "nouveaux clients",
  },
  b: {
    title: "Soyez le pro que les clients de Marrakech trouvent en premier.",
    highlight: "en premier",
  },
};
const SUBTITLE = "Recevez des demandes correspondant à votre activité directement sur WhatsApp.";

export const Route = createFileRoute("/pro")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): { h?: "b" } =>
    search["h"] === "b" ? { h: "b" } : {},
  head: () => ({
    meta: [
      { title: "Page.ma Pro — Trouvez de nouveaux clients à Marrakech" },
      {
        name: "description",
        content:
          "Professionnels de Marrakech : recevez des demandes de clients correspondant à votre activité directement sur WhatsApp. 1 mois offert aux premiers inscrits — 0 MAD, sans carte bancaire, sans engagement.",
      },
      { property: "og:title", content: "Page.ma Pro — Trouvez de nouveaux clients à Marrakech" },
      {
        property: "og:description",
        content:
          "Recevez des demandes correspondant à votre activité directement sur WhatsApp. 1 mois offert aux premiers professionnels inscrits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProLanding,
});

function catLabel(c: string) {
  return DICTS.fr.categoryLabels[c] ?? c;
}

function remainingPlaces(stats: ProLaunchStats | null, category: string): number | null {
  if (!stats) return null;
  return Math.max(0, PLACES_PER_ACTIVITY - (stats.byCategory[category] ?? 0));
}

function placesText(remaining: number) {
  if (remaining === 0) return "Places offertes épuisées";
  return remaining === 1 ? "Plus qu'1 place offerte" : `Plus que ${remaining} places offertes`;
}

function ProLanding() {
  const { h } = Route.useSearch();
  const variant: HeroVariant = h === "b" ? "b" : "a";
  const [stats, setStats] = useState<ProLaunchStats | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const loadStats = () =>
    getProLaunchStats()
      .then(setStats)
      .catch((error: unknown) => console.warn("pro stats unavailable", error));

  useEffect(() => {
    document.documentElement.lang = "fr";
    document.documentElement.dir = "ltr";
    trackPro("visit", variant);
    void loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCta = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackPro("cta_click", variant);
    document.getElementById("inscription")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => phoneRef.current?.focus({ preventScroll: true }), 450);
  };

  return (
    <div id="top" dir="ltr" className="min-h-screen bg-paper text-ink font-sans paper-noise">
      <ProHeader onCta={onCta} />
      <ProHero variant={variant} stats={stats} onCta={onCta} />
      <ProSignup variant={variant} stats={stats} phoneRef={phoneRef} onRegistered={loadStats} />
      <ProPlaces stats={stats} onCta={onCta} />
      <ProFinalCta onCta={onCta} />
      <ProFooter />
    </div>
  );
}

type CtaHandler = (event: React.MouseEvent<HTMLAnchorElement>) => void;

function CtaButton({ onCta, className = "" }: { onCta: CtaHandler; className?: string }) {
  return (
    <a
      href="#inscription"
      onClick={onCta}
      className={`inline-flex items-center justify-center text-center bg-terra text-paper border-2 font-display leading-tight tracking-tight lift ${className}`}
    >
      {CTA_LABEL}
    </a>
  );
}

function Reassurance({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {REASSURANCE.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden="true">·</span>}
          {item}
        </li>
      ))}
    </ul>
  );
}

function OfferBadge() {
  return (
    <p className="inline-flex flex-wrap items-center gap-2 border-2 border-paper bg-terra px-3 py-2 text-paper shadow-[4px_4px_0_var(--paper)]">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
        Offre lancement
      </span>
      <span aria-hidden="true">·</span>
      <span className="font-semibold">1 mois offert aux premiers professionnels inscrits</span>
    </p>
  );
}

function ProHeader({ onCta }: { onCta: CtaHandler }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <img src={logoAsset} alt="Page.ma" className="h-9 sm:h-10 w-auto shrink-0" />
        <CtaButton onCta={onCta} className="border-ink px-3 py-2 text-sm sm:px-5 sm:text-base" />
      </div>
    </header>
  );
}

function ProHero({
  variant,
  stats,
  onCta,
}: {
  variant: HeroVariant;
  stats: ProLaunchStats | null;
  onCta: CtaHandler;
}) {
  const hero = HEROES[variant];
  const [before, after] = hero.title.split(hero.highlight);
  const showProof = stats !== null && stats.total >= SOCIAL_PROOF_MIN;

  return (
    <section className="relative isolate overflow-hidden border-b-2 border-ink bg-ink text-paper">
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden="true" />
      <BrandMark className="pointer-events-none absolute -left-16 -bottom-24 -z-10 h-[28rem] w-auto text-terra/10" />
      <div className="max-w-6xl mx-auto px-5 py-14 lg:py-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div>
          <div className="drop">
            <OfferBadge />
          </div>
          <h1 className="mt-8 font-display leading-[1.02] tracking-tight text-[clamp(2.2rem,5.4vw,4rem)] text-balance drop [animation-delay:80ms]">
            {before}
            <span className="text-terra">{hero.highlight}</span>
            {after}
          </h1>
          <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-paper/90 text-pretty drop [animation-delay:160ms]">
            {SUBTITLE}
          </p>
          <div className="mt-8 drop [animation-delay:220ms]">
            <CtaButton onCta={onCta} className="w-full sm:w-auto border-paper px-8 py-4 text-xl" />
            <Reassurance className="mt-4 text-paper/85" />
          </div>
          {showProof && (
            <p className="mt-8 inline-flex items-center gap-3 border-2 border-paper/30 px-4 py-2.5 drop [animation-delay:280ms]">
              <span className="font-display text-3xl leading-none text-terra tabular-nums">
                {stats.total}
              </span>
              <span className="font-semibold leading-snug">
                professionnels déjà préinscrits à Marrakech
              </span>
            </p>
          )}
        </div>

        <figure className="mx-auto w-full max-w-[20rem] drop [animation-delay:200ms]">
          <img
            src={whatsappLead}
            alt="Exemple de demande reçue sur WhatsApp : Piscine — entretien mensuel à Targa, Marrakech, budget indicatif 800–1 200 MAD par mois."
            width={400}
            height={636}
            className="h-auto w-full rounded-3xl"
          />
          <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-wide text-paper/70">
            Exemple de demande reçue sur WhatsApp
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const STEPS = [
  { t: "Réservez votre place", b: "30 secondes : votre WhatsApp, votre activité, votre ville." },
  {
    t: "On valide votre activité",
    b: "Un appel rapide pour confirmer votre profil avant le lancement.",
  },
  {
    t: "Recevez vos demandes",
    b: "Dès le 1er novembre, les demandes de clients arrivent sur votre WhatsApp.",
  },
];

function ProSignup({
  variant,
  stats,
  phoneRef,
  onRegistered,
}: {
  variant: HeroVariant;
  stats: ProLaunchStats | null;
  phoneRef: React.RefObject<HTMLInputElement | null>;
  onRegistered: () => void;
}) {
  return (
    <section id="inscription" className="scroll-mt-20 bg-paper-deep border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-5 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <Reveal className="lg:order-2">
          <ProForm
            variant={variant}
            stats={stats}
            phoneRef={phoneRef}
            onRegistered={onRegistered}
          />
        </Reveal>
        <Reveal delay={120} className="lg:order-1">
          <Eyebrow className="text-terra-deep mb-4">Inscription gratuite</Eyebrow>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
            Votre place en 3 étapes
          </h2>
          <ol className="mt-8 space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="font-display text-4xl leading-none text-terra tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-lg leading-tight">{s.t}</p>
                  <p className="mt-1 leading-relaxed text-ink-soft">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function ProForm({
  variant,
  stats,
  phoneRef,
  onRegistered,
}: {
  variant: HeroVariant;
  stats: ProLaunchStats | null;
  phoneRef: React.RefObject<HTMLInputElement | null>;
  onRegistered: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState(DEFAULT_CITY);
  const [phoneError, setPhoneError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const inputClass =
    "w-full bg-paper border-2 border-ink px-3 py-3 text-base placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-terra/50";
  const labelClass =
    "block font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft mb-1.5";

  // First real input (not mere focus: CTA clicks focus the phone field programmatically).
  const onStart = () => trackPro("form_start", variant);
  const remaining = category && city === DEFAULT_CITY ? remainingPlaces(stats, category) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeMoroccanPhone(phone);
    if (!normalized) {
      setPhoneError(true);
      phoneRef.current?.focus();
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("preregistrations").insert({
      full_name: "",
      email: "",
      phone: normalized,
      city,
      category,
      profile: "prestataire",
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    trackPro("form_submit", variant, { category, city });
    setStatus("done");
    onRegistered();

    // The registration is saved; a failed notification email must not block the provider.
    sendPreregistrationEmail({
      data: {
        profile: "prestataire",
        fullName: "",
        phone: normalized,
        email: "",
        city,
        category,
        source: `Landing /pro — hero ${variant.toUpperCase()}`,
      },
    }).catch((emailError: unknown) => console.error(emailError));
  }

  return (
    <div className="relative border-2 border-ink bg-paper p-6 sm:p-8 shadow-cut">
      {status === "done" ? (
        <div className="py-6 text-center" role="status">
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-terra-deep">
            Place réservée ✓
          </span>
          <p className="mt-3 font-display text-3xl leading-tight tracking-tight">
            Bienvenue sur Page.ma.
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Votre mois offert est réservé. On vous contacte sur WhatsApp pour valider votre activité
            avant le lancement du 1er novembre.
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit} onChange={onStart}>
          <div>
            <p className="font-display text-2xl leading-tight tracking-tight">
              Réservez votre mois offert
            </p>
            <Reassurance className="mt-2 text-terra-deep" />
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-phone">
              Téléphone WhatsApp
            </label>
            <input
              id="pro-phone"
              ref={phoneRef}
              className={inputClass}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              required
              value={phone}
              aria-invalid={phoneError}
              aria-describedby={phoneError ? "pro-phone-error" : undefined}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(false);
              }}
            />
            {phoneError && (
              <p id="pro-phone-error" className="mt-1.5 text-sm font-semibold text-terra-deep">
                Entrez un numéro marocain valide, par ex. 06 12 34 56 78.
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-category">
              Votre activité
            </label>
            <select
              id="pro-category"
              className={inputClass}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Choisissez votre activité
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {catLabel(c)}
                </option>
              ))}
            </select>
            {remaining !== null && (
              <p className="mt-1.5 text-sm font-semibold text-terra-deep">
                {remaining === 0
                  ? `Places offertes épuisées en ${catLabel(category).toLowerCase()} — l'inscription reste gratuite.`
                  : `${placesText(remaining)} en ${catLabel(category).toLowerCase()} à Marrakech.`}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-city">
              Ville
            </label>
            <select
              id="pro-city"
              className={inputClass}
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {COVERAGE_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-terra text-paper border-2 border-ink px-6 py-4 font-display text-xl leading-tight tracking-tight lift disabled:opacity-60"
          >
            {status === "sending" ? "Envoi…" : CTA_LABEL}
          </button>

          {status === "error" && (
            <p className="text-sm font-semibold text-terra-deep" role="alert">
              L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function ProPlaces({ stats, onCta }: { stats: ProLaunchStats | null; onCta: CtaHandler }) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16 lg:py-24">
      <Reveal>
        <Eyebrow className="text-terra mb-4">Offre lancement · Marrakech</Eyebrow>
        <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)] text-balance">
          Un mois offert, activité par activité
        </h2>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
          Les {PLACES_PER_ACTIVITY} premiers professionnels inscrits dans chaque activité à
          Marrakech bénéficient du premier mois offert.
        </p>
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => {
          const remaining = remainingPlaces(stats, c);
          const full = remaining === 0;
          return (
            <li key={c}>
              <Reveal delay={(i % 4) * 60} className="h-full">
                <div
                  className={`h-full border-2 border-ink p-5 ${full ? "bg-paper opacity-60" : "bg-paper-deep lift-card"}`}
                >
                  <BrandMark className="h-5 w-auto text-terra" />
                  <p className="mt-3 font-semibold text-lg leading-tight">{catLabel(c)}</p>
                  <p
                    className={`mt-2 text-sm font-semibold ${full ? "text-ink-soft" : "text-terra-deep"}`}
                  >
                    {remaining === null ? "Places offertes limitées" : placesText(remaining)}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 text-center">
        <CtaButton onCta={onCta} className="w-full sm:w-auto border-ink px-8 py-4 text-xl" />
      </div>
    </section>
  );
}

function ProFinalCta({ onCta }: { onCta: CtaHandler }) {
  return (
    <section className="border-y-2 border-ink bg-ink text-paper">
      <div className="max-w-4xl mx-auto px-5 py-16 lg:py-20 text-center">
        <OfferBadge />
        <h2 className="mt-8 font-display leading-[1.02] tracking-tight text-[clamp(2rem,5vw,3.4rem)] text-balance">
          Vos prochains clients à Marrakech vous écrivent sur WhatsApp.
        </h2>
        <div className="mt-8 flex flex-col items-center">
          <CtaButton onCta={onCta} className="w-full sm:w-auto border-paper px-8 py-4 text-xl" />
          <Reassurance className="mt-4 justify-center text-paper/85" />
        </div>
      </div>
    </section>
  );
}

function ProFooter() {
  return (
    <footer className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-soft">
      <img src={logoAsset} alt="Page.ma" className="h-8 w-auto" />
      <p>© {new Date().getFullYear()} Page.ma · Lancement officiel le 1er novembre 2026</p>
    </footer>
  );
}
