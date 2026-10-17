import type { ProLaunchStats } from "@/lib/pro.functions";
import type { ProCopy } from "./copy";
import { FREE_MONTH_PLACES_REMAINING } from "@/lib/free-month-offer";

/* Campaign settings — adjust here. */
export const DEFAULT_CITY = "Marrakech";

export type Labels = {
  copy: ProCopy;
  category: (c: string) => string;
  city: (c: string) => string;
};

export function remainingPlaces(_stats: ProLaunchStats | null, _category: string): number {
  return FREE_MONTH_PLACES_REMAINING;
}

export function placesText(copy: ProCopy, remaining: number) {
  return remaining === 0 ? copy.places.full : copy.places.left(remaining);
}
