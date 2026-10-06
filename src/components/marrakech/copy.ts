import type { Lang } from "@/lib/i18n";

/** All text of the /annuaire and /ar/annuaire landing. Service keys stay French (saved values). */
const fr = {
  meta: {
    title: "Page.ma Marrakech | Trouvez le bon service à Marrakech",
    description:
      "Sécurité, nettoyage, jardinage, piscine : Page.ma met en relation clients et entreprises de services vérifiées à Marrakech.",
    ogTitle: "Page.ma Marrakech | Trouvez le bon service",
    ogDescription:
      "Mise en relation avec des entreprises de services vérifiées à Marrakech. Inscription gratuite, sans engagement.",
    locale: "fr_MA",
  },
  switchLabel: "العربية",
  nav: {
    services: "Services",
    how: "Fonctionnement",
    advantages: "Avantages",
    contact: "Contact",
    search: "Je cherche",
    partner: "Devenir partenaire",
    top: "Page.ma, haut de page",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    main: "Navigation principale",
    mobile: "Navigation mobile",
  },
  hero: {
    title: "Trouvez le bon service.",
    titleAccent: "Développez votre activité.",
    body: "Page.ma met en relation les clients avec des entreprises de services au Maroc. Choisissez votre parcours et rejoignez les premiers inscrits.",
    partner: "Devenir partenaire",
    quotes: "Recevoir des devis",
    free: "Inscription gratuite, sans engagement.",
    offer: "1 mois offert aux entreprises partenaires",
  },
  partnersLabel: "Ils nous font confiance",
  categories: {
    eyebrow: "Nos catégories",
    title: "Cinq métiers, un seul point d'entrée",
    body: "Choisissez votre catégorie : votre demande est transmise aux entreprises correspondantes, dans votre ville.",
    items: {
      Sécurité: "Sociétés de sécurité, gardiennage et surveillance pour vos sites.",
      Nettoyage: "Équipes de nettoyage professionnel pour bureaux, locaux et domiciles.",
      Jardinage: "Entretien de jardins, espaces verts et aménagements extérieurs.",
      Piscine: "Entretien, nettoyage et maintenance de piscines.",
      Traiteur: "Traiteurs pour vos événements, réceptions, séminaires et repas d'entreprise.",
    } as Record<string, string>,
  },
  services: {
    Sécurité: "Sécurité",
    Nettoyage: "Nettoyage",
    Jardinage: "Jardinage",
    Piscine: "Piscine",
    Traiteur: "Traiteur",
    Autre: "Autre",
  } as Record<string, string>,
  engagements: [
    { title: "Disponible au Maroc", body: "Un service pensé pour les besoins locaux." },
    { title: "Réponse rapide", body: "Votre demande atteint les bons professionnels." },
    {
      title: "Professionnels adaptés",
      body: "Des entreprises selon votre service et votre ville.",
    },
    { title: "Simple et sécurisée", body: "Vos coordonnées restent confidentielles." },
  ],
  how: {
    eyebrow: "Comment ça marche",
    title: "Deux parcours,",
    titleAccent: "un même objectif",
    journeys: [
      {
        tag: "Pour les clients",
        alt: "Cliente décrivant son besoin sur Page.ma depuis son téléphone",
        steps: [
          { t: "Décrivez votre besoin", b: "Un formulaire simple, en moins d'une minute." },
          {
            t: "Les professionnels reçoivent la demande",
            b: "Page.ma identifie les entreprises adaptées.",
          },
          { t: "Recevez des propositions", b: "Comparez et choisissez en toute sérénité." },
        ],
        cta: "Je cherche un prestataire",
      },
      {
        tag: "Pour les entreprises",
        alt: "Entreprise partenaire consultant ses demandes clients",
        steps: [
          { t: "Créez votre présence partenaire", b: "Votre activité, vos services, vos villes." },
          {
            t: "Recevez des opportunités qualifiées",
            b: "Des demandes correspondant à votre métier.",
          },
          { t: "Développez votre activité", b: "Transformez les demandes en nouveaux clients." },
        ],
        cta: "Devenir partenaire",
      },
    ],
  },
  ecosystem: {
    eyebrow: "L'écosystème",
    title: "Une place de marché qui relie les deux côtés",
    clients: "Clients",
    clientsBody: "Particuliers et entreprises qui déposent un besoin.",
    companies: "Entreprises",
    companiesBody: "Sociétés professionnelles qui reçoivent des opportunités.",
  },
  advantages: {
    eyebrow: "Avantages",
    title: "Pourquoi rejoindre Page.ma ?",
    groups: [
      {
        tag: "Pour les clients",
        items: [
          { t: "Gagnez du temps", b: "Une seule demande, plusieurs professionnels contactés." },
          {
            t: "Trouvez les bons professionnels",
            b: "Des entreprises dont l'activité correspond à votre besoin.",
          },
          { t: "Une demande simple", b: "Décrivez votre besoin, recevez des propositions." },
        ],
      },
      {
        tag: "Pour les entreprises",
        items: [
          {
            t: "Recevez de nouvelles opportunités",
            b: "Des demandes qualifiées dans vos villes d'intervention.",
          },
          { t: "Développez votre activité", b: "Un canal d'acquisition dédié à votre métier." },
          {
            t: "Soyez parmi les premiers partenaires",
            b: "Un mois offert et une visibilité prioritaire dès le lancement.",
          },
        ],
      },
    ],
  },
  launch: {
    badge: "Places partenaires limitées pour le lancement",
    title: "Le lancement approche",
    body: "Rejoignez les premiers utilisateurs et partenaires Page.ma au Maroc. Les entreprises partenaires profitent d'un mois offert.",
    search: "Je cherche un service",
    partner: "Je deviens partenaire",
    steps: ["Inscription", "Sélection", "Lancement"],
  },
  signup: {
    title: "Vous êtes intéressé(e) ?",
    titleAccent: "Dites-le nous.",
    body: "Dites-nous ce que vous cherchez ou présentez ce que vous proposez. Rejoignez la plateforme et nous vous recontacterons.",
  },
  footer: {
    about: "Plateforme marocaine de mise en relation entre entreprises et prestataires vérifiés.",
    services: "Services",
    cities: "Villes",
    platform: "Plateforme",
    how: "Comment ça marche",
    partner: "Devenir partenaire",
    signup: "Préinscription",
    contact: "Contact",
    rights: "© 2026 Page.ma · Tous droits réservés",
    legal: "Mentions légales",
    privacy: "Confidentialité",
  },
  form: {
    tabClient: "Je cherche un prestataire",
    tabPro: "Je suis prestataire",
  },
};

export type MarrakechCopy = typeof fr;

const ar: MarrakechCopy = {
  meta: {
    title: "Page.ma مراكش | اعثر على الخدمة المناسبة في مراكش",
    description:
      "الأمن، النظافة، البستنة، المسابح: Page.ma تربط الزبناء بشركات خدمات موثوقة في مراكش.",
    ogTitle: "Page.ma مراكش | اعثر على الخدمة المناسبة",
    ogDescription: "ربط مباشر بشركات خدمات موثوقة في مراكش. تسجيل مجاني وبدون التزام.",
    locale: "ar_MA",
  },
  switchLabel: "Français",
  nav: {
    services: "الخدمات",
    how: "كيف يعمل",
    advantages: "المزايا",
    contact: "اتصل بنا",
    search: "أبحث عن خدمة",
    partner: "كن شريكاً",
    top: "Page.ma: العودة إلى الأعلى",
    open: "فتح القائمة",
    close: "إغلاق القائمة",
    main: "التنقل الرئيسي",
    mobile: "التنقل على الهاتف",
  },
  hero: {
    title: "اعثر على الخدمة المناسبة.",
    titleAccent: "طوّر نشاطك.",
    body: "Page.ma تربط الزبناء بشركات الخدمات في المغرب. اختر مسارك وانضم إلى أوائل المسجّلين.",
    partner: "كن شريكاً",
    quotes: "توصّل بعروض الأسعار",
    free: "تسجيل مجاني وبدون التزام.",
    offer: "شهر مجاني للشركات الشريكة",
  },
  partnersLabel: "شركاء يثقون بنا",
  categories: {
    eyebrow: "فئاتنا",
    title: "خمس مهن، ونقطة دخول واحدة",
    body: "اختر الفئة: يُرسَل طلبك إلى الشركات المناسبة في مدينتك.",
    items: {
      Sécurité: "شركات الأمن والحراسة والمراقبة لمواقعكم.",
      Nettoyage: "فرق نظافة محترفة للمكاتب والمحلات والمنازل.",
      Jardinage: "العناية بالحدائق والمساحات الخضراء والتهيئة الخارجية.",
      Piscine: "صيانة المسابح وتنظيفها.",
      Traiteur: "ممونو الحفلات لمناسباتكم وحفلات الاستقبال والندوات ووجبات الشركات.",
    },
  },
  services: {
    Sécurité: "الأمن",
    Nettoyage: "النظافة",
    Jardinage: "البستنة",
    Piscine: "المسابح",
    Traiteur: "ممون الحفلات",
    Autre: "أخرى",
  },
  engagements: [
    { title: "متوفّر في المغرب", body: "خدمة مصمّمة للاحتياجات المحلية." },
    { title: "استجابة سريعة", body: "يصل طلبك إلى المهنيين المناسبين." },
    { title: "مهنيون مناسبون", body: "شركات حسب خدمتك ومدينتك." },
    { title: "بسيطة وآمنة", body: "تبقى معلوماتك سرّية." },
  ],
  how: {
    eyebrow: "كيف يعمل",
    title: "مساران،",
    titleAccent: "وهدف واحد",
    journeys: [
      {
        tag: "للزبناء",
        alt: "زبونة تصف حاجتها على Page.ma من هاتفها",
        steps: [
          { t: "صِف حاجتك", b: "استمارة بسيطة في أقل من دقيقة." },
          { t: "يتوصّل المهنيون بالطلب", b: "تحدّد Page.ma الشركات المناسبة." },
          { t: "توصّل بالعروض", b: "قارن واختر بكل راحة." },
        ],
        cta: "أبحث عن مقدّم خدمة",
      },
      {
        tag: "للشركات",
        alt: "شركة شريكة تطّلع على طلبات زبنائها",
        steps: [
          { t: "أنشئ حضورك كشريك", b: "نشاطك، خدماتك، مدنك." },
          { t: "توصّل بفرص مؤهّلة", b: "طلبات تناسب مهنتك." },
          { t: "طوّر نشاطك", b: "حوّل الطلبات إلى زبناء جدد." },
        ],
        cta: "كن شريكاً",
      },
    ],
  },
  ecosystem: {
    eyebrow: "المنظومة",
    title: "سوق يربط بين الطرفين",
    clients: "الزبناء",
    clientsBody: "أفراد وشركات يقدّمون طلباتهم.",
    companies: "الشركات",
    companiesBody: "شركات مهنية تتوصّل بالفرص.",
  },
  advantages: {
    eyebrow: "المزايا",
    title: "لماذا تنضم إلى Page.ma؟",
    groups: [
      {
        tag: "للزبناء",
        items: [
          { t: "اربح الوقت", b: "طلب واحد، وعدة مهنيين يتم التواصل معهم." },
          { t: "اعثر على المهنيين المناسبين", b: "شركات يطابق نشاطها حاجتك." },
          { t: "طلب بسيط", b: "صِف حاجتك وتوصّل بالعروض." },
        ],
      },
      {
        tag: "للشركات",
        items: [
          { t: "توصّل بفرص جديدة", b: "طلبات مؤهّلة في مدن تدخّلك." },
          { t: "طوّر نشاطك", b: "قناة استقطاب مخصّصة لمهنتك." },
          { t: "كن من أوائل الشركاء", b: "شهر مجاني وظهور ذو أولوية منذ الإطلاق." },
        ],
      },
    ],
  },
  launch: {
    badge: "أماكن الشركاء محدودة عند الإطلاق",
    title: "الإطلاق يقترب",
    body: "انضم إلى أوائل مستخدمي وشركاء Page.ma في المغرب. تستفيد الشركات الشريكة من شهر مجاني.",
    search: "أبحث عن خدمة",
    partner: "أصبح شريكاً",
    steps: ["التسجيل", "الانتقاء", "الإطلاق"],
  },
  signup: {
    title: "هل أنت مهتم؟",
    titleAccent: "أخبرنا.",
    body: "أخبرنا بما تبحث عنه أو عرّفنا بما تقدّمه، وانضم إلى المنصة وسنعاود الاتصال بك.",
  },
  footer: {
    about: "منصة مغربية للربط بين الشركات ومقدّمي الخدمات الموثوقين.",
    services: "الخدمات",
    cities: "المدن",
    platform: "المنصة",
    how: "كيف يعمل",
    partner: "كن شريكاً",
    signup: "التسجيل المسبق",
    contact: "اتصل بنا",
    rights: "© 2026 Page.ma · جميع الحقوق محفوظة",
    legal: "الإشعارات القانونية",
    privacy: "الخصوصية",
  },
  form: {
    tabClient: "أبحث عن مقدّم خدمة",
    tabPro: "أنا مقدّم خدمة",
  },
};

export const MARRAKECH_COPY: Record<Lang, MarrakechCopy> = { fr, ar };
