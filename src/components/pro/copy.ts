import type { Lang } from "@/lib/i18n";
import type { HeroVariant } from "@/lib/pro-tracking";

/** All text of the /pro and /ar/pro provider landing. */
const fr = {
  meta: {
    title: "Page.ma Pro — Trouvez de nouveaux clients à Marrakech",
    description:
      "Professionnels de Marrakech : recevez des demandes de clients correspondant à votre activité directement sur WhatsApp. 1 mois offert aux premiers inscrits — 0 MAD, sans carte bancaire, sans engagement.",
    ogDescription:
      "Recevez des demandes correspondant à votre activité directement sur WhatsApp. 1 mois offert aux premiers professionnels inscrits.",
    locale: "fr_MA",
  },
  cta: "Je réserve ma place gratuitement",
  reassurance: ["0 MAD", "Sans carte bancaire", "Sans engagement"],
  offerTag: "Offre lancement",
  offer: "1 mois offert aux premiers professionnels inscrits",
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
    "Exemple de demande reçue sur WhatsApp : Piscine — entretien mensuel à Targa, Marrakech, budget indicatif 800–1 200 MAD par mois.",
  leadCaption: "Exemple de demande reçue sur WhatsApp",
  signupEyebrow: "Inscription gratuite",
  signupTitle: "Votre place en 3 étapes",
  steps: [
    { t: "Réservez votre place", b: "30 secondes : votre WhatsApp, votre activité, votre ville." },
    {
      t: "On valide votre activité",
      b: "Un appel rapide pour confirmer votre profil avant le lancement.",
    },
    {
      t: "Recevez vos demandes",
      b: "Dès le 1er novembre, les demandes de clients arrivent sur votre WhatsApp.",
    },
  ],
  form: {
    title: "Réservez votre mois offert",
    phone: "Téléphone WhatsApp",
    phonePh: "06 12 34 56 78",
    phoneError: "Entrez un numéro marocain valide, par ex. 06 12 34 56 78.",
    activity: "Votre activité",
    activityPh: "Choisissez votre activité",
    city: "Ville",
    sending: "Envoi…",
    error: "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.",
    doneTag: "Place réservée ✓",
    doneTitle: "Bienvenue sur Page.ma.",
    doneBody:
      "Votre mois offert est réservé. On vous contacte sur WhatsApp pour valider votre activité avant le lancement du 1er novembre.",
    placesFull: (activity: string) =>
      `Places offertes épuisées en ${activity} — l'inscription reste gratuite.`,
    placesLeft: (places: string, activity: string) => `${places} en ${activity} à Marrakech.`,
  },
  places: {
    left: (n: number) => (n === 1 ? "Plus qu'1 place offerte" : `Plus que ${n} places offertes`),
    full: "Places offertes épuisées",
    unknown: "Places offertes limitées",
    eyebrow: "Offre lancement · Marrakech",
    title: "Un mois offert, activité par activité",
    body: (n: number) =>
      `Les ${n} premiers professionnels inscrits dans chaque activité à Marrakech bénéficient du premier mois offert.`,
  },
  finalTitle: "Vos prochains clients à Marrakech vous écrivent sur WhatsApp.",
  footer: "Lancement officiel le 1er novembre 2026",
  switchLabel: "العربية",
};

export type ProCopy = typeof fr;

const ar: ProCopy = {
  meta: {
    title: "Page.ma Pro — اعثر على زبناء جدد في مراكش",
    description:
      "مهنيو مراكش: توصّلوا بطلبات زبناء تناسب نشاطكم مباشرة على واتساب. شهر مجاني لأوائل المسجّلين — 0 درهم، بدون بطاقة بنكية، بدون التزام.",
    ogDescription:
      "توصّل بطلبات تناسب نشاطك مباشرة على واتساب. شهر مجاني لأوائل المهنيين المسجّلين.",
    locale: "ar_MA",
  },
  cta: "أحجز مكاني مجاناً",
  reassurance: ["0 درهم", "بدون بطاقة بنكية", "بدون التزام"],
  offerTag: "عرض الإطلاق",
  offer: "شهر مجاني لأوائل المهنيين المسجّلين",
  heroes: {
    a: { title: "اعثر على زبناء جدد في مراكش مع Page.ma.", highlight: "زبناء جدد" },
    b: { title: "كن المهني الذي يجده زبناء مراكش أولاً.", highlight: "أولاً" },
  },
  subtitle: "توصّل بطلبات تناسب نشاطك مباشرة على واتساب.",
  proof: "مهنيون سجّلوا مسبقاً في مراكش",
  leadAlt:
    "مثال على طلب يصل عبر واتساب: مسبح — صيانة شهرية في تاركة، مراكش، ميزانية تقديرية 800–1200 درهم في الشهر.",
  leadCaption: "مثال على طلب يصلك عبر واتساب",
  signupEyebrow: "تسجيل مجاني",
  signupTitle: "مكانك في 3 خطوات",
  steps: [
    { t: "احجز مكانك", b: "30 ثانية: رقم واتساب، نشاطك ومدينتك." },
    { t: "نتحقق من نشاطك", b: "مكالمة قصيرة لتأكيد ملفك قبل الإطلاق." },
    { t: "توصّل بالطلبات", b: "ابتداءً من 1 نونبر، تصلك طلبات الزبناء على واتساب." },
  ],
  form: {
    title: "احجز شهرك المجاني",
    phone: "رقم واتساب",
    phonePh: "06 12 34 56 78",
    phoneError: "أدخل رقماً مغربياً صحيحاً، مثلاً 06 12 34 56 78.",
    activity: "نشاطك",
    activityPh: "اختر نشاطك",
    city: "المدينة",
    sending: "جارٍ الإرسال…",
    error: "تعذّر الإرسال. تحقّق من الاتصال وأعد المحاولة.",
    doneTag: "تم حجز مكانك ✓",
    doneTitle: "مرحباً بك في Page.ma.",
    doneBody: "تم حجز شهرك المجاني. سنتواصل معك عبر واتساب للتحقق من نشاطك قبل الإطلاق في 1 نونبر.",
    placesFull: (activity: string) =>
      `نفدت الأماكن المجانية في ${activity} — التسجيل يبقى مجانياً.`,
    placesLeft: (places: string, activity: string) => `${places} في ${activity} بمراكش.`,
  },
  places: {
    left: (n: number) => (n === 1 ? "بقي مكان مجاني واحد" : `بقيت ${n} أماكن مجانية`),
    full: "نفدت الأماكن المجانية",
    unknown: "أماكن مجانية محدودة",
    eyebrow: "عرض الإطلاق · مراكش",
    title: "شهر مجاني، نشاطاً بنشاط",
    body: (n: number) =>
      `أول ${n} مهنيين يسجّلون في كل نشاط بمراكش يستفيدون من الشهر الأول مجاناً.`,
  },
  finalTitle: "زبناؤك القادمون في مراكش يراسلونك على واتساب.",
  footer: "الإطلاق الرسمي في 1 نونبر 2026",
  switchLabel: "Français",
};

export const PRO_COPY: Record<Lang, ProCopy> = { fr, ar };
