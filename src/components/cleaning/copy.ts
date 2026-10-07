import type { Lang } from "@/lib/i18n";

/**
 * Copy for the /nettoyage-casablanca landing page (French) and its Arabic twin
 * /ar/nettoyage-casablanca. Only facts already stated elsewhere on the site are
 * used here: pre-launch status, 1 November 2026 opening, up to 3 comparable
 * quotes, human phone validation, free for clients, 25 cities, launch offer.
 */
const fr = {
  meta: {
    title: "Société de nettoyage à Casablanca : 3 devis | Page.ma",
    description:
      "Décrivez votre besoin : Page.ma le qualifie par téléphone et vous transmet jusqu'à 3 devis de sociétés de nettoyage vérifiées à Casablanca. Ouverture le 1er novembre 2026.",
    ogTitle: "Société de nettoyage à Casablanca — jusqu'à 3 devis de pros vérifiés",
    ogDescription:
      "Page.ma qualifie votre demande par téléphone, puis vous envoie jusqu'à 3 devis comparables de sociétés de nettoyage vérifiées à Casablanca.",
  },
  nav: {
    home: "Page.ma, retour en haut",
    prelaunch: "Pré-lancement",
    links: [
      { label: "Prestations", href: "#section-prestations" },
      { label: "Comment ça marche", href: "#section-processus" },
      { label: "Zones desservies", href: "#section-villes" },
      { label: "Questions", href: "#section-faq" },
    ],
    client: "Je cherche un pro",
    pro: "Je propose mes services",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
  },
  hero: {
    imgAlt: "Équipe de professionnels marocains de la sécurité, du nettoyage et des services",
    kicker: "Ouverture le 1er novembre 2026 · Casablanca",
    title: "Trouver une société de nettoyage à Casablanca",
    titleHighlights: ["société de nettoyage", "Casablanca"],
    subtitle:
      "Décrivez votre besoin en deux minutes. Page.ma le qualifie par téléphone, puis vous transmet jusqu'à 3 devis de sociétés de nettoyage vérifiées à Casablanca.",
    ctaMain: "Décrire mon besoin",
    ctaSecondary: "Je propose mes services",
    days: "jours",
    hours: "heures",
    minutes: "minutes",
    offerTag: "Offre de lancement",
    offer:
      "Les 5 premiers prestataires inscrits en nettoyage à Casablanca bénéficient du 1er mois offert à 990 MAD.",
  },
  steps: {
    eyebrow: "COMMENT ÇA MARCHE",
    title: "Du besoin au devis",
    items: [
      {
        t: "Vous décrivez le besoin",
        b: "Type de nettoyage, zone de Casablanca, fréquence, surface : quelques lignes suffisent.",
        alt: "Une machine à écrire avec des livres et une tasse de café",
      },
      {
        t: "On qualifie par téléphone",
        b: "Un appel confirme les détails et écarte les demandes mal adaptées avant toute mise en relation.",
        alt: "Un conseiller Page.ma au casque vérifie une demande par téléphone",
      },
      {
        t: "Jusqu'à 3 devis comparables",
        b: "Vous recevez les offres de sociétés de nettoyage vérifiées, sélectionnées pour le même type de mission.",
        alt: "Trois fiches de devis notées et validées",
      },
    ],
  },
  why: {
    eyebrow: "POURQUOI PAGE.MA",
    title: "Trois offres, pas une seule",
    body: "Le site d'une société de nettoyage vous donne un tarif que vous ne pouvez pas comparer. Page.ma réunit jusqu'à 3 offres de sociétés vérifiées et comparables, pour que vous décidiez en connaissance de cause.",
    points: [
      {
        t: "Jusqu'à 3 prestataires comparables",
        b: "Des sociétés de nettoyage qui interviennent réellement dans votre zone et sur le même type de mission.",
      },
      {
        t: "Validation humaine par téléphone",
        b: "Chaque besoin et chaque société sont vérifiés par téléphone avant la moindre mise en relation.",
      },
      {
        t: "Pas de boîte noire",
        b: "Nous vous expliquons pourquoi chaque société est retenue : métier, ville, taille d'équipe, disponibilité.",
      },
      {
        t: "Gratuit, sans compte",
        b: "Aucun compte à créer, aucun engagement, zéro spam. Vous ne payez rien pour recevoir des devis.",
      },
    ],
    note: "Page.ma est une plateforme de mise en relation : nous ne réalisons pas nous-mêmes les prestations de nettoyage.",
  },
  services: {
    eyebrow: "PRESTATIONS",
    title: "Ce que vous pouvez demander à Casablanca",
    body: "Décrivez le type de nettoyage, nous cherchons les sociétés qui le pratiquent vraiment.",
    items: [
      { t: "Bureaux et locaux professionnels", b: "Entretien régulier, passage quotidien ou hebdomadaire." },
      { t: "Copropriétés et immeubles", b: "Parties communes, halls, escaliers, locaux poubelles." },
      { t: "Ménage résidentiel", b: "Appartements et villas, nettoyage ponctuel ou récurrent." },
      { t: "Vitres et façades vitrées", b: "Vitrines de commerces, baies vitrées, verrières." },
      { t: "Fin de chantier", b: "Remise en état complète après des travaux." },
      { t: "Avant état des lieux", b: "Remise à neuf avant un départ ou une location courte durée." },
      { t: "Désinfection des locaux", b: "Commerces, cabinets, salles de réunion, espaces d'accueil." },
      { t: "Commerces et restauration", b: "Surfaces de vente, salles, arrière-cuisines." },
      { t: "Entrepôts et sites industriels", b: "Grandes surfaces, circulations, abords." },
    ],
  },
  coverage: {
    eyebrow: "COUVERTURE NATIONALE",
    cities: "villes",
    tagline: "Un réseau de proximité au Maroc",
    card: "Des professionnels vérifiés, au plus près de votre besoin.",
    title1: "Partout où",
    title2: "vous êtes.",
    badge: "Casablanca · 25 points",
    body: "De Tanger à Dakhla, Page.ma met en relation clients et prestataires qualifiés dans les principaux pôles du Royaume.",
    zonesTitle: "Zones d'intervention à Casablanca",
    zones: [
      "Maârif",
      "Anfa",
      "Ain Diab",
      "Racine",
      "Gauthier",
      "Palmier",
      "Californie",
      "Aïn Sebaâ",
      "Sidi Maârouf",
      "Belvédère",
      "Hay Mohammadi",
      "Derb Sultan",
      "Mers Sultan",
      "Bouskoura",
    ],
  },
  demand: {
    eyebrow: "VOUS AVEZ UN BESOIN",
    title1: "Décrivez votre",
    title2: "besoin de nettoyage.",
    body: "Bureaux, immeuble, appartement, local après travaux : dites ce qu'il vous faut, on trouve les bonnes sociétés.",
    benefits: [
      "Jusqu'à 3 sociétés de nettoyage vérifiées et comparables.",
      "Validation humaine par téléphone avant chaque mise en relation.",
      "Vous savez pourquoi chaque société est sélectionnée.",
      "Gratuit, sans compte, zéro spam.",
    ],
  },
  faq: {
    eyebrow: "QUESTIONS FRÉQUENTES",
    title: "Tout ce qu'il faut savoir",
    items: [
      {
        q: "Page.ma est-elle une société de nettoyage ?",
        a: "Non. Page.ma est une plateforme de mise en relation : nous ne réalisons pas les prestations. Ce sont les sociétés de nettoyage inscrites qui interviennent, et elles seules fixent leurs tarifs.",
      },
      {
        q: "Comment les sociétés de nettoyage sont-elles vérifiées ?",
        a: "Chaque société est contrôlée sur ses documents d'entreprise, puis contactée par téléphone pour confirmer ses prestations, sa zone d'intervention et ses disponibilités. Aucune mise en relation n'est envoyée sans cette validation humaine.",
      },
      {
        q: "Combien coûte un service de nettoyage à Casablanca ?",
        a: "Le prix dépend de la surface, de la fréquence, du type de locaux et des produits utilisés. C'est justement pour cela que vous recevez jusqu'à 3 devis comparables : vous comparez avant de décider. Le service est gratuit pour vous.",
      },
      {
        q: "Quels types de nettoyage peut-on demander ?",
        a: "Entretien de bureaux et de locaux commerciaux, parties communes d'immeubles, ménage résidentiel, vitres et façades, fin de chantier, remise en état avant état des lieux, désinfection et nettoyage de surfaces industrielles.",
      },
      {
        q: "Dans quelles zones de Casablanca vos prestataires interviennent-ils ?",
        a: "Dans toute l'agglomération de Casablanca, des quartiers du centre (Maârif, Derb Sultan, Mers Sultan) aux zones résidentielles et d'affaires (Anfa, Ain Diab, Racine, Californie) et aux zones industrielles (Aïn Sebaâ, Sidi Maârouf, Bouskoura).",
      },
      {
        q: "Quels délais pour recevoir des devis ?",
        a: "Page.ma ouvre le 1er novembre 2026. Votre pré-inscription est enregistrée dès maintenant et nous vous appelons dès l'ouverture à Casablanca pour valider votre besoin et lancer la recherche.",
      },
      {
        q: "Est-ce que ça m'engage à quelque chose ?",
        a: "Non. Décrire son besoin est gratuit et sans engagement : vous choisissez ensuite, ou pas, l'une des offres reçues.",
      },
    ],
  },
  pro: {
    eyebrow: "VOUS ÊTES UNE SOCIÉTÉ DE NETTOYAGE ?",
    title1: "Soyez visible à",
    title2: "Casablanca.",
    body: "Inscrivez votre société dans l'annuaire Page.ma et recevez les demandes de clients de votre ville, qualifiées et envoyées sur WhatsApp.",
    benefits: [
      "Une présence dans l'annuaire, par métier, ville et zone d'intervention.",
      "Des demandes qualifiées reçues par alerte WhatsApp, en texte et en note vocale.",
      "Tarifs transparents à partir de 990 MAD par mois, sans commission cachée.",
      "Accès anticipé : vous faites partie des premiers prestataires et vous façonnez le produit.",
    ],
  },
  footer: {
    about:
      "Plateforme marocaine de mise en relation avec des prestataires vérifiés : sécurité, nettoyage, jardinage, piscine et plus.",
    servicesTitle: "Nettoyage",
    platformTitle: "Plateforme",
    legal: "Mentions légales · Confidentialité",
    on: "Page.ma sur",
    backHome: "Retour à l'accueil",
  },
  whatsappWidget: "Discuter avec nous sur WhatsApp",
};

type Copy = typeof fr;

const ar: Copy = {
  meta: {
    title: "شركة تنظيف في الدار البيضاء | 3 عروض من Page.ma",
    description:
      "اشرحوا حاجتكم: Page.ma يؤهّلها بالهاتف ثم يرسل لكم حتى 3 عروض أسعار من شركات تنظيف موثوقة في الدار البيضاء. الانطلاق يوم 1 نونبر 2026.",
    ogTitle: "شركة تنظيف في الدار البيضاء — حتى 3 عروض من محترفين موثوقين",
    ogDescription:
      "Page.ma يؤهّل طلبكم بالهاتف ثم يرسل لكم حتى 3 عروض أسعار قابلة للمقارنة من شركات تنظيف موثوقة في الدار البيضاء.",
  },
  nav: {
    home: "Page.ma، العودة إلى الأعلى",
    prelaunch: "قبل الانطلاق",
    links: [
      { label: "الخدمات", href: "#section-prestations" },
      { label: "كيف يعمل", href: "#section-processus" },
      { label: "مناطق التغطية", href: "#section-villes" },
      { label: "أسئلة", href: "#section-faq" },
    ],
    client: "أبحث عن محترف",
    pro: "أقدّم خدماتي",
    open: "فتح القائمة",
    close: "إغلاق القائمة",
  },
  hero: {
    imgAlt: "فريق من المهنيين المغاربة في الأمن والنظافة والخدمات",
    kicker: "الانطلاق يوم 1 نونبر 2026 · الدار البيضاء",
    title: "إيجاد شركة تنظيف في الدار البيضاء",
    titleHighlights: ["شركة تنظيف", "الدار البيضاء"],
    subtitle:
      "اشرحوا حاجتكم في دقيقتين. Page.ma يؤهّلها بالهاتف ثم يرسل لكم حتى 3 عروض أسعار من شركات تنظيف موثوقة في الدار البيضاء.",
    ctaMain: "أشرح حاجتي",
    ctaSecondary: "أقدّم خدماتي",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    offerTag: "عرض الانطلاق",
    offer: "أول 5 مزوّدين مسجّلين في التنظيف بالدار البيضاء يحصلون على الشهر الأول مجّانا بسعر 990 درهما.",
  },
  steps: {
    eyebrow: "كيف يعمل",
    title: "من الحاجة إلى عرض السعر",
    items: [
      {
        t: "تشرحون حاجتكم",
        b: "نوع التنظيف، منطقة الدار البيضاء، التكرار، المساحة: بضع سطور تكفي.",
        alt: "آلة كاتبة مع كتب وفنجان قهوة",
      },
      {
        t: "نتحقّق بالهاتف",
        b: "مكالمة تؤكّد التفاصيل وتُبعد الطلبات غير الملائمة قبل أي لقاء.",
        alt: "مستشار Page.ma بسمّاعة يراجع طلبا عبر الهاتف",
      },
      {
        t: "حتى 3 عروض",
        b: "تصلكم عروض شركات تنظيف موثوقة، مختارة لنفس نوع المهمة.",
        alt: "ثلاث بطاقات عروض أسعار مُقيّمة ومؤكّدة",
      },
    ],
  },
  why: {
    eyebrow: "لماذا Page.ma",
    title: "ثلاثة عروض، لا عرض واحد",
    body: "موقع شركة تنظيف واحد يعطيكم سعرا لا يمكن مقارنته. Page.ma يجمع لكم حتى 3 عروض من شركات موثوقة ومتشابهة، حتى تقرّروا بوضوح.",
    points: [
      {
        t: "حتى 3 مزوّدين متشابهين",
        b: "شركات تنظيف تنشط فعلا في منطقتكم وتخدم نفس نوع المهمة.",
      },
      {
        t: "تحقّق بشري بالهاتف",
        b: "كل طلب وكل شركة يُتحقّق منهما بالهاتف قبل أي لقاء.",
      },
      {
        t: "لا صندوق أسود",
        b: "نشرح لكم لماذا اختيرت كل شركة: المهنة، المدينة، حجم الفريق، التوفّر.",
      },
      {
        t: "مجّانا وبدون حساب",
        b: "بلا حساب، بلا التزام، وبلا رسائل مزعجة. لا تدفعون شيئا مقابل تلقي العروض.",
      },
    ],
    note: "Page.ma منصّة تواصل: نحن لا نقوم بأعمال التنظيف بأنفسنا، بل نوصلكم بشركات التنظيف.",
  },
  services: {
    eyebrow: "الخدمات",
    title: "ما يمكنكم طلبه في الدار البيضاء",
    body: "حدّدوا نوع التنظيف، ونحن نبحث عن الشركات التي تمارسه فعلا.",
    items: [
      { t: "المكاتب والمحلات المهنية", b: "صيانة منتظمة، تدخّل يومي أو أسبوعي." },
      { t: "الإقامات والمباني", b: "الأماكن المشتركة، البهو، الدرج، قاعات الأزبال." },
      { t: "التنظيف المنزلي", b: "شقق وفيلات، تنظيف مناسباتي أو منتظم." },
      { t: "الزجاج والواجهات الزجاجية", b: "واجهات المحلات، النوافذ الكبيرة، الأسقف الزجاجية." },
      { t: "نهاية الورش", b: "إعادة تأهيل شاملة بعد الأشغال." },
      { t: "قبل تسليم الكراء", b: "تنظيف دقيق قبل مغادرة أو كراء قصير المدى." },
      { t: "تعقيم المحلات", b: "محلات، عيادات، قاعات اجتماعات، فضاءات الاستقبال." },
      { t: "المحلات والمطاعم", b: "فضاءات البيع، القاعات، المطابخ الخلفية." },
      { t: "المستودعات والمواقع الصناعية", b: "مساحات كبيرة، ممرات، محيط الموقع." },
    ],
  },
  coverage: {
    eyebrow: "تغطية وطنية",
    cities: "مدينة",
    tagline: "شبكة قريبة منكم في المغرب",
    card: "محترفون موثوقون قرب حاجتكم.",
    title1: "في كل",
    title2: "مكان",
    badge: "الدار البيضاء · 25 نقطة",
    body: "من طنجة إلى الداخلة، Page.ma يربط الزبناء بمزوّدي خدمات مؤهّلين في أهم مدن المملكة.",
    zonesTitle: "مناطق التدخّل في الدار البيضاء",
    zones: [
      "معاريف",
      "أنفا",
      "عين الذياب",
      "راسين",
      "غوتيي",
      "بالمية",
      "كاليفورنيا",
      "عين السبع",
      "سيدي معروفي",
      "بلفيدير",
      "حي المحمدي",
      "درب سلطان",
      "مرس السلطان",
      "بوسكورة",
    ],
  },
  demand: {
    eyebrow: "لديكم حاجة",
    title1: "اشرحوا",
    title2: "حاجتكم في التنظيف.",
    body: "مكتب، عمارة، شقة، محلات بعد الأشغال: قولوا ما تحتاجونه ونحن نجد الشركات المناسبة.",
    benefits: [
      "حتى 3 شركات تنظيف موثوقة ومتشابهة.",
      "تحقّق بشري بالهاتف قبل كل لقاء.",
      "تعرفون لماذا اختيرت كل شركة.",
      "مجّانا، بدون حساب، وبدون رسائل مزعجة.",
    ],
  },
  faq: {
    eyebrow: "أسئلة متكررة",
    title: "كل ما يجب معرفته",
    items: [
      {
        q: "هل Page.ma شركة تنظيف؟",
        a: "لا. Page.ma منصّة تواصل: نحن لا نقوم بأعمال التنظيف. الشركات المسجّلة هي التي تتدخّل، وهي وحدتها التي تحدّد أسعارها.",
      },
      {
        q: "كيف تُتحقّق شركة التنظيف؟",
        a: "نتحقّق من وثائق الشركة، ثم نتّصل بها بالهاتف لتأكيد خدماتها ومنطقة تدخّلها وتوفّرها. ولا يُرسل أي لقاء قبل هذا التحقّق البشري.",
      },
      {
        q: "كم يكلّف خدمات التنظيف في الدار البيضاء؟",
        a: "السعر يعتمد على المساحة والتكرار ونوع المحلات والمواد المستعملة. ولهذا بالضبط تصلكم حتى 3 عروض قابلة للمقارنة: تقارنون قبل أن تقرّروا. الخدمة مجّانية بالنسبة لكم.",
      },
      {
        q: "ما أنواع التنظيف التي يمكن طلبها؟",
        a: "صيانة المكاتب والمحلات التجارية، الأماكن المشتركة للعمارات، التنظيف المنزلي، الزجاج والواجهات، نهاية الورش، التنظيف قبل تسليم الكراء، التعقيم وتنظيف المواقع الصناعية.",
      },
      {
        q: "في أي مناطق من الدار البيضاء يتدخّل مزوّدوكم؟",
        a: "في كل عمالة الدار البيضاء، من أحياء المركز (معاريف، درب سلطان، مرس السلطان) إلى الأحياء السكنية والمالية (أنفا، عين الذياب، راسين، كاليفورنيا) والمناطق الصناعية (عين السبع، سيدي معروفي، بوسكورة).",
      },
      {
        q: "ما الآجال لتلقي عروض الأسعار؟",
        a: "Page.ma ينطلق يوم 1 نونبر 2026. تسجيلكم المسبق يُسجَّل الآن، ونتّصل بكم فور الانطلاق في الدار البيضاء لتأكيد حاجتكم وبدء البحث.",
      },
      {
        q: "هل يُلزمني هذا بشيء؟",
        a: "لا. شرح الحاجة مجّاني وبدون التزام: تختارون بعد ذلك أحد العروض أو لا تختارون.",
      },
    ],
  },
  pro: {
    eyebrow: "أنتم شركة تنظيف؟",
    title1: "كونوا مرئيين",
    title2: "في الدار البيضاء.",
    body: "سجّلوا شركتكم في دليل Page.ma وتوصّلوا بطلبات الزبناء في مدينتكم، مؤهّلة ومرسلة على واتساب.",
    benefits: [
      "حضور في الدليل، حسب المهنة والمدينة ومنطقة التدخّل.",
      "طلبات مؤهّلة تصلكم بتنبيهات واتساب، نصا وكصوت.",
      "أسعار شفافة ابتداء من 990 درهما في الشهر، بدون عمولة خفية.",
      "ولوج مبكّر: أنتم من أوّل المزوّدين وتشاركون في تشكيل المنتج.",
    ],
  },
  footer: {
    about:
      "منصّة مغربية للتواصل مع مزوّدي خدمات موثوقين: الأمن، النظافة، البستنة، المسابح والمزيد.",
    servicesTitle: "النظافة",
    platformTitle: "المنصّة",
    legal: "البيانات القانونية · الخصوصية",
    on: "Page.ma على",
    backHome: "العودة إلى الرئيسية",
  },
  whatsappWidget: "تحدّث معنا على واتساب",
};

export const CLEANING_COPY: Record<Lang, Copy> = { fr, ar };
