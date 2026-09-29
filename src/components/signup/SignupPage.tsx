import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { DICTS, type Lang } from "@/lib/i18n";
import { getProLaunchStats, type ProLaunchStats } from "@/lib/pro.functions";
import { BrandMark, Eyebrow } from "@/components/brand";
import { PRO_COPY } from "@/components/pro/copy";
import { ProForm } from "@/components/pro/ProForm";
import type { Labels } from "@/components/pro/places";
import { SIGNUP_COPY } from "./copy";
import logoAsset from "@/assets/pagema-logo.png";
import teamPhoto from "@/assets/pagema-pros-equipe.jpg";

/** Only show "X professionnels déjà préinscrits" once there are at least this many. */
const SOCIAL_PROOF_MIN = 5;

/** Form-only provider sign-up page: /inscription and /ar/inscription. */
export default function SignupPage({ lang }: { lang: Lang }) {
  const copy = SIGNUP_COPY[lang];
  const dict = DICTS[lang];
  const labels: Labels = {
    copy: PRO_COPY[lang],
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
    void loadStats();
  }, []);

  const showProof = stats !== null && stats.total >= SOCIAL_PROOF_MIN;
  const switchHref = lang === "ar" ? "/inscription" : "/ar/inscription";

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-dvh bg-paper text-ink font-sans lg:grid lg:grid-cols-[1.05fr_1fr]"
    >
      {/* Photo panel: top of the page on mobile, left half on desktop (right half in Arabic). */}
      <section className="relative isolate flex min-h-[36rem] flex-col justify-between overflow-hidden bg-ink text-paper lg:sticky lg:top-0 lg:h-dvh lg:min-h-0">
        <img
          src={teamPhoto}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/10"
        />
        <BrandMark className="pointer-events-none absolute -end-20 -bottom-24 -z-10 h-[26rem] w-auto text-terra/15" />

        <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-8 sm:pt-8 lg:px-12">
          <a
            href="/"
            className="border-2 border-ink bg-paper px-3 py-2 shadow-[4px_4px_0_var(--terra)]"
          >
            <img src={logoAsset} alt="Page.ma" className="h-7 w-auto sm:h-8" dir="ltr" />
          </a>
          <a
            href={switchHref}
            hrefLang={lang === "ar" ? "fr" : "ar"}
            lang={lang === "ar" ? "fr" : "ar"}
            className="border-2 border-paper/60 bg-ink/40 px-3 py-1.5 text-sm font-semibold backdrop-blur transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            {copy.switchLabel}
          </a>
        </div>

        <div className="px-5 pb-10 pt-44 sm:px-8 sm:pt-56 lg:px-12 lg:pb-12">
          <p className="drop inline-flex items-center gap-2 bg-terra px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper">
            <span className="h-1.5 w-1.5 rounded-full bg-paper" aria-hidden="true" />
            {copy.launch}
          </p>
          <h1 className="drop mt-5 max-w-xl font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02] tracking-tight text-balance [animation-delay:80ms]">
            {copy.title} <span className="text-terra">{copy.highlight}</span>
          </h1>
          <ul className="drop mt-7 space-y-3 [animation-delay:160ms]">
            {copy.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base leading-snug sm:text-lg">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center bg-terra text-paper">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-paper/90">{point}</span>
              </li>
            ))}
          </ul>
          {showProof && (
            <p className="drop mt-8 inline-flex items-center gap-3 border-2 border-paper/30 px-4 py-2.5 [animation-delay:220ms]">
              <span className="font-display text-3xl leading-none text-terra tabular-nums">
                {stats.total}
              </span>
              <span className="font-semibold leading-snug">{copy.proof}</span>
            </p>
          )}
        </div>
      </section>

      {/* Form panel */}
      <main className="paper-noise flex flex-col bg-paper-deep lg:min-h-dvh">
        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8 lg:py-16">
          <div className="w-full max-w-md">
            <Eyebrow className="mb-4 text-terra-deep">{copy.eyebrow}</Eyebrow>
            <ProForm
              lang={lang}
              stats={stats}
              labels={labels}
              phoneRef={phoneRef}
              source={`Page ${lang === "ar" ? "/ar/inscription" : "/inscription"}`}
              onSubmitted={({ category }) => {
                window.fbq?.("track", "Lead", { content_category: category });
                void loadStats();
              }}
            />
            <p className="mt-5 text-center text-sm leading-relaxed text-ink-soft">
              {copy.formNote}
            </p>
          </div>
        </div>
        <footer className="border-t-2 border-ink/10 px-5 py-5 text-center text-xs text-ink-soft sm:px-8">
          © {new Date().getFullYear()} Page.ma
        </footer>
      </main>
    </div>
  );
}
