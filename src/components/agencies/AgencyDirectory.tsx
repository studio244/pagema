import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { DICTS, type Lang } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/catalog";
import { agencyPath, agencySummary, type Agency } from "@/lib/agencies";
import { whatsappUrl } from "@/lib/whatsapp";
import { Eyebrow, WhatsAppIcon } from "@/components/brand";
import { AGENCIES_COPY, type AgenciesCopy } from "./copy";
import { AgenciesLayout, AgencyBadges, AgencyLogo } from "./AgenciesLayout";
import { agencyServiceImage } from "./agency-image";
import { FrequentlyAskedQuestions } from "@/components/faq/FrequentlyAskedQuestions";

/** /services and /ar/services: every service with its agency count, then the matching agencies. */
export default function AgencyDirectory({
  lang,
  agencies,
  service,
}: {
  lang: Lang;
  agencies: Agency[];
  /** Selected service (French name), from the URL: /services?service=Nettoyage */
  service: string | undefined;
}) {
  const copy = AGENCIES_COPY[lang];
  const label = (c: string) => DICTS[lang].categoryLabels[c] ?? c;
  const listPath = lang === "ar" ? "/ar/services" : "/services";
  const shown = service ? agencies.filter((a) => a.services.includes(service)) : agencies;
  const countFor = (c: string) => agencies.filter((a) => a.services.includes(c)).length;
  const switchPath = agencyPath(lang === "ar" ? "fr" : "ar");

  return (
    <AgenciesLayout
      lang={lang}
      switchHref={service ? `${switchPath}?service=${encodeURIComponent(service)}` : switchPath}
    >
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-10 lg:pt-16">
          <Eyebrow className="mb-4 text-terra-deep">{copy.eyebrow}</Eyebrow>
          <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02] tracking-tight text-balance">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{copy.intro}</p>

          <nav aria-label={copy.filterLabel} className="mt-8">
            <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {copy.filterLabel}
            </p>
            {/* One row that scrolls sideways on phones, wraps on larger screens. */}
            <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <li className="shrink-0">
                <FilterChip to={listPath} active={!service} count={agencies.length}>
                  {copy.all}
                </FilterChip>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c} className="shrink-0">
                  <FilterChip to={listPath} service={c} active={service === c} count={countFor(c)}>
                    {label(c)}
                  </FilterChip>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:py-14" aria-live="polite">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
            {service ? copy.resultsFor(label(service)) : copy.resultsAll}
            <span className="ms-3 align-middle font-mono text-sm font-semibold text-ink-soft">
              {copy.agencies(shown.length)}
            </span>
          </h2>
          {service && (
            <Link
              to={listPath}
              search={{}}
              resetScroll={false}
              className="text-sm font-semibold text-terra-deep underline-offset-4 hover:underline"
            >
              {copy.clear}
            </Link>
          )}
        </div>

        {shown.length > 0 ? (
          <ul className="grid gap-5">
            {shown.map((agency) => (
              <li key={agency.slug}>
                <AgencyCard agency={agency} lang={lang} copy={copy} label={label} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState lang={lang} copy={copy} service={service ? label(service) : null} />
        )}
      </section>
      <FrequentlyAskedQuestions lang={lang} variant="directory" />
    </AgenciesLayout>
  );
}

function FilterChip({
  to,
  service,
  active,
  count,
  children,
}: {
  to: "/services" | "/ar/services";
  service?: string;
  active: boolean;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      search={service ? { service } : {}}
      resetScroll={false}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-2 whitespace-nowrap border-2 border-ink px-3.5 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-ink text-paper"
          : count === 0
            ? "bg-paper text-ink-soft hover:bg-paper-deep"
            : "bg-paper text-ink hover:bg-terra hover:text-paper"
      }`}
    >
      {children}
      <span
        className={`min-w-6 px-1.5 py-0.5 text-center font-mono text-[11px] tabular-nums ${
          active ? "bg-paper/15" : "bg-ink/10"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

function AgencyCard({
  agency,
  lang,
  copy,
  label,
}: {
  agency: Agency;
  lang: Lang;
  copy: AgenciesCopy;
  label: (c: string) => string;
}) {
  const summary = agencySummary(agency, lang);
  const city = agency.city ? (DICTS[lang].cityLabels[agency.city] ?? agency.city) : null;
  const image = agencyServiceImage(agency);
  return (
    <Link
      to={lang === "ar" ? "/ar/services/$slug" : "/services/$slug"}
      params={{ slug: agency.slug }}
      className="lift-card group grid h-full overflow-hidden border-2 border-ink bg-paper focus:outline-none focus-visible:ring-4 focus-visible:ring-terra/40 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="relative min-h-56 overflow-hidden border-b-2 border-ink bg-paper-deep md:min-h-[18rem] md:border-b-0 md:border-e-2">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute start-4 top-4 grid h-16 min-w-20 place-items-center border-2 border-ink bg-white/95 p-2 shadow-cut backdrop-blur-sm sm:h-[4.5rem] sm:min-w-24 sm:p-2.5">
          <AgencyLogo agency={agency} className="h-full max-h-12 w-full max-w-20" />
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-3 p-5 sm:p-7">
        <AgencyBadges agency={agency} lang={lang} />
        <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
          {agency.name}
        </h3>
        {city && (
          <p className="-mt-1 inline-flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {city}
          </p>
        )}
        {summary && <p className="max-w-2xl leading-relaxed text-ink-soft">{summary}</p>}
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {agency.services.map((s) => (
            <li key={s} className="border border-ink/25 px-2 py-0.5 text-xs font-semibold">
              {label(s)}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-terra-deep">
          {copy.viewAgency}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

function EmptyState({
  lang,
  copy,
  service,
}: {
  lang: Lang;
  copy: AgenciesCopy;
  service: string | null;
}) {
  if (!service) {
    return (
      <p className="border-2 border-dashed border-ink/30 p-8 text-center">{copy.noAgencies}</p>
    );
  }
  return (
    <div className="border-2 border-dashed border-ink/30 px-6 py-12 text-center">
      <p className="font-display text-2xl leading-tight tracking-tight">
        {copy.emptyTitle(service)}
      </p>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">{copy.emptyBody}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={lang === "ar" ? "/ar/inscription" : "/inscription"}
          className="lift border-2 border-ink bg-terra px-5 py-3 font-display leading-tight tracking-tight text-paper"
        >
          {copy.emptyPro}
        </a>
        <a
          href={whatsappUrl(lang, copy.emptyAsk(service))}
          target="_blank"
          rel="noopener noreferrer"
          className="lift inline-flex items-center gap-2 border-2 border-ink bg-[#25D366] px-5 py-3 font-display leading-tight tracking-tight text-ink"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {copy.contactPagema}
        </a>
        <Link
          to={lang === "ar" ? "/ar/services" : "/services"}
          search={{}}
          resetScroll={false}
          className="px-3 py-3 text-sm font-semibold underline underline-offset-4"
        >
          {copy.emptyAll}
        </Link>
      </div>
    </div>
  );
}
