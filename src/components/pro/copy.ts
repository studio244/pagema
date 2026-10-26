import type { Lang } from "@/lib/i18n";
import type { HeroVariant } from "@/lib/pro-tracking";
import { FREE_MONTH_OFFER, FREE_MONTH_PLACES_LABEL } from "@/lib/free-month-offer";

/** All text of the /annuaire-ai and /ar/annuaire-ai provider landing. */
const fr = {
  meta: {
    title: "Page.ma Pro | Trouvez de nouveaux clients à Marrakech",
    description:
      "Professionnels de Marrakech : recevez des demandes de clients sur WhatsApp. 1 mois offert aux premiers inscrits : 0 MAD, sans carte bancaire, sans engagement.",
    ogDescription:
      "Recevez des demandes correspondant à votre activité directement sur WhatsApp. 1 mois offert aux premiers professionnels inscrits.",
    locale: "fr_MA",
  },
  cta: "Je réserve ma place gratuitement",
  reassurance: ["0 MAD", "Sans carte bancaire", "Sans engagement"],
  offerTag: "Offre lancement",
  offer: FREE_MONTH_OFFER.fr.title,
  heroes: {
    a: {
      title: "Trouvez de nouveaux clients à Marrakech avec Page.ma.",
      highlight: "nouveaux clients",
    },
    b: {
      title: "Soyez le pro que les clients de Marrakech trouvent en premier.",
      highlight: "en premier",
    },
  } satisfies Record<HeroVariant, { title: string; highlight: string }>,
  subtitle: "Recevez des demandes correspondant à votre activité directement sur WhatsApp.",
  proof: "professionnels déjà préinscrits à Marrakech",
  leadAlt:
    "Exemple de demande reçue sur WhatsApp : Piscine, entretien mensuel à Targa, Marrakech, budget indicatif 800–1 200 MAD par mois.",
  leadCaption: "Exemple de demande reçue sur WhatsApp",
  signupEyebrow: "Inscription gratuite",
  signupTitle: "Votre place en 3 étapes",
  steps: [
    {
      t: "Réservez votre place",
      b: "30 secondes : votre nom, WhatsApp, email, activité et ville.",
    },
    {
      t: "On valide votre activité",
      b: "Un appel rapide pour confirmer votre profil avant le lancement.",
    },
    {
      t: "Recevez vos demandes",
      b: "Les demandes de clients arrivent sur votre WhatsApp.",
    },
  ],
  form: {
    title: "Réservez votre mois offert",
    name: "Nom",
    namePh: "Prénom et nom",
    phone: "Téléphone WhatsApp",
    phonePh: "06 12 34 56 78",
    phoneError: "Entrez un numéro marocain valide, par ex. 06 12 34 56 78.",
    email: "Email",
    emailPh: "vous@exemple.ma",
    activity: "Votre activité",
    activityPh: "Choisissez votre activité",
    city: "Ville",
    sending: "Envoi…",
    error: "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.",
    doneTag: "Place réservée ✓",
    doneTitle: "Bienvenue sur Page.ma.",
    doneBody:
      "Votre mois offert est réservé. On vous contacte sur WhatsApp pour valider votre activité avant le lancement.",
    placesFull: (activity: string) =>
      `Places offertes épuisées en ${activity}, mais l'inscription reste gratuite.`,
    placesLeft: (places: string, _activity: string) => `${places} pour profiter du 1er mois offert.`,
  },
  places: {
    left: () => `Plus que ${FREE_MONTH_PLACES_LABEL.fr} offertes`,
    full: "Places offertes épuisées",
    unknown: "Places offertes limitées",
    eyebrow: "Offre lancement · Marrakech",
    title: FREE_MONTH_OFFER.fr.title,
    body: () =>
      `Il reste ${FREE_MONTH_PLACES_LABEL.fr} pour cette offre, toutes villes et activités confondues.`,
  },
  finalTitle: "Vos prochains clients à Marrakech vous écrivent sur WhatsApp.",
  footer: "Préinscriptions ouvertes — plateforme en préparation",
  switchLabel: "العربية",
};

export type ProCopy = typeof fr;

const ar: ProCopy = {
  meta: {
    title: "Page.ma Pro | اعثر على زبناء جدد في مراكش",
    description:
      "مهنيو مراكش: توصّلوا بطلبات زبناء تناسب نشاطكم مباشرة على واتساب. شهر مجاني لأوائل المسجّلين: 0 درهم، بدون بطاقة بنكية، بدون التزام.",
    ogDescription:
      "توصّل بطلبات تناسب نشاطك مباشرة على واتساب. شهر مجاني لأوائل المهنيين المسجّلين.",
    locale: "ar_MA",
  },
  cta: "أحجز مكاني مجاناً",
  reassurance: ["0 درهم", "بدون بطاقة بنكية", "بدون التزام"],
  offerTag: "عرض الإطلاق",
  offer: FREE_MONTH_OFFER.ar.title,
  heroes: {
    a: { title: "اعثر على زبناء جدد في مراكش مع Page.ma.", highlight: "زبناء جدد" },
    b: { title: "كن المهني الذي يجده زبناء مراكش أولاً.", highlight: "أولاً" },
  },
  subtitle: "توصّل بطلبات تناسب نشاطك مباشرة على واتساب.",
  proof: "مهنيون سجّلوا مسبقاً في مراكش",
  leadAlt:
    "مثال على طلب يصل عبر واتساب: مسبح، صيانة شهرية في تاركة، مراكش، ميزانية تقديرية 800–1200 درهم في الشهر.",
  leadCaption: "مثال على طلب يصلك عبر واتساب",
  signupEyebrow: "تسجيل مجاني",
  signupTitle: "مكانك في 3 خطوات",
  steps: [
    { t: "احجز مكانك", b: "30 ثانية: اسمك، رقم واتساب، بريدك، نشاطك ومدينتك." },
    { t: "نتحقق من نشاطك", b: "مكالمة قصيرة لتأكيد ملفك قبل الإطلاق." },
    { t: "توصّل بالطلبات", b: "تصلك طلبات الزبناء على واتساب مباشرةً." },
  ],
  form: {
    title: "احجز شهرك المجاني",
    name: "الاسم",
    namePh: "الاسم الكامل",
    phone: "رقم واتساب",
    phonePh: "06 12 34 56 78",
    phoneError: "أدخل رقماً مغربياً صحيحاً، مثلاً 06 12 34 56 78.",
    email: "البريد الإلكتروني",
    emailPh: "vous@exemple.ma",
    activity: "نشاطك",
    activityPh: "اختر نشاطك",
    city: "المدينة",
    sending: "جارٍ الإرسال…",
    error: "تعذّر الإرسال. تحقّق من الاتصال وأعد المحاولة.",
    doneTag: "تم حجز مكانك ✓",
    doneTitle: "مرحباً بك في Page.ma.",
    doneBody: "تم حجز شهرك المجاني. سنتواصل معك عبر واتساب للتحقق من نشاطك قبل الإطلاق.",
    placesFull: (activity: string) =>
      `نفدت الأماكن المجانية في ${activity}، لكن التسجيل يبقى مجانياً.`,
    placesLeft: (places: string, _activity: string) => `${places} للاستفادة من الشهر الأول مجاناً.`,
  },
  places: {
    left: () => `بقيت ${FREE_MONTH_PLACES_LABEL.ar}`,
    full: "نفدت الأماكن المجانية",
    unknown: "أماكن مجانية محدودة",
    eyebrow: "عرض الإطلاق · مراكش",
    title: FREE_MONTH_OFFER.ar.title,
    body: () =>
      `بقيت ${FREE_MONTH_PLACES_LABEL.ar} لهذا العرض، لجميع المدن والأنشطة مجتمعة.`,
  },
  finalTitle: "زبناؤك القادمون في مراكش يراسلونك على واتساب.",
  footer: "التسجيلات المسبقة مفتوحة — المنصة قيد التحضير",
  switchLabel: "Français",
};

export const PRO_COPY: Record<Lang, ProCopy> = { fr, ar };
