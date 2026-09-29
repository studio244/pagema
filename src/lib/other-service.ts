import type { Lang } from "@/lib/i18n";

/** Extra choice in the service lists; picking it asks the visitor to type the service. */
export const OTHER = "Autre";

/** Longest service the visitor can type after picking "Autre". */
export const OTHER_MAX_LENGTH = 60;

/** The database refuses a preregistration whose category is longer than this. */
export const CATEGORY_MAX_LENGTH = 80;

export const OTHER_TEXT: Record<Lang, { option: string; label: string; placeholder: string }> = {
  fr: {
    option: "Autre",
    label: "Précisez le service",
    placeholder: "Ex. plomberie, électricité, déménagement…",
  },
  ar: {
    option: "أخرى",
    label: "حدّد الخدمة",
    placeholder: "مثلاً: السباكة، الكهرباء، النقل…",
  },
};

/** Value saved in the database and the email: "Autre : plomberie" instead of just "Autre". */
export function withOther(category: string, otherText: string): string {
  return category === OTHER ? `${OTHER} : ${otherText.trim()}` : category;
}
