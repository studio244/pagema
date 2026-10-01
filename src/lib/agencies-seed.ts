import type { Agency } from "./agencies";

/**
 * The five partner agencies, from their own websites (checked 30/09/2026).
 * offerings_fr / offerings_ar: each agency's own list of services, as named on its site.
 * Same rows as the seed in supabase/migrations/20260930100000_agencies.sql, and used by the site
 * only while that table does not exist yet. Once it exists, edit agencies in Supabase instead.
 */
export const SEED_AGENCIES: Agency[] = [
  {
    slug: "asomovit-nettoyage",
    name: "Asomovit Nettoyage",
    logo_url: "/agencies/asomovit-nettoyage.png",
    summary_fr:
      "Société de nettoyage à Marrakech depuis plus de 13 ans : bureaux, commerces, sites industriels et fins de chantier.",
    summary_ar:
      "شركة تنظيف في مراكش منذ أكثر من 13 سنة: المكاتب والمحلات التجارية والمواقع الصناعية وما بعد الأشغال.",
    description_fr:
      "Depuis plus de 13 ans, Asomovit accompagne les entreprises de Marrakech pour le nettoyage et l'entretien de leurs locaux : bureaux, espaces commerciaux, hôtels, restaurants, magasins et sites logistiques.\n\nSes prestations couvrent le nettoyage de bureaux et d'espaces commerciaux, le nettoyage industriel, le traitement des sols, le nettoyage des vitres et le nettoyage de fin de chantier. Le service est disponible 24 h/24 et 7 j/7.",
    description_ar:
      "منذ أكثر من 13 سنة، ترافق أسوموفيت الشركات في مراكش في تنظيف وصيانة مقرّاتها: المكاتب، الفضاءات التجارية، الفنادق، المطاعم، المتاجر والمواقع اللوجستية.\n\nتشمل خدماتها تنظيف المكاتب والفضاءات التجارية، التنظيف الصناعي، معالجة الأرضيات، تنظيف الواجهات الزجاجية والتنظيف بعد الأشغال. الخدمة متوفرة 24 ساعة على 24 و7 أيام على 7.",
    services: ["Nettoyage"],
    offerings_fr: ["Nettoyage de bureaux et locaux professionnels","Nettoyage de commerces et boutiques","Nettoyage industriel","Nettoyage d'hôtels et restaurants","Nettoyage de fin de chantier","Nettoyage de vitres","Nettoyage et traitement des sols","Nettoyage de tapis, moquettes et meubles en tissu","Nettoyage ponctuel ou contrat d'entretien régulier"],
    offerings_ar: ["تنظيف المكاتب والمقرّات المهنية","تنظيف المحلات التجارية والمتاجر","التنظيف الصناعي","تنظيف الفنادق والمطاعم","التنظيف بعد الأشغال","تنظيف الواجهات الزجاجية","تنظيف ومعالجة الأرضيات","تنظيف الزرابي والموكيت والأثاث القماشي","تنظيف لمرة واحدة أو عقد صيانة منتظم"],
    phone: "+212 661-622455",
    website: "https://www.asomovit.com/",
    address: "3ème étage, Bureau N°27, Immeuble 26, Bd Allal Al Fassi, Marrakech",
    city: "Marrakech",
    is_partner: true,
    is_verified: false,
    clients_generated: 0,
  },
  {
    slug: "azur-protection",
    name: "Azur Protection",
    logo_url: "/agencies/azur-protection.png",
    summary_fr:
      "Société de sécurité depuis 2005 : gardiennage, sécurité électronique, rondes, événementiel et protection rapprochée partout au Maroc.",
    summary_ar:
      "شركة أمن منذ 2005: الحراسة، الأمن الإلكتروني، الدوريات، تأمين التظاهرات والحماية المقرّبة في كل أنحاء المغرب.",
    description_fr:
      "Depuis 2005, Azur Protection conçoit des solutions de sécurité sur mesure pour les entreprises, les institutions et les particuliers, partout au Maroc.\n\nSes métiers : sécurité physique (gardiennage, contrôle d'accès), sécurité électronique, rondes de sécurité, sécurité événementielle, protection rapprochée, ainsi que l'ingénierie et la formation, avec un centre de formation interne.",
    description_ar:
      "منذ 2005، تصمّم أزور بروتكشن حلولاً أمنية حسب الطلب للشركات والمؤسسات والأفراد في كل أنحاء المغرب.\n\nمجالات عملها: الأمن البشري (الحراسة ومراقبة الولوج)، الأمن الإلكتروني، الدوريات الأمنية، تأمين التظاهرات، الحماية المقرّبة، إضافة إلى الهندسة والتكوين عبر مركز تكوين داخلي.",
    services: ["Sécurité"],
    offerings_fr: ["Sécurité physique","Sécurité électronique","Patrouille de sécurité","Sécurité événementielle","Protection rapprochée","Ingénierie & formation"],
    offerings_ar: ["الأمن البشري","الأمن الإلكتروني","الدوريات الأمنية","تأمين التظاهرات","الحماية المقرّبة","الهندسة والتكوين"],
    phone: "+212 6 62 33 18 68",
    website: "https://www.azurprotection.ma/",
    address: "Sidi Moumen Jadid, Lot Warda 251, Rue 38, N°4, Casablanca",
    city: "Casablanca",
    is_partner: true,
    is_verified: false,
    clients_generated: 0,
  },
  {
    slug: "s4u-safety-for-you",
    name: "S4U (Safety For You)",
    logo_url: "/agencies/s4u-safety-for-you.png",
    summary_fr:
      "Société de sécurité privée à Marrakech : gardiennage, vidéosurveillance, rondes, événementiel, protection rapprochée et sécurité incendie.",
    summary_ar:
      "شركة أمن خاص في مراكش: الحراسة، المراقبة بالفيديو، الدوريات، تأمين التظاهرات، الحماية المقرّبة والسلامة من الحرائق.",
    description_fr:
      "Safety For You (S4U) est une société de sécurité privée basée à Marrakech, au service des particuliers, des entreprises et des organisateurs d'événements.\n\nSes prestations : sécurité physique et gardiennage, sécurité électronique et vidéosurveillance, rondes de sécurité, sécurité événementielle, protection rapprochée, ingénierie et formation en sécurité, et sécurité incendie. Téléphone fixe : +212 524 312 304.",
    description_ar:
      "سيفتي فور يو (S4U) شركة أمن خاص مقرّها مراكش، في خدمة الأفراد والشركات ومنظّمي التظاهرات.\n\nخدماتها: الأمن البشري والحراسة، الأمن الإلكتروني والمراقبة بالفيديو، الدوريات الأمنية، تأمين التظاهرات، الحماية المقرّبة، الهندسة والتكوين في مجال الأمن، والسلامة من الحرائق. الهاتف الثابت: ‎+212 524 312 304.",
    services: ["Sécurité"],
    offerings_fr: ["Sécurité physique : gardiennage résidentiel et sécurité professionnelle","Sécurité électronique et vidéosurveillance","Patrouille de sécurité","Sécurité événementielle","Protection rapprochée","Ingénierie & formation de sécurité","Sécurité incendie"],
    offerings_ar: ["الأمن البشري: حراسة المساكن وأمن الشركات","الأمن الإلكتروني والمراقبة بالفيديو","الدوريات الأمنية","تأمين التظاهرات","الحماية المقرّبة","الهندسة والتكوين في مجال الأمن","السلامة من الحرائق"],
    phone: "+212 661 319 512",
    website: "https://safetyforyou.ma/",
    address: "1er étage, Bureau 2, 38 Sidi Abbad 1, Marrakech 40000",
    city: "Marrakech",
    is_partner: true,
    is_verified: false,
    clients_generated: 0,
  },
  {
    slug: "azur-facilities",
    name: "Azur Facilities",
    logo_url: "/agencies/azur-facilities.png",
    summary_fr:
      "Société de nettoyage à Casablanca : résidences, bureaux et commerces, nettoyage industriel, fin de chantier et désinfection.",
    summary_ar:
      "شركة تنظيف في الدار البيضاء: المساكن، المكاتب والمحلات، التنظيف الصناعي، ما بعد الأشغال والتعقيم.",
    description_fr:
      "Azur Facilities propose des solutions de nettoyage professionnel pour des espaces sains et agréables, chez les particuliers comme en entreprise, à Casablanca et partout au Maroc.\n\nSes prestations : nettoyage résidentiel, entretien de bureaux et d'espaces commerciaux, nettoyage industriel et de fin de chantier, désinfection et services spécialisés. Horaires : du lundi au vendredi de 8 h à 12 h et de 14 h 30 à 18 h 30, le samedi de 8 h à 12 h.",
    description_ar:
      "تقدّم أزور فاسيليتيز حلول تنظيف احترافية لفضاءات صحية ومريحة، لدى الأفراد والشركات، في الدار البيضاء وفي كل أنحاء المغرب.\n\nخدماتها: تنظيف المساكن، صيانة المكاتب والفضاءات التجارية، التنظيف الصناعي وما بعد الأشغال، التعقيم والخدمات المتخصصة. أوقات العمل: من الاثنين إلى الجمعة من 8 إلى 12 ومن 14:30 إلى 18:30، والسبت من 8 إلى 12.",
    services: ["Nettoyage"],
    offerings_fr: ["Nettoyage de bureaux et espaces de travail","Entretien des commerces et boutiques","Nettoyage de fin de chantier","Entretien des résidences et copropriétés","Nettoyage pour hôtels et restaurants","Nettoyage industriel et entrepôts","Désinfection et nettoyage spécifique"],
    offerings_ar: ["تنظيف المكاتب وفضاءات العمل","صيانة المحلات التجارية والمتاجر","التنظيف بعد الأشغال","صيانة المساكن والملكيات المشتركة","تنظيف الفنادق والمطاعم","التنظيف الصناعي والمستودعات","التعقيم والتنظيف المتخصص"],
    phone: "+212 6 62 33 18 68",
    website: "https://www.azurfacilities.com/",
    address: "N°4, Sidi Moumen Jadid, 251 Rue 38, Casablanca 20000",
    city: "Casablanca",
    is_partner: true,
    is_verified: false,
    clients_generated: 0,
  },
  {
    slug: "asomovit-securite-privee",
    name: "Asomovit Sécurité Privée",
    logo_url: "/agencies/asomovit-securite-privee.png",
    summary_fr:
      "Société de gardiennage à Marrakech depuis 2005, agréée par le Ministère de l'Intérieur et certifiée ISO 9001.",
    summary_ar: "شركة حراسة في مراكش منذ 2005، معتمدة من وزارة الداخلية وحاصلة على شهادة ISO 9001.",
    description_fr:
      "Asomovit Sécu est une société de sécurité privée et de gardiennage basée à Marrakech depuis 2005. Elle est agréée par le Ministère de l'Intérieur et certifiée ISO 9001.\n\nSes prestations, pour les entreprises, les résidences et les événements : sécurité physique, sécurité électronique et vidéosurveillance, rondes et intervention sur alarme, sécurité événementielle et accueil, ingénierie et formation. Téléphone fixe : +212 524 44 66 33.",
    description_ar:
      "أسوموفيت سيكو شركة أمن خاص وحراسة مقرّها مراكش منذ 2005، معتمدة من وزارة الداخلية وحاصلة على شهادة ISO 9001.\n\nخدماتها للشركات والإقامات والتظاهرات: الأمن البشري، الأمن الإلكتروني والمراقبة بالفيديو، الدوريات والتدخل عند الإنذار، تأمين التظاهرات والاستقبال، الهندسة والتكوين. الهاتف الثابت: ‎+212 524 44 66 33.",
    services: ["Sécurité"],
    offerings_fr: ["Sécurité physique","Sécurité électronique et vidéosurveillance","Patrouille et intervention sur alarme","Sécurité événementielle et accueil","Ingénierie & formation"],
    offerings_ar: ["الأمن البشري","الأمن الإلكتروني والمراقبة بالفيديو","الدوريات والتدخل عند الإنذار","تأمين التظاهرات والاستقبال","الهندسة والتكوين"],
    phone: "+212 661-077668",
    website: "https://asomovitsecu.com/",
    address: "Résidence Jakar, 55 Bd Mohammed V, Bureau 32, Marrakech",
    city: "Marrakech",
    is_partner: true,
    is_verified: false,
    clients_generated: 0,
  },
];
