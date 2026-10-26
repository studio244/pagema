import type { Lang } from "@/lib/i18n";
import { FREE_MONTH_OFFER } from "@/lib/free-month-offer";

export function FreeMonthCounter({ lang }: { lang: Lang }) {
  const copy = FREE_MONTH_OFFER[lang];
  return (
    <div data-offer-counter className="mt-4 inline-flex max-w-full items-center gap-3 border-2 border-ink bg-paper px-4 py-3 text-ink">
      <span aria-hidden className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-terra" />
      <span className="min-w-0">
        <span className="block font-semibold">{copy.remaining}</span>
        <span className="block text-sm text-ink-soft">{copy.value}</span>
      </span>
    </div>
  );
}
