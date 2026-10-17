import type { Lang } from "@/lib/i18n";
import { FREE_MONTH_OFFER, FREE_MONTH_PLACES_REMAINING } from "@/lib/free-month-offer";

export function FreeMonthCounter({ lang }: { lang: Lang }) {
  const copy = FREE_MONTH_OFFER[lang];
  return (
    <div data-offer-counter className="mt-4 flex flex-wrap items-center gap-3 text-ink">
      <span className="flex h-14 min-w-14 shrink-0 items-center justify-center border-2 border-ink bg-paper px-3 font-display text-3xl font-bold tabular-nums" dir="ltr">
        {FREE_MONTH_PLACES_REMAINING}
      </span>
      <div className="min-w-0">
        <p className="font-semibold">{copy.remaining}</p>
        <p className="text-sm text-ink-soft">{copy.value}</p>
      </div>
    </div>
  );
}