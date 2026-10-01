import type { Lang } from "@/lib/i18n";

/** Text of the form-only provider page /inscription and /ar/inscription. */
const fr = {
  meta: {
    title: "Inscription prestataire | Page.ma",
    description:
      "Professionnels : inscrivez-vous en 30 secondes et recevez des demandes de clients sur WhatsApp. 1 mois offert aux premiers inscrits : 0 MAD, sans engagement.",
    locale: "fr_MA",
  },
  eyebrow: "Espace prestataires",
  title: "Recevez vos prochains clients",
  highlight: "directement sur WhatsApp.",
  points: [
    "Des demandes qui correspondent à votre activité et votre ville",
    "Inscription en 30 secondes, sans document à fournir",
    "1 mois offert aux premiers inscrits, sans carte bancaire",
  ],
  launch: "Lancement officiel le 1er novembre 2026",
  proof: "professionnels déjà préinscrits",
  formNote: "On vous contacte sur WhatsApp pour valider votre activité avant le lancement.",
  photoAlt: "",
  switchLabel: "العربية",
};

export type SignupCopy = typeof fr;

const ar: SignupCopy = {
  meta: {
    title: "تسجيل المهنيين | Page.ma",
    description:
      "أيها المهنيون: سجّلوا في 30 ثانية وتوصّلوا بطلبات الزبناء على واتساب. شهر مجاني لأوائل المسجّلين: 0 درهم، بدون التزام.",
    locale: "ar_MA",
  },
  eyebrow: "فضاء المهنيين",
  title: "توصّل بزبنائك القادمين",
  highlight: "مباشرة على واتساب.",
  points: [
    "طلبات تناسب نشاطك ومدينتك",
    "تسجيل في 30 ثانية، بدون أي وثيقة",
    "شهر مجاني لأوائل المسجّلين، بدون بطاقة بنكية",
  ],
  launch: "الإطلاق الرسمي في 1 نونبر 2026",
  proof: "مهنيون سجّلوا مسبقاً",
  formNote: "سنتواصل معك عبر واتساب للتحقق من نشاطك قبل الإطلاق.",
  photoAlt: "",
  switchLabel: "Français",
};

export const SIGNUP_COPY: Record<Lang, SignupCopy> = { fr, ar };
