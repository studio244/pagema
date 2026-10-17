export const PARTNER_EXAMPLES = [
  { id: "exemple-nettoyage-casablanca", category: "Nettoyage", city: "Casablanca" },
  { id: "exemple-impression-rabat", category: "Impression", city: "Rabat" },
  { id: "exemple-jardinage-marrakech", category: "Jardinage", city: "Marrakech" },
] as const;

export function filterPartnerExamples(category: string, city: string) {
  return PARTNER_EXAMPLES.filter((offer) =>
    (!category || offer.category === category) && (!city || offer.city === city),
  );
}