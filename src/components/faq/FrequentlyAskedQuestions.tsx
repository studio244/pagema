import { Plus } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { FAQ_COPY, type FaqVariant } from "./copy";

/** Shared, bilingual questions for public pages; cleaning retains its sector-specific FAQ. */
export function FrequentlyAskedQuestions({ lang, variant }: { lang: Lang; variant: FaqVariant }) {
  const copy = FAQ_COPY[lang];
  return (
    <section id="section-faq" dir={lang === "ar" ? "rtl" : "ltr"} aria-labelledby="faq-title" className="scroll-mt-24 bg-paper font-sans text-ink">
      <div className="mx-auto max-w-4xl px-5 py-16 lg:py-24">
        <h2 id="faq-title" className="font-display text-2xl leading-tight sm:text-3xl">{copy.title}</h2>
        <div className="mt-8 space-y-4">
          {copy.items[variant].map((item) => (
            <details key={item.q} className="group border-2 border-ink bg-paper-deep">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold leading-snug focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terra [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 text-pretty">{item.q}</span>
                <Plus aria-hidden="true" className="h-4 w-4 shrink-0 text-terra transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" strokeWidth={3} />
              </summary>
              <p className="border-t-2 border-ink/20 px-5 py-4 text-sm leading-relaxed text-ink-soft text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}