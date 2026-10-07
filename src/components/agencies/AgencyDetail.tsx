import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, MapPin, MessageSquareText, Phone, UsersRound } from "lucide-react";
import { DICTS, type Lang } from "@/lib/i18n";
import {
  agencyDescription,
  agencyMapQuery,
  agencyOfferings,
  agencyPath,
  agencySummary,
  mapsEmbed,
  mapsLink,
  websiteHref,
  websiteLabel,
  type Agency,
} from "@/lib/agencies";
import { whatsappUrl } from "@/lib/whatsapp";
import { trackAgencyContact, type ContactChannel } from "@/lib/agency-tracking";
import { WhatsAppIcon } from "@/components/brand";
import { AGENCIES_COPY, type AgenciesCopy } from "./copy";
import { AgenciesLayout, AgencyBadges, AgencyLogo } from "./AgenciesLayout";
import { agencyOfferingImage, agencyServiceImage } from "./agency-image";
import { FrequentlyAskedQuestions } from "@/components/faq/FrequentlyAskedQuestions";

/** /services/<slug> and /ar/services/<slug>: everything about one agency. */
export default function AgencyDetail({
  lang,
  agency,
  contacts: initialContacts,
}: {
  lang: Lang;
  agency: Agency;
  /** Visitors who already contacted the agency from this page. */
  contacts: number;
}) {
  const copy = AGENCIES_COPY[lang];
  const [contacts, setContacts] = useState(initialContacts);
  const onContact = (channel: ContactChannel) => {
    if (trackAgencyContact(agency.slug, channel)) setContacts((n) => n + 1);
  };
  const label = (c: string) => DICTS[lang].categoryLabels[c] ?? c;
  const city = agency.city ? (DICTS[lang].cityLabels[agency.city] ?? agency.city) : null;
  const summary = agencySummary(agency, lang);
  const description = agencyDescription(agency, lang);
  const offerings = agencyOfferings(agency, lang);
  const listPath = lang === "ar" ? "/ar/services" : "/services";
  const mapQuery = agencyMapQuery(agency);

  return (
    <AgenciesLayout lang={lang} switchHref={agencyPath(lang === "ar" ? "fr" : "ar", agency.slug)}>
      <div className="mx-auto max-w-6xl px-5 py-8 lg:py-12">
        <Link
          to={listPath}
          search={{}}
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          {copy.back}
        </Link>

        <header className="mt-6 flex flex-col gap-6 border-2 border-ink bg-paper p-6 shadow-cut sm:flex-row sm:items-center sm:p-8">
          <div className="grid h-28 w-full shrink-0 place-items-center border-2 border-ink bg-white p-4 sm:w-44">
            <AgencyLogo agency={agency} className="h-full max-h-20 w-full" />
          </div>
          <div className="min-w-0">
            <AgencyBadges agency={agency} lang={lang} />
            <h1 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] tracking-tight text-balance">
              {agency.name}
            </h1>
            {city && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-ink-soft">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {city}
              </p>
            )}
            {summary && <p className="mt-3 max-w-2xl text-lg leading-relaxed">{summary}</p>}
          </div>
        </header>

        <figure className="mt-6 overflow-hidden border-2 border-ink bg-paper-deep shadow-cut">
          <img
            src={agencyServiceImage(agency)}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="block aspect-[16/7] w-full object-cover sm:aspect-[2.5/1]"
          />
        </figure>

        <dl className="mt-6 grid grid-cols-2 border-2 border-ink bg-ink text-paper">
          <Stat
            icon={<UsersRound className="h-5 w-5" aria-hidden="true" />}
            value={agency.clients_generated}
            label={copy.statsClients}
          />
          <Stat
            icon={<MessageSquareText className="h-5 w-5" aria-hidden="true" />}
            value={contacts}
            label={copy.statsContacts}
            className="border-s-2 border-paper/20"
          />
        </dl>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl leading-tight tracking-tight">{copy.about}</h2>
              {description ? (
                <div className="mt-3 max-w-prose space-y-3 text-lg leading-relaxed">
                  {description.split(/\n{2,}/).map((paragraph, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-ink-soft">{copy.noDescription}</p>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl leading-tight tracking-tight">
                {copy.servicesTitle}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {agency.services.map((s) => (
                  <li key={s}>
                    <Link
                      to={listPath}
                      search={{ service: s }}
                      className="inline-flex border-2 border-ink bg-paper-deep px-3.5 py-2 text-sm font-semibold hover:bg-terra hover:text-paper"
                    >
                      {label(s)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {offerings.length > 0 && (
              <section>
                <h2 className="font-display text-2xl leading-tight tracking-tight">
                  {copy.offeringsTitle}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {offerings.map((offering) => (
                    <li
                      key={offering}
                      className="overflow-hidden border-2 border-ink bg-paper-deep font-medium leading-relaxed"
                    >
                      <img
                        src={agencyOfferingImage(agency, offering)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[16/9] w-full object-cover"
                      />
                      <p className="px-4 py-3">{offering}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {mapQuery && (
              <section>
                <h2 className="font-display text-2xl leading-tight tracking-tight">
                  {copy.locationTitle}
                </h2>
                {agency.address && <p className="mt-2 text-ink-soft">{agency.address}</p>}
                <div className="mt-4 overflow-hidden border-2 border-ink bg-paper-deep shadow-cut">
                  <iframe
                    src={mapsEmbed(mapQuery, lang)}
                    title={copy.mapTitle(agency.name)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block aspect-[4/3] w-full border-0 sm:aspect-video"
                  />
                </div>
                <a
                  href={mapsLink(mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-terra-deep underline underline-offset-4"
                >
                  {copy.openMaps} ↗
                </a>
              </section>
            )}
          </div>

          <ContactCard agency={agency} lang={lang} copy={copy} onContact={onContact} />
        </div>
      </div>

      <section className="border-t-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl leading-tight tracking-tight">
              {copy.proCta.title}
            </p>
            <p className="mt-2 max-w-xl leading-relaxed text-paper/85">{copy.proCta.body}</p>
          </div>
          <a
            href={lang === "ar" ? "/ar/inscription" : "/inscription"}
            className="lift shrink-0 border-2 border-paper bg-terra px-6 py-3 font-display leading-tight tracking-tight text-paper"
          >
            {copy.proCta.button}
          </a>
        </div>
      </section>
    </AgenciesLayout>
  );
}

function Stat({
  icon,
  value,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-6 ${className}`}
    >
      <dd className="order-2 flex items-center gap-2 font-display text-4xl leading-none text-terra tabular-nums sm:order-1 sm:text-5xl">
        <span className="text-paper/60">{icon}</span>
        {value.toLocaleString("fr-MA")}
      </dd>
      <dt className="order-1 text-sm font-semibold leading-snug text-paper/85 sm:order-2 sm:text-base">
        {label}
      </dt>
    </div>
  );
}

function ContactCard({
  agency,
  lang,
  copy,
  onContact,
}: {
  agency: Agency;
  lang: Lang;
  copy: AgenciesCopy;
  onContact: (channel: ContactChannel) => void;
}) {
  const hasContact = Boolean(agency.phone || agency.website || agency.address);
  const mapQuery = agencyMapQuery(agency);
  const rowClass = "flex items-start gap-3 border-t-2 border-ink/10 py-4 first:border-t-0";
  const labelClass =
    "font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft";

  return (
    <aside className="border-2 border-ink bg-paper-deep p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-2xl leading-tight tracking-tight">{copy.contactTitle}</h2>

      {hasContact ? (
        <ul className="mt-2">
          {agency.phone && (
            <li className={rowClass}>
              <Phone className="mt-1 h-5 w-5 shrink-0 text-terra-deep" aria-hidden="true" />
              <div className="min-w-0">
                <p className={labelClass}>{copy.phone}</p>
                <a
                  href={`tel:${agency.phone.replace(/[^\d+]/g, "")}`}
                  onClick={() => onContact("phone")}
                  dir="ltr"
                  className="mt-1 block text-lg font-semibold hover:text-terra-deep"
                >
                  {agency.phone}
                </a>
              </div>
            </li>
          )}
          {agency.website && (
            <li className={rowClass}>
              <Globe className="mt-1 h-5 w-5 shrink-0 text-terra-deep" aria-hidden="true" />
              <div className="min-w-0">
                <p className={labelClass}>{copy.website}</p>
                <a
                  href={websiteHref(agency.website)}
                  onClick={() => onContact("website")}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="mt-1 block break-words font-semibold underline underline-offset-4 hover:text-terra-deep"
                >
                  {websiteLabel(agency.website)} ↗
                </a>
              </div>
            </li>
          )}
          {agency.address && (
            <li className={rowClass}>
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-terra-deep" aria-hidden="true" />
              <div className="min-w-0">
                <p className={labelClass}>{copy.address}</p>
                <address className="mt-1 not-italic leading-relaxed">{agency.address}</address>
                <a
                  href={mapsLink(mapQuery ?? agency.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-semibold text-terra-deep underline underline-offset-4"
                >
                  {copy.map} ↗
                </a>
              </div>
            </li>
          )}
        </ul>
      ) : (
        <p className="mt-3 leading-relaxed text-ink-soft">{copy.noContact}</p>
      )}

      <div className="mt-4 space-y-3">
        {agency.phone && (
          <a
            href={`tel:${agency.phone.replace(/[^\d+]/g, "")}`}
            onClick={() => onContact("phone")}
            className="lift flex w-full items-center justify-center gap-2 border-2 border-ink bg-terra px-5 py-3 font-display leading-tight tracking-tight text-paper"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            {copy.call}
          </a>
        )}
        {!hasContact && (
          <a
            href={whatsappUrl(lang, copy.whatsappAbout(agency.name))}
            onClick={() => onContact("whatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            className="lift flex w-full items-center justify-center gap-2 border-2 border-ink bg-[#25D366] px-5 py-3 font-display leading-tight tracking-tight text-ink"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {copy.contactPagema}
          </a>
        )}
      </div>
    </aside>
  );
}
