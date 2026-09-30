import type { Lang } from "@/lib/i18n";

/** Text of /services (agency directory) and /services/<slug> (agency page), FR and AR. */
const fr = {
  meta: {
    title: "Services & agences au Maroc — Page.ma",
    description:
      "Sécurité, nettoyage, jardinage, piscine… Choisissez un service et trouvez les agences qui le proposent au Maroc, avec leurs coordonnées.",
    agencyTitle: (name: string) => `${name} — Services et contact | Page.ma`,
    agencyDescription: (name: string, services: string) =>
      `${name} : ${services}. Présentation, services proposés et coordonnées de l'agence sur Page.ma.`,
    locale: "fr_MA",
  },
  switchLabel: "العربية",
  home: "Accueil",
  headerCta: "Inscrire mon agence",
  eyebrow: "Services & agences",
  title: "Trouvez l'agence qu'il vous faut",
  intro: "Choisissez un service pour voir les agences qui le proposent.",
  filterLabel: "Filtrer par service",
  all: "Tous les services",
  agencies: (n: number) => (n <= 1 ? `${n} agence` : `${n} agences`),
  resultsAll: "Toutes les agences",
  resultsFor: (service: string) => `Agences : ${service}`,
  clear: "Effacer le filtre",
  partner: "Partenaire Page.ma",
  verified: "Vérifiée",
  viewAgency: "Voir l'agence",
  emptyTitle: (service: string) => `Pas encore d'agence en ${service}`,
  emptyBody:
    "Les premières agences rejoignent Page.ma avant le lancement. Revenez bientôt, ou contactez-nous : on vous oriente vers le bon prestataire.",
  emptyPro: "Vous proposez ce service ? Inscrivez votre agence",
  emptyAll: "Voir toutes les agences",
  emptyAsk: (service: string) =>
    `Bonjour Page.ma, je cherche une agence en ${service}. Pouvez-vous m'orienter ?`,
  noAgencies: "Les agences arrivent bientôt sur Page.ma.",
  back: "Toutes les agences",
  about: "Présentation",
  noDescription: "La présentation détaillée de cette agence sera bientôt disponible.",
  servicesTitle: "Services proposés",
  offeringsTitle: "Prestations détaillées",
  contactTitle: "Contact",
  phone: "Téléphone",
  call: "Appeler",
  website: "Site web",
  address: "Adresse",
  map: "Voir sur la carte",
  locationTitle: "Localisation",
  statsClients: "Clients générés par Page.ma",
  statsContacts: "Demandes de contact via Page.ma",
  mapTitle: (name: string) => `Carte : emplacement de ${name}`,
  openMaps: "Ouvrir dans Google Maps",
  noContact:
    "Les coordonnées de cette agence seront bientôt en ligne. En attendant, Page.ma vous met en relation directement.",
  contactPagema: "Contacter Page.ma sur WhatsApp",
  whatsappAbout: (name: string) =>
    `Bonjour Page.ma, je souhaite être mis en relation avec l'agence ${name}.`,
  proCta: {
    title: "Vous êtes une agence ?",
    body: "Soyez visible auprès des clients qui cherchent vos services et recevez leurs demandes sur WhatsApp.",
    button: "Inscrire mon agence gratuitement",
  },
  footer: "Lancement officiel le 1er novembre 2026",
};

export type AgenciesCopy = typeof fr;

const ar: AgenciesCopy = {
  meta: {
    title: "الخدمات والوكالات في المغرب — Page.ma",
    description:
      "الأمن، النظافة، البستنة، المسابح… اختر خدمة واعثر على الوكالات التي تقدّمها في المغرب، مع معلومات الاتصال بها.",
    agencyTitle: (name: string) => `${name} — الخدمات والاتصال | Page.ma`,
    agencyDescription: (name: string, services: string) =>
      `${name}: ${services}. تقديم الوكالة وخدماتها ومعلومات الاتصال بها على Page.ma.`,
    locale: "ar_MA",
  },
  switchLabel: "Français",
  home: "الرئيسية",
  headerCta: "سجّل وكالتك",
  eyebrow: "الخدمات والوكالات",
  title: "اعثر على الوكالة التي تحتاجها",
  intro: "اختر خدمة لعرض الوكالات التي تقدّمها.",
  filterLabel: "التصفية حسب الخدمة",
  all: "كل الخدمات",
  agencies: (n: number) =>
    n === 0 ? "0 وكالة" : n === 1 ? "وكالة واحدة" : n === 2 ? "وكالتان" : `${n} وكالات`,
  resultsAll: "كل الوكالات",
  resultsFor: (service: string) => `الوكالات: ${service}`,
  clear: "إلغاء التصفية",
  partner: "شريك Page.ma",
  verified: "موثّقة",
  viewAgency: "عرض الوكالة",
  emptyTitle: (service: string) => `لا توجد وكالة في ${service} بعد`,
  emptyBody:
    "تنضم الوكالات الأولى إلى Page.ma قبل الإطلاق. عد قريباً، أو تواصل معنا: سنوجّهك نحو مقدّم الخدمة المناسب.",
  emptyPro: "تقدّم هذه الخدمة؟ سجّل وكالتك",
  emptyAll: "عرض كل الوكالات",
  emptyAsk: (service: string) => `مرحباً Page.ma، أبحث عن وكالة في ${service}. هل يمكنكم توجيهي؟`,
  noAgencies: "الوكالات قادمة قريباً على Page.ma.",
  back: "كل الوكالات",
  about: "تقديم",
  noDescription: "سيتوفر التقديم المفصّل لهذه الوكالة قريباً.",
  servicesTitle: "الخدمات المقدّمة",
  offeringsTitle: "الخدمات التفصيلية",
  contactTitle: "الاتصال",
  phone: "الهاتف",
  call: "اتصال",
  website: "الموقع الإلكتروني",
  address: "العنوان",
  map: "عرض على الخريطة",
  locationTitle: "الموقع",
  statsClients: "زبناء جلبهم Page.ma",
  statsContacts: "طلبات تواصل عبر Page.ma",
  mapTitle: (name: string) => `خريطة: موقع ${name}`,
  openMaps: "فتح في خرائط Google",
  noContact: "ستُنشر معلومات الاتصال بهذه الوكالة قريباً. في الأثناء، يربطك Page.ma بها مباشرة.",
  contactPagema: "تواصل مع Page.ma عبر واتساب",
  whatsappAbout: (name: string) => `مرحباً Page.ma، أريد التواصل مع وكالة ${name}.`,
  proCta: {
    title: "هل أنت وكالة؟",
    body: "كن مرئياً لدى الزبناء الذين يبحثون عن خدماتك وتوصّل بطلباتهم على واتساب.",
    button: "سجّل وكالتك مجاناً",
  },
  footer: "الإطلاق الرسمي في 1 نونبر 2026",
};

export const AGENCIES_COPY: Record<Lang, AgenciesCopy> = { fr, ar };
