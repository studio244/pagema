import type { Lang } from "@/lib/i18n";

export type FaqVariant = "home" | "pro" | "directory" | "agency" | "annuaire";
type FaqItem = { q: string; a: string };

const fr: Record<FaqVariant, FaqItem[]> = {
  home: [
    { q: "À qui s’adresse Page.ma ?", a: "Page.ma met en relation les clients qui cherchent un service et les professionnels qui le proposent au Maroc." },
    { q: "Comment demander des devis ?", a: "Remplissez le formulaire client avec votre activité recherchée, votre ville et vos coordonnées. Votre besoin est étudié pour vous orienter vers les prestataires adaptés, avec jusqu’à 3 devis de professionnels vérifiés." },
    { q: "Comment serai-je contacté ?", a: "Renseignez un numéro WhatsApp valide dans le formulaire : Page.ma l’utilise pour échanger avec vous sur votre demande ou votre inscription." },
    { q: "Comment inscrire mon activité ?", a: "Utilisez le formulaire prestataire et indiquez votre activité, votre ville et vos coordonnées. Page.ma vous contacte pour valider votre activité avant le lancement." },
  ],
  pro: [
    { q: "Comment m’inscrire comme prestataire ?", a: "Indiquez votre nom, votre activité, votre ville et vos coordonnées dans le formulaire. Page.ma vous contacte ensuite sur WhatsApp pour valider votre activité." },
    { q: "Faut-il fournir des documents à l’inscription ?", a: "Aucun document n’est demandé dans le formulaire de préinscription. La validation de votre activité se fait ensuite avec l’équipe Page.ma." },
    { q: "Comment recevoir les demandes des clients ?", a: "Les demandes correspondant à votre activité vous sont transmises sur WhatsApp. Veillez à renseigner un numéro sur lequel vous êtes joignable." },
    { q: "L’inscription nécessite-t-elle une carte bancaire ?", a: "Non. La préinscription ne nécessite pas de carte bancaire et est sans engagement. Le premier mois est offert aux premiers inscrits, dans la limite des places disponibles." },
  ],
  directory: [
    { q: "Comment trouver une agence pour mon besoin ?", a: "Choisissez un service pour afficher les agences qui le proposent, puis ouvrez leur fiche pour consulter leur présentation et leurs coordonnées." },
    { q: "Où consulter les services d’une agence ?", a: "Chaque fiche présente les services proposés et, lorsqu’elles sont disponibles, les prestations détaillées de l’agence." },
    { q: "Comment contacter une agence ?", a: "Utilisez les coordonnées affichées sur sa fiche. Si elles ne sont pas encore disponibles, contactez Page.ma sur WhatsApp pour demander une mise en relation." },
    { q: "Que faire si aucune agence ne propose le service recherché ?", a: "Vous pouvez consulter les autres services ou contacter Page.ma sur WhatsApp pour être orienté vers un prestataire adapté." },
  ],
  agency: [
    { q: "Quels services propose cette agence ?", a: "Consultez les rubriques « Services proposés » et « Prestations détaillées » de cette fiche pour connaître son activité." },
    { q: "Comment contacter cette agence ?", a: "Utilisez le téléphone ou le site web indiqué dans la rubrique Contact. Lorsque les coordonnées ne sont pas encore publiées, Page.ma peut vous mettre en relation sur WhatsApp." },
    { q: "Comment connaître le prix d’une prestation ?", a: "Contactez l’agence en précisant votre besoin, votre lieu et les dates souhaitées. Elle pourra vous informer sur ses tarifs et ses disponibilités." },
    { q: "Où se trouve cette agence ?", a: "Lorsqu’ils sont disponibles, son adresse et son emplacement sont affichés sur cette fiche. Confirmez directement avec l’agence sa zone d’intervention." },
  ],
  annuaire: [
    { q: "Quels services puis-je trouver à Marrakech ?", a: "Consultez les catégories de cette page pour trouver notamment des services de sécurité, nettoyage, jardinage, piscine et traiteur." },
    { q: "Comment demander un prestataire ?", a: "Remplissez le formulaire client en indiquant votre besoin et vos coordonnées. Page.ma étudie votre demande pour vous orienter vers les professionnels adaptés." },
    { q: "Comment se passe la mise en relation ?", a: "Page.ma échange avec vous sur WhatsApp pour préciser votre besoin et vous mettre en relation avec les prestataires concernés." },
    { q: "Je suis professionnel : comment rejoindre Page.ma ?", a: "Choisissez le parcours prestataire et renseignez votre activité et vos coordonnées. L’équipe vous contacte pour valider votre inscription." },
  ],
};

const ar: Record<FaqVariant, FaqItem[]> = {
  home: [
    { q: "لمن تُوجّه منصة Page.ma؟", a: "تربط Page.ma بين الزبناء الذين يبحثون عن خدمة والمهنيين الذين يقدّمونها في المغرب." },
    { q: "كيف أطلب عروض أسعار؟", a: "املأ استمارة الزبون وحدّد الخدمة والمدينة ومعلومات الاتصال. تتم دراسة طلبك لتوجيهك نحو مقدّمي الخدمات المناسبين، مع ما يصل إلى 3 عروض أسعار من مهنيين تم التحقق منهم." },
    { q: "كيف سيتم التواصل معي؟", a: "أدخل رقم واتساب صالحاً في الاستمارة. تستخدمه Page.ma للتواصل معك بشأن طلبك أو تسجيلك." },
    { q: "كيف أسجّل نشاطي؟", a: "املأ استمارة مقدّم الخدمات وحدّد نشاطك ومدينتك ومعلومات الاتصال. تتواصل معك Page.ma للتحقق من نشاطك قبل الإطلاق." },
  ],
  pro: [
    { q: "كيف أسجّل كمقدّم خدمات؟", a: "أدخل اسمك ونشاطك ومدينتك ومعلومات الاتصال في الاستمارة. تتواصل معك Page.ma بعد ذلك عبر واتساب للتحقق من نشاطك." },
    { q: "هل يجب تقديم وثائق عند التسجيل؟", a: "لا تُطلب أي وثيقة في استمارة التسجيل المسبق. يتم التحقق من نشاطك لاحقاً مع فريق Page.ma." },
    { q: "كيف أتوصّل بطلبات الزبناء؟", a: "تُرسل إليك الطلبات المناسبة لنشاطك عبر واتساب. تأكّد من إدخال رقم يمكن التواصل معك من خلاله." },
    { q: "هل أحتاج إلى بطاقة بنكية للتسجيل؟", a: "لا. التسجيل المسبق لا يتطلب بطاقة بنكية وهو بدون التزام. الشهر الأول مجاني لأوائل المسجّلين في حدود الأماكن المتاحة." },
  ],
  directory: [
    { q: "كيف أجد وكالة تناسب حاجتي؟", a: "اختر خدمة لعرض الوكالات التي تقدّمها، ثم افتح صفحة الوكالة للاطلاع على تقديمها ومعلومات الاتصال بها." },
    { q: "أين أجد خدمات الوكالة؟", a: "تعرض كل صفحة الخدمات التي تقدّمها الوكالة، والخدمات التفصيلية عندما تكون متاحة." },
    { q: "كيف أتواصل مع وكالة؟", a: "استخدم معلومات الاتصال المعروضة في صفحتها. إذا لم تكن متاحة بعد، تواصل مع Page.ma عبر واتساب لطلب الربط بالوكالة." },
    { q: "ماذا أفعل إذا لم أجد وكالة للخدمة المطلوبة؟", a: "يمكنك الاطلاع على الخدمات الأخرى أو التواصل مع Page.ma عبر واتساب لتوجيهك نحو مقدّم خدمة مناسب." },
  ],
  agency: [
    { q: "ما الخدمات التي تقدّمها هذه الوكالة؟", a: "اطّلع على قسمَي الخدمات المقدّمة والخدمات التفصيلية في هذه الصفحة لمعرفة نشاط الوكالة." },
    { q: "كيف أتواصل مع هذه الوكالة؟", a: "استخدم رقم الهاتف أو الموقع الإلكتروني في قسم الاتصال. إذا لم تُنشر المعلومات بعد، يمكن لـ Page.ma ربطك بالوكالة عبر واتساب." },
    { q: "كيف أعرف سعر الخدمة؟", a: "تواصل مع الوكالة وحدّد حاجتك ومكان الخدمة والتواريخ المطلوبة. ستخبرك بأسعارها ومدى توفّرها." },
    { q: "أين توجد هذه الوكالة؟", a: "يُعرض العنوان والموقع في هذه الصفحة عندما يكونان متاحين. تحقّق مباشرة مع الوكالة من منطقة تدخّلها." },
  ],
  annuaire: [
    { q: "ما الخدمات المتاحة في مراكش؟", a: "اطّلع على فئات هذه الصفحة للعثور خصوصاً على خدمات الأمن والنظافة والبستنة والمسابح وتموين الحفلات." },
    { q: "كيف أطلب مقدّم خدمة؟", a: "املأ استمارة الزبون وحدّد حاجتك ومعلومات الاتصال. تدرس Page.ma طلبك لتوجيهك نحو المهنيين المناسبين." },
    { q: "كيف تتم عملية الربط؟", a: "تتواصل معك Page.ma عبر واتساب لتوضيح حاجتك وربطك بمقدّمي الخدمات المعنيين." },
    { q: "أنا مهني، كيف أنضم إلى Page.ma؟", a: "اختر مسار مقدّم الخدمات وأدخل نشاطك ومعلومات الاتصال. يتواصل معك الفريق للتحقق من تسجيلك." },
  ],
};

export const FAQ_COPY: Record<Lang, { title: string; items: Record<FaqVariant, FaqItem[]> }> = {
  fr: { title: "QUESTIONS FRÉQUENTES", items: fr },
  ar: { title: "الأسئلة الشائعة", items: ar },
};