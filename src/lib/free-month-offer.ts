/** Manually maintained campaign availability; never simulate registrations. */
export const FREE_MONTH_PLACES_REMAINING = 10;

/** Wording shown to visitors instead of the exact count; keep FR and AR paired. */
export const FREE_MONTH_PLACES_LABEL = {
  fr: "quelques places",
  ar: "أماكن قليلة",
} as const;

export const FREE_MONTH_OFFER = {
  fr: {
    title: "Plus que quelques places pour profiter du 1er mois offert",
    value: "Valeur 990 MAD",
    remaining: "Quelques places restantes",
  },
  ar: {
    title: "بقيت أماكن قليلة للاستفادة من الشهر الأول مجاناً",
    value: "بقيمة 990 درهماً",
    remaining: "أماكن قليلة متبقية",
  },
};
