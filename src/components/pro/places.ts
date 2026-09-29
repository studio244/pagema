import type { ProLaunchStats } from "@/lib/pro.functions";
import type { ProCopy } from "./copy";

/* Campaign settings — adjust here. */
export const DEFAULT_CITY = "Marrakech";
/** Free first month for the first N providers per activity (same rule as the homepage offer). */
export const PLACES_PER_ACTIVITY = 5;

export type Labels = {
  copy: ProCopy;
  category: (c: string) => string;
  city: (c: string) => string;
};

export function remainingPlaces(stats: ProLaunchStats | null, category: string): number | null {
  if (!stats) return null;
  return Math.max(0, PLACES_PER_ACTIVITY - (stats.byCategory[category] ?? 0));
}

export function placesText(copy: ProCopy, remaining: number) {
  return remaining === 0 ? copy.places.full : copy.places.left(remaining);
}
