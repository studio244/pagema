import { useState } from "react";
import { useT } from "@/lib/i18n";
import { CATEGORIES, COVERAGE_CITIES } from "@/lib/catalog";
import { getJourneyPreview } from "@/lib/journey.functions";
import type { JourneyPreview } from "@/lib/journey.server";
import { trackPro } from "@/lib/pro-tracking";
import { BrandMark, Eyebrow, Reveal } from "@/components/brand";

const COPY = {
  fr: {
    eyebrow: "La plateforme en préparation",
    title: "Voici comment ça marchera, concrètement.",
    subtitle:
      "Choisissez votre activité et votre ville : nous vous montrons le parcours que vivront vos futurs clients, de leur demande à votre devis.",
    badge: "Aperçu de la future plateforme — exemple fictif",
    activity: "Votre activité",
    city: "Votre ville",
    generate: "Voir mon parcours personnalisé",
    generating: "Génération en cours…",
    error: "La génération n'a pas abouti. Réessayez dans un instant.",
    steps: ["La demande client arrive", "Vous suivez l'opportunité", "Vous envoyez votre devis"],
    followUpLabel: "Votre tableau de suivi",
    quoteLabel: "Devis · à envoyer au client",
    transmitted: "Transmise à 3 prestataires vérifiés maximum.",
    compare: "Le client compare les devis des 3 prestataires et choisit en confiance.",
    reserve: "Je réserve ma place gratuitement",
  },
  ar: {
    eyebrow: "المنصة قيد التحضير",
    title: "إليكم كيف ستعمل المنصة، بشكل ملموس.",
    subtitle:
      "اختاروا نشاطكم ومدينتكم: نعرض لكم المسار الذي سيعيشه زبناؤكم المستقبليون، من طلبهم إلى عرض ثمنكم.",
    badge: "نظرة على المنصة المستقبلية — مثال افتراضي",
    activity: "نشاطكم",
    city: "مدينتكم",
    generate: "أعرض مساري المخصص",
    generating: "جارٍ الإنشاء…",
    error: "تعذّر الإنشاء. أعيدوا المحاولة بعد قليل.",
    steps: ["يصل طلب الزبون", "تتابعون الفرصة", "ترسلون عرض الثمن"],
    followUpLabel: "لوحة المتابعة الخاصة بكم",
    quoteLabel: "عرض ثمن · لإرساله إلى الزبون",
    transmitted: "يُرسَل إلى 3 مقدّمي خدمات موثوقين كحد أقصى.",
    compare: "يقارن الزبون عروض الثمن الثلاثة ويختار بثقة.",
    reserve: "أحجز مكاني مجاناً",
  },
} as const;

export function JourneyPreviewSection({
  onReserve,
}: {
  /** Carries the chosen activity and city into the provider form. */
  onReserve?: (selection: { category: string; city: string }) => void;
}) {
  const { lang, t } = useT();
  const c = COPY[lang];
  const [activity, setActivity] = useState<string>(CATEGORIES[1] ?? "Nettoyage");
  const [city, setCity] = useState<string>(COVERAGE_CITIES[0] ?? "Casablanca");
  const [preview, setPreview] = useState<JourneyPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(false);
    try {
      setPreview(await getJourneyPreview({ data: { activity, city, lang } }));
    } catch (e) {
      console.warn("journey preview failed", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "w-full border-2 border-ink bg-paper px-4 py-3 font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-terra";

  return (
    <section className="border-b-2 border-ink bg-paper-deep">
      <div className="max-w-6xl mx-auto px-5 py-20 lg:py-24">
        <Reveal>
          <Eyebrow className="text-terra mb-4">{c.eyebrow}</Eyebrow>
          <h2 className="font-display leading-[0.95] tracking-tight text-[clamp(2.2rem,5.5vw,3.6rem)] text-balance">
            {c.title}
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">{c.subtitle}</p>
          <p className="mt-5 inline-block border-2 border-ink bg-paper px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] shadow-[4px_4px_0_var(--ink)]">
            {c.badge}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                {c.activity}
              </span>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className={selectClass}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t.categoryLabels[cat] ?? cat}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-1">
              <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                {c.city}
              </span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                {COVERAGE_CITIES.map((v) => (
                  <option key={v} value={v}>
                    {t.cityLabels[v] ?? v}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="border-2 border-ink bg-terra px-6 py-3 font-display text-lg text-paper lift disabled:opacity-60"
            >
              {loading ? c.generating : c.generate}
            </button>
          </div>
          {error && <p className="mt-3 font-semibold text-terra-deep">{c.error}</p>}
        </Reveal>

        {preview && (
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            <PreviewCard step="01" title={c.steps[0]}>
              <div className="border-[1.5px] border-ink bg-paper p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  {t.categoryLabels[activity] ?? activity} · {t.cityLabels[city] ?? city}
                </p>
                <p className="mt-1 font-semibold leading-snug">{preview.request.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  « {preview.request.clientNeed} »
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {preview.request.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-[1.5px] border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-ink-soft">{c.transmitted}</p>
            </PreviewCard>

            <PreviewCard step="02" title={c.steps[1]}>
              <div className="border-[1.5px] border-ink bg-paper p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  {c.followUpLabel}
                </p>
                <p className="mt-1 font-semibold leading-snug">{preview.followUp.title}</p>
                <p className="mt-1 text-sm font-semibold text-terra-deep">
                  {preview.followUp.status}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {preview.followUp.stages.map((stage, i) => (
                  <span
                    key={stage}
                    className={`border-[1.5px] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${
                      i === 2
                        ? "border-terra bg-terra text-paper"
                        : i < 2
                          ? "border-ink bg-paper"
                          : "border-ink text-ink-soft"
                    }`}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </PreviewCard>

            <PreviewCard step="03" title={c.steps[2]}>
              <div className="border-[1.5px] border-ink bg-paper p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  {c.quoteLabel}
                </p>
                <p className="mt-1 font-semibold leading-snug">{preview.quote.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {preview.quote.details}
                </p>
                <p className="mt-1 font-display text-xl">{preview.quote.price}</p>
              </div>
              <p className="mt-3 text-sm text-ink-soft">{c.compare}</p>
            </PreviewCard>
          </ol>
        )}

        {preview && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                trackPro("cta_click", "a", { category: activity, city });
                onReserve?.({ category: activity, city });
                document.getElementById("section-prestataire")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-ink bg-terra px-8 py-4 font-display text-xl text-paper lift"
            >
              {c.reserve}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PreviewCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border-2 border-ink bg-paper shadow-[6px_6px_0_var(--ink)]">
      <header className="flex items-center gap-3 border-b-2 border-ink bg-paper px-4 py-3">
        <span className="font-mono text-xl font-bold text-terra">{step}</span>
        <BrandMark className="h-4 w-auto text-terra" />
        <h3 className="font-semibold leading-tight">{title}</h3>
      </header>
      <div className="p-4">{children}</div>
    </li>
  );
}
