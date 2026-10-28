import { useEffect } from "react";
import { BadgeCheck, Handshake } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type { Agency } from "@/lib/agencies";
import { AGENCIES_COPY } from "./copy";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { localPath } from "@/components/site/nav";

/** Header + footer shared by /services and /services/<slug>, in both languages. */
export function AgenciesLayout({
  lang,
  switchHref,
  children,
}: {
  lang: Lang;
  /** Same page in the other language. */
  switchHref: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="brand-v2 flex min-h-dvh flex-col bg-paper font-sans text-ink"
    >
      <SiteHeader lang={lang} switchHref={switchHref} />

      <main className="flex-1">{children}</main>

      <SiteFooter lang={lang} page="services" />
    </div>
  );
}

/** Agency logo, or its initials on a coloured square when there is no logo yet. */
export function AgencyLogo({ agency, className = "" }: { agency: Agency; className?: string }) {
  if (agency.logo_url) {
    return (
      <img
        src={agency.logo_url}
        alt={`Logo ${agency.name}`}
        loading="lazy"
        className={`object-contain ${className}`}
      />
    );
  }
  const initials = agency.name
    .split(/\s+/)
    .filter((w) => /^[\p{L}\p{N}]/u.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={`grid place-items-center bg-ink font-display text-2xl text-paper ${className}`}
    >
      {initials}
    </span>
  );
}

export function AgencyBadges({ agency, lang }: { agency: Agency; lang: Lang }) {
  const copy = AGENCIES_COPY[lang];
  if (!agency.is_partner && !agency.is_verified) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {agency.is_partner && (
        <li className="inline-flex items-center gap-1.5 bg-terra/10 px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-terra-deep">
          <Handshake className="h-3.5 w-3.5" aria-hidden="true" />
          {copy.partner}
        </li>
      )}
      {agency.is_verified && (
        <li className="inline-flex items-center gap-1.5 bg-ink/10 px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {copy.verified}
        </li>
      )}
    </ul>
  );
}

/** "Vous êtes une agence ?" band closing /services and /services/<slug>. */
export function AgencyProCta({ lang }: { lang: Lang }) {
  const copy = AGENCIES_COPY[lang];
  return (
    <section className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl leading-tight tracking-tight">{copy.proCta.title}</p>
          <p className="mt-2 max-w-xl leading-relaxed text-paper/85">{copy.proCta.body}</p>
        </div>
        <a
          href={localPath(lang, "/inscription")}
          className="lift shrink-0 border-2 border-paper bg-terra px-6 py-3 font-display leading-tight tracking-tight text-paper"
        >
          {copy.proCta.button}
        </a>
      </div>
    </section>
  );
}
