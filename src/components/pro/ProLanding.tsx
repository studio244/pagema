import { useEffect, useRef, useState } from "react";
import { DICTS, type Lang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { sendPreregistrationEmail } from "@/lib/notify.functions";
import { getProLaunchStats, type ProLaunchStats } from "@/lib/pro.functions";
import { trackPro, type HeroVariant } from "@/lib/pro-tracking";
import { CATEGORIES, COVERAGE_CITIES } from "@/lib/catalog";
import { normalizeMoroccanPhone } from "@/lib/phone";
import { BrandMark, Eyebrow, Reveal } from "@/components/brand";
import { PRO_COPY, type ProCopy } from "./copy";
import logoAsset from "@/assets/pagema-logo.png";
import whatsappLead from "@/assets/whatsapp-opportunity.png";
import heroBackground from "@/assets/pagema-services-hero-2.png";

/* Campaign settings — adjust here. */
const DEFAULT_CITY = "Marrakech";
/** Free first month for the first N providers per activity (same rule as the homepage offer). */
const PLACES_PER_ACTIVITY = 5;
/** Only show "X professionnels déjà préinscrits" once there are at least this many. */
const SOCIAL_PROOF_MIN = 5;

type CtaHandler = (event: React.MouseEvent<HTMLAnchorElement>) => void;
type Labels = { copy: ProCopy; category: (c: string) => string; city: (c: string) => string };

function remainingPlaces(stats: ProLaunchStats | null, category: string): number | null {
  if (!stats) return null;
  return Math.max(0, PLACES_PER_ACTIVITY - (stats.byCategory[category] ?? 0));
}

function placesText(copy: ProCopy, remaining: number) {
  return remaining === 0 ? copy.places.full : copy.places.left(remaining);
}

export default function ProLanding({ lang, variant }: { lang: Lang; variant: HeroVariant }) {
  const copy = PRO_COPY[lang];
  const dict = DICTS[lang];
  const labels: Labels = {
    copy,
    category: (c) => dict.categoryLabels[c] ?? c,
    city: (c) => dict.cityLabels[c] ?? c,
  };
  const [stats, setStats] = useState<ProLaunchStats | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const loadStats = () =>
    getProLaunchStats()
      .then(setStats)
      .catch((error: unknown) => console.warn("pro stats unavailable", error));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    trackPro("visit", variant);
    void loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCta: CtaHandler = (event) => {
    event.preventDefault();
    trackPro("cta_click", variant);
    document.getElementById("inscription")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => phoneRef.current?.focus({ preventScroll: true }), 450);
  };

  return (
    <div
      id="top"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-paper text-ink font-sans paper-noise"
    >
      <ProHeader lang={lang} variant={variant} copy={copy} onCta={onCta} />
      <ProHero variant={variant} stats={stats} copy={copy} onCta={onCta} />
      <ProSignup
        lang={lang}
        variant={variant}
        stats={stats}
        labels={labels}
        phoneRef={phoneRef}
        onRegistered={loadStats}
      />
      <ProPlaces stats={stats} labels={labels} onCta={onCta} />
      <ProFinalCta copy={copy} onCta={onCta} />
      <ProFooter copy={copy} />
    </div>
  );
}

function CtaButton({
  copy,
  onCta,
  className = "",
}: {
  copy: ProCopy;
  onCta: CtaHandler;
  className?: string;
}) {
  return (
    <a
      href="#inscription"
      onClick={onCta}
      className={`inline-flex items-center justify-center text-center bg-terra text-paper border-2 font-display leading-tight tracking-tight lift ${className}`}
    >
      {copy.cta}
    </a>
  );
}

function Reassurance({ copy, className = "" }: { copy: ProCopy; className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {copy.reassurance.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden="true">·</span>}
          {item}
        </li>
      ))}
    </ul>
  );
}

function OfferBadge({ copy }: { copy: ProCopy }) {
  return (
    <p className="inline-flex flex-wrap items-center gap-2 border-2 border-paper bg-terra px-3 py-2 text-paper shadow-[4px_4px_0_var(--paper)]">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
        {copy.offerTag}
      </span>
      <span aria-hidden="true">·</span>
      <span className="font-semibold">{copy.offer}</span>
    </p>
  );
}

function ProHeader({
  lang,
  variant,
  copy,
  onCta,
}: {
  lang: Lang;
  variant: HeroVariant;
  copy: ProCopy;
  onCta: CtaHandler;
}) {
  const other = lang === "ar" ? "/pro" : "/ar/pro";
  const switchHref = variant === "b" ? `${other}?h=b` : other;
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <img src={logoAsset} alt="Page.ma" className="h-9 sm:h-10 w-auto shrink-0" />
        <div className="flex items-center gap-3">
          <a
            href={switchHref}
            hrefLang={lang === "ar" ? "fr" : "ar"}
            lang={lang === "ar" ? "fr" : "ar"}
            className="py-1 text-sm font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
          >
            {copy.switchLabel}
          </a>
          <CtaButton
            copy={copy}
            onCta={onCta}
            className="border-ink px-3 py-2 text-sm sm:px-5 sm:text-base"
          />
        </div>
      </div>
    </header>
  );
}

function ProHero({
  variant,
  stats,
  copy,
  onCta,
}: {
  variant: HeroVariant;
  stats: ProLaunchStats | null;
  copy: ProCopy;
  onCta: CtaHandler;
}) {
  const hero = copy.heroes[variant];
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
      <BrandMark className="pointer-events-none absolute -start-16 -bottom-24 -z-10 h-[28rem] w-auto text-terra/10" />
      <div className="max-w-6xl mx-auto px-5 py-14 lg:py-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div>
          <div className="drop">
            <OfferBadge copy={copy} />
          </div>
          <h1 className="mt-8 font-display leading-[1.02] tracking-tight text-[clamp(2.2rem,5.4vw,4rem)] text-balance drop [animation-delay:80ms]">
            {before}
            <span className="text-terra">{hero.highlight}</span>
            {after}
          </h1>
          <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-paper/90 text-pretty drop [animation-delay:160ms]">
            {copy.subtitle}
          </p>
          <div className="mt-8 drop [animation-delay:220ms]">
            <CtaButton
              copy={copy}
              onCta={onCta}
              className="w-full sm:w-auto border-paper px-8 py-4 text-xl"
            />
            <Reassurance copy={copy} className="mt-4 text-paper/85" />
          </div>
          {showProof && (
            <p className="mt-8 inline-flex items-center gap-3 border-2 border-paper/30 px-4 py-2.5 drop [animation-delay:280ms]">
              <span className="font-display text-3xl leading-none text-terra tabular-nums">
                {stats.total}
              </span>
              <span className="font-semibold leading-snug">{copy.proof}</span>
            </p>
          )}
        </div>

        <figure className="mx-auto w-full max-w-[20rem] drop [animation-delay:200ms]">
          <img
            src={whatsappLead}
            alt={copy.leadAlt}
            width={400}
            height={636}
            className="h-auto w-full rounded-3xl"
          />
          <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-wide text-paper/70">
            {copy.leadCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function ProSignup({
  lang,
  variant,
  stats,
  labels,
  phoneRef,
  onRegistered,
}: {
  lang: Lang;
  variant: HeroVariant;
  stats: ProLaunchStats | null;
  labels: Labels;
  phoneRef: React.RefObject<HTMLInputElement | null>;
  onRegistered: () => void;
}) {
  const { copy } = labels;
  return (
    <section id="inscription" className="scroll-mt-20 bg-paper-deep border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-5 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <Reveal className="lg:order-2">
          <ProForm
            lang={lang}
            variant={variant}
            stats={stats}
            labels={labels}
            phoneRef={phoneRef}
            onRegistered={onRegistered}
          />
        </Reveal>
        <Reveal delay={120} className="lg:order-1">
          <Eyebrow className="text-terra-deep mb-4">{copy.signupEyebrow}</Eyebrow>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)]">
            {copy.signupTitle}
          </h2>
          <ol className="mt-8 space-y-6">
            {copy.steps.map((s, i) => (
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
  lang,
  variant,
  stats,
  labels,
  phoneRef,
  onRegistered,
}: {
  lang: Lang;
  variant: HeroVariant;
  stats: ProLaunchStats | null;
  labels: Labels;
  phoneRef: React.RefObject<HTMLInputElement | null>;
  onRegistered: () => void;
}) {
  const { copy } = labels;
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
  const activityName = category ? labels.category(category) : "";
  const activityInline = lang === "fr" ? activityName.toLowerCase() : activityName;

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
        source: `Landing ${lang === "ar" ? "/ar/pro" : "/pro"} — hero ${variant.toUpperCase()}`,
      },
    }).catch((emailError: unknown) => console.error(emailError));
  }

  return (
    <div className="relative border-2 border-ink bg-paper p-6 sm:p-8 shadow-cut">
      {status === "done" ? (
        <div className="py-6 text-center" role="status">
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-terra-deep">
            {copy.form.doneTag}
          </span>
          <p className="mt-3 font-display text-3xl leading-tight tracking-tight">
            {copy.form.doneTitle}
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">{copy.form.doneBody}</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit} onChange={onStart}>
          <div>
            <p className="font-display text-2xl leading-tight tracking-tight">{copy.form.title}</p>
            <Reassurance copy={copy} className="mt-2 text-terra-deep" />
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-phone">
              {copy.form.phone}
            </label>
            <input
              id="pro-phone"
              ref={phoneRef}
              className={inputClass}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder={copy.form.phonePh}
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
                {copy.form.phoneError}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-category">
              {copy.form.activity}
            </label>
            <select
              id="pro-category"
              className={inputClass}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                {copy.form.activityPh}
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {labels.category(c)}
                </option>
              ))}
            </select>
            {remaining !== null && (
              <p className="mt-1.5 text-sm font-semibold text-terra-deep">
                {remaining === 0
                  ? copy.form.placesFull(activityInline)
                  : copy.form.placesLeft(placesText(copy, remaining), activityInline)}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="pro-city">
              {copy.form.city}
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
                  {labels.city(c)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-terra text-paper border-2 border-ink px-6 py-4 font-display text-xl leading-tight tracking-tight lift disabled:opacity-60"
          >
            {status === "sending" ? copy.form.sending : copy.cta}
          </button>

          {status === "error" && (
            <p className="text-sm font-semibold text-terra-deep" role="alert">
              {copy.form.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function ProPlaces({
  stats,
  labels,
  onCta,
}: {
  stats: ProLaunchStats | null;
  labels: Labels;
  onCta: CtaHandler;
}) {
  const { copy } = labels;
  return (
    <section className="max-w-6xl mx-auto px-5 py-16 lg:py-24">
      <Reveal>
        <Eyebrow className="text-terra mb-4">{copy.places.eyebrow}</Eyebrow>
        <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)] text-balance">
          {copy.places.title}
        </h2>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
          {copy.places.body(PLACES_PER_ACTIVITY)}
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
                  <p className="mt-3 font-semibold text-lg leading-tight">{labels.category(c)}</p>
                  <p
                    className={`mt-2 text-sm font-semibold ${full ? "text-ink-soft" : "text-terra-deep"}`}
                  >
                    {remaining === null ? copy.places.unknown : placesText(copy, remaining)}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 text-center">
        <CtaButton
          copy={copy}
          onCta={onCta}
          className="w-full sm:w-auto border-ink px-8 py-4 text-xl"
        />
      </div>
    </section>
  );
}

function ProFinalCta({ copy, onCta }: { copy: ProCopy; onCta: CtaHandler }) {
  return (
    <section className="border-y-2 border-ink bg-ink text-paper">
      <div className="max-w-4xl mx-auto px-5 py-16 lg:py-20 text-center">
        <OfferBadge copy={copy} />
        <h2 className="mt-8 font-display leading-[1.02] tracking-tight text-[clamp(2rem,5vw,3.4rem)] text-balance">
          {copy.finalTitle}
        </h2>
        <div className="mt-8 flex flex-col items-center">
          <CtaButton
            copy={copy}
            onCta={onCta}
            className="w-full sm:w-auto border-paper px-8 py-4 text-xl"
          />
          <Reassurance copy={copy} className="mt-4 justify-center text-paper/85" />
        </div>
      </div>
    </section>
  );
}

function ProFooter({ copy }: { copy: ProCopy }) {
  return (
    <footer className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-soft">
      <img src={logoAsset} alt="Page.ma" className="h-8 w-auto" />
      <p>
        © {new Date().getFullYear()} Page.ma · {copy.footer}
      </p>
    </footer>
  );
}
