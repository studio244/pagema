import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, Ticket } from "lucide-react";
import { DICTS, LangContext, type Lang } from "@/lib/i18n";
import { CATEGORIES, COVERAGE_CITIES } from "@/lib/catalog";
import { trackPro } from "@/lib/pro-tracking";
import { Button } from "@/components/ui/button";
import { PreregistrationForm } from "@/components/home/PreregistrationForm";
import { FrequentlyAskedQuestions } from "@/components/faq/FrequentlyAskedQuestions";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteBreadcrumb } from "@/components/site/SiteBreadcrumb";
import { RichLine } from "@/components/site/RichLine";
import { crumbs, localPath, tradeHref } from "@/components/site/nav";
import teamPhoto from "@/assets/pagema-pros-equipe.jpg";
import { PARTNER_COPY } from "./copy";
import { filterPartnerExamples, type PARTNER_EXAMPLES } from "./offers";

type Example = (typeof PARTNER_EXAMPLES)[number];

/** The Casablanca cleaning example points to the local page rather than the directory filter. */
const localCleaning = (offer: Example) => offer.category === "Nettoyage" && offer.city === "Casablanca";

export default function PartnerBenefitsPage({ lang }: { lang: Lang }) {
  const c = PARTNER_COPY[lang];
  const t = DICTS[lang];
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [selected, setSelected] = useState<Example | null>(null);
  const offers = filterPartnerExamples(category, city);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function request(offer: Example) {
    setSelected(offer);
    trackPro("cta_click", "a", { category: offer.category, city: offer.city });
    window.gtag?.("event", "partner_offer_click", {
      offer_id: offer.id, category: offer.category, city: offer.city,
      language: lang, is_example: true,
      page_path: lang === "ar" ? "/ar/avantages-partenaires" : "/avantages-partenaires",
    });
    document.getElementById("section-prestataire")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  const selectClass = "w-full border-2 border-ink bg-paper px-4 py-3 font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-terra";

  return (
    <LangContext.Provider value={{ lang, t, setLang: () => {} }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} className="brand-v2 min-h-dvh bg-paper text-ink font-sans">
        <SiteHeader lang={lang} switchHref={lang === "ar" ? "/avantages-partenaires" : "/ar/avantages-partenaires"} />
        <main>
          <section className="border-b-2 border-ink bg-paper-deep">
            <div className="mx-auto max-w-6xl px-5 pt-6 pb-12 lg:pt-8 lg:pb-16">
              <SiteBreadcrumb lang={lang} items={crumbs(lang).partners} className="mb-8 lg:mb-10" />
              <p className="mb-4 text-xs font-bold uppercase text-terra-deep">{c.eyebrow}</p>
              <h1 className="font-display text-3xl leading-tight sm:text-5xl">{c.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{c.intro}</p>
              <p className="mt-7 max-w-3xl border-s-4 border-terra ps-4 font-semibold leading-relaxed">{c.notice}</p>
            </div>
          </section>
          <section aria-label={c.title} className="mx-auto max-w-6xl px-5 py-10 lg:py-12">
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="mb-2 block text-sm font-bold">{c.activity}</span>
                <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">{c.allActivities}</option>
                  {CATEGORIES.map((value) => <option key={value} value={value}>{t.categoryLabels[value] ?? value}</option>)}
                </select>
              </label>
              <label><span className="mb-2 block text-sm font-bold">{c.city}</span>
                <select className={selectClass} value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">{c.allCities}</option>
                  {COVERAGE_CITIES.map((value) => <option key={value} value={value}>{t.cityLabels[value] ?? value}</option>)}
                </select>
              </label>
            </div>
            <p className="my-6 text-sm font-semibold text-ink-soft" role="status">{offers.length} {c.results}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {offers.map((offer) => (
                <article key={offer.id} className="flex min-w-0 flex-col border-2 border-ink bg-paper shadow-cut">
                  <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-5 py-3">
                    <span className="text-xs font-bold text-terra-deep">{c.example}</span>
                    <Ticket aria-hidden="true" className="h-5 w-5 text-terra" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold text-ink-soft">{c.partner} · {t.categoryLabels[offer.category] ?? offer.category}</p>
                    <h2 className="mt-3 font-display text-xl leading-snug">{c.titles[offer.category]}</h2>
                    <p className="mt-3 flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4" aria-hidden="true" />{t.cityLabels[offer.city] ?? offer.city}</p>
                    <p className="mt-6 font-display text-3xl text-terra-deep">{c.amount}</p>
                    <p className="mt-1 text-sm font-semibold">{c.reduction}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">{c.descriptions[offer.category]}</p>
                    <p className="mb-5 mt-3 text-xs leading-relaxed text-ink-soft">{c.condition}</p>
                    <p className="mb-5 text-sm text-ink-soft">
                      {c.findIn}{" "}
                      <a href={localCleaning(offer) ? localPath(lang, "/nettoyage-casablanca") : tradeHref(lang, offer.category)} className="font-semibold text-ink underline decoration-terra decoration-2 underline-offset-4 hover:text-terra-deep">
                        {localCleaning(offer) ? c.localCleaning : (t.categoryLabels[offer.category] ?? offer.category)}
                      </a>
                    </p>
                    <Button onClick={() => request(offer)} className="mt-auto h-auto min-h-12 w-full whitespace-normal rounded-none border-2 border-ink px-3 py-3 text-base font-bold">
                      {c.request}<ArrowUpRight aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            {offers.length === 0 && <div className="py-12 text-center"><p className="font-semibold">{c.empty}</p><Button variant="link" onClick={() => { setCategory(""); setCity(""); }}>{c.reset}</Button></div>}
          </section>
          <section id="section-prestataire" className="scroll-mt-8 border-y-2 border-ink bg-paper-deep">
            <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl leading-tight">{c.formTitle}</h2>
                <p className="mt-5 max-w-prose leading-relaxed text-ink-soft">{c.formNote}</p>
                <RichLine parts={c.more} className="mt-4 max-w-prose leading-relaxed text-ink-soft" />
                {selected && <div role="status" className="mt-6 border-s-4 border-terra ps-4"><p className="text-sm font-bold">{c.selected} · {t.categoryLabels[selected.category]} · {t.cityLabels[selected.city] ?? selected.city}</p><p className="mt-2 text-sm text-ink-soft">{c.selectedNote}</p></div>}
                <img src={teamPhoto} alt="" aria-hidden="true" loading="lazy" className="mt-8 aspect-[3/2] w-full border-2 border-ink object-cover" />
              </div>
              <PreregistrationForm profile="prestataire" defaultCity={selected?.city ?? ""} source={`Page ${lang === "ar" ? "/ar/avantages-partenaires" : "/avantages-partenaires"} · ${selected?.id ?? "intérêt général"} · EXEMPLE FICTIF — aucun coupon activé`} />
            </div>
          </section>
          <FrequentlyAskedQuestions lang={lang} variant="partners" />
        </main>
        <SiteFooter lang={lang} page="avantages-partenaires" />
      </div>
    </LangContext.Provider>
  );
}