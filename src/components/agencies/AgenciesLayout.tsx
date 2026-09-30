import { useEffect } from "react";
import { BadgeCheck, Handshake } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type { Agency } from "@/lib/agencies";
import { AGENCIES_COPY } from "./copy";
import logoAsset from "@/assets/pagema-logo.png";

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
  const copy = AGENCIES_COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex min-h-dvh flex-col bg-paper font-sans text-ink paper-noise"
    >
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <a href={lang === "ar" ? "/ar" : "/"} aria-label={copy.home} className="shrink-0">
            <img src={logoAsset} alt="Page.ma" className="h-9 w-auto sm:h-10" dir="ltr" />
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={switchHref}
              hrefLang={lang === "ar" ? "fr" : "ar"}
              lang={lang === "ar" ? "fr" : "ar"}
              className="py-1 text-sm font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              {copy.switchLabel}
            </a>
            <a
              href={lang === "ar" ? "/ar/inscription" : "/inscription"}
              className="lift border-2 border-ink bg-terra px-3 py-2 font-display text-sm leading-tight tracking-tight text-paper sm:px-4"
            >
              {copy.headerCta}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t-2 border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-ink-soft sm:flex-row">
          <img src={logoAsset} alt="Page.ma" className="h-7 w-auto" dir="ltr" />
          <p>
            © {new Date().getFullYear()} Page.ma · {copy.footer}
          </p>
        </div>
      </footer>
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
