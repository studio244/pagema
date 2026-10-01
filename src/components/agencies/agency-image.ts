import type { Agency } from "@/lib/agencies";

const AGENCY_SERVICE_IMAGES: Record<string, string> = {
  "asomovit-nettoyage": "/agencies/asomovit-nettoyage-service.jpg",
  "azur-protection": "/agencies/azur-protection-service.jpg",
  "s4u-safety-for-you": "/agencies/s4u-safety-for-you-service.jpg",
  "azur-facilities": "/agencies/azur-facilities-service.jpg",
  "asomovit-securite-privee": "/agencies/asomovit-securite-privee-service.jpg",
};

const CLEANING_OFFERING_IMAGES = [
  "/agencies/offerings/cleaning-office.jpg",
  "/agencies/offerings/cleaning-retail.jpg",
  "/agencies/offerings/cleaning-industrial.jpg",
  "/agencies/offerings/cleaning-hospitality.jpg",
  "/agencies/offerings/cleaning-construction.jpg",
  "/agencies/offerings/cleaning-windows.jpg",
  "/agencies/offerings/cleaning-floors.jpg",
  "/agencies/offerings/cleaning-upholstery.jpg",
  "/agencies/offerings/cleaning-maintenance.jpg",
];

const SECURITY_OFFERING_IMAGES = [
  "/agencies/offerings/security-physical.jpg",
  "/agencies/offerings/security-electronic.jpg",
  "/agencies/offerings/security-patrol.jpg",
  "/agencies/offerings/security-events.jpg",
  "/agencies/offerings/security-close-protection.jpg",
  "/agencies/offerings/security-training.jpg",
  "/agencies/offerings/security-fire-safety.jpg",
];

const AGENCY_OFFERING_IMAGES: Record<string, string[]> = {
  "asomovit-nettoyage": CLEANING_OFFERING_IMAGES,
  "azur-facilities": [
    CLEANING_OFFERING_IMAGES[0],
    CLEANING_OFFERING_IMAGES[1],
    CLEANING_OFFERING_IMAGES[4],
    "/agencies/offerings/cleaning-residential.jpg",
    CLEANING_OFFERING_IMAGES[3],
    CLEANING_OFFERING_IMAGES[2],
    "/agencies/offerings/cleaning-disinfection.jpg",
  ],
  "azur-protection": SECURITY_OFFERING_IMAGES.slice(0, 6),
  "s4u-safety-for-you": SECURITY_OFFERING_IMAGES.slice(0, 6),
  "asomovit-securite-privee": [
    SECURITY_OFFERING_IMAGES[0],
    SECURITY_OFFERING_IMAGES[1],
    SECURITY_OFFERING_IMAGES[2],
    SECURITY_OFFERING_IMAGES[3],
    SECURITY_OFFERING_IMAGES[5],
  ],
};

export function agencyServiceImage(agency: Agency): string {
  return (
    AGENCY_SERVICE_IMAGES[agency.slug] ??
    (agency.services.includes("Nettoyage")
      ? "/agencies/asomovit-nettoyage-service.jpg"
      : "/agencies/azur-protection-service.jpg")
  );
}

export function agencyOfferingImage(agency: Agency, offering: string): string {
  const normalized = offering
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const isSecurity = ["azur-protection", "s4u-safety-for-you", "asomovit-securite-privee"].includes(
    agency.slug,
  );

  const keywordMatches: [RegExp, string][] = isSecurity
    ? [
        [
          /electron|video|surveillance|\u0625\u0644\u0643\u062a\u0631\u0648\u0646|\u0641\u064a\u062f\u064a\u0648/,
          SECURITY_OFFERING_IMAGES[1],
        ],
        [/patrouille|ronde|intervention|\u062f\u0648\u0631\u064a/, SECURITY_OFFERING_IMAGES[2]],
        [/evenement|accueil|event|\u062a\u0638\u0627\u0647\u0631/, SECURITY_OFFERING_IMAGES[3]],
        [/rapproch|protection|\u0645\u0642\u0631\u0651?\u0628/, SECURITY_OFFERING_IMAGES[4]],
        [
          /formation|ingenierie|engineering|\u062a\u0643\u0648\u064a\u0646/,
          SECURITY_OFFERING_IMAGES[5],
        ],
        [/incendie|feu|fire|\u062d\u0631\u064a\u0642/, SECURITY_OFFERING_IMAGES[6]],
      ]
    : [
        [/vitre|fenetre|glass|\u0632\u062c\u0627\u062c/, CLEANING_OFFERING_IMAGES[5]],
        [
          /tapis|moquette|tissu|meuble|\u0632\u0631\u0627\u0628\u064a|\u0645\u0648\u0643\u064a\u062a/,
          CLEANING_OFFERING_IMAGES[7],
        ],
        [/sol|floor|\u0627\u0644\u0623\u0631\u0636\u064a\u0627\u062a/, CLEANING_OFFERING_IMAGES[6]],
        [
          /chantier|construction|\u0627\u0644\u0623\u0634\u063a\u0627\u0644/,
          CLEANING_OFFERING_IMAGES[4],
        ],
        [
          /hotel|restaurant|\u0641\u0646\u0627\u062f\u0642|\u0645\u0637\u0627\u0639\u0645/,
          CLEANING_OFFERING_IMAGES[3],
        ],
        [/industri|entrepot|warehouse|\u0635\u0646\u0627\u0639\u064a/, CLEANING_OFFERING_IMAGES[2]],
        [
          /commerce|boutique|magasin|\u0645\u062a\u0627\u062c\u0631|\u0645\u062d\u0644\u0627\u062a/,
          CLEANING_OFFERING_IMAGES[1],
        ],
        [
          /residence|copropriet|\u0627\u0644\u0645\u0633\u0627\u0643\u0646|\u0627\u0644\u0633\u0643\u0646/,
          "/agencies/offerings/cleaning-residential.jpg",
        ],
        [
          /desinfect|desinfection|\u062a\u0639\u0642\u064a\u0645/,
          "/agencies/offerings/cleaning-disinfection.jpg",
        ],
        [
          /ponctuel|contrat|regulier|entretien|maintenance|\u0635\u064a\u0627\u0646\u0629/,
          CLEANING_OFFERING_IMAGES[8],
        ],
      ];

  const matched = keywordMatches.find(([pattern]) => pattern.test(normalized));
  if (matched) return matched[1];

  const localizedIndex = Math.max(
    agency.offerings_fr?.indexOf(offering) ?? -1,
    agency.offerings_ar?.indexOf(offering) ?? -1,
  );
  const agencyImages = AGENCY_OFFERING_IMAGES[agency.slug];
  return (
    agencyImages?.[localizedIndex] ??
    AGENCY_SERVICE_IMAGES[agency.slug] ??
    agencyServiceImage(agency)
  );
}
