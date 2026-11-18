export type MatchableAgency = { slug: string; published: boolean; coverage_cities: string[]; offering_slugs: string[] };
export const MAX_OPPORTUNITY_RECIPIENTS = 3;
export function compatibleAgencies<T extends MatchableAgency>(agencies: T[], offering: string, city: string): T[] {
  return agencies.filter(a => a.published && a.coverage_cities.includes(city) && a.offering_slugs.includes(offering));
}
export function validateRecipientSelection(agencies: MatchableAgency[], offering: string, city: string, slugs: string[]) {
  if (slugs.length > MAX_OPPORTUNITY_RECIPIENTS || new Set(slugs).size !== slugs.length) return false;
  const compatible = new Set(compatibleAgencies(agencies, offering, city).map(a => a.slug));
  return slugs.every(slug => compatible.has(slug));
}