-- Agencies shown on /services and /services/<slug> (FR) and /ar/services (AR).
-- Edit rows in Supabase: only rows with published = true are visible on the site.
-- Leave phone / website / address / descriptions empty (NULL) until you have the real ones:
-- empty fields are simply not displayed.
CREATE TABLE public.agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  -- Absolute URL or a path under /public, e.g. /agencies/azur-protection.png
  logo_url TEXT,
  -- Short text on the card, full text on the detail page (French and Arabic).
  summary_fr TEXT,
  summary_ar TEXT,
  description_fr TEXT,
  description_ar TEXT,
  -- French service names, same values as the forms: Sécurité, Nettoyage, Jardinage, Piscine…
  services TEXT[] NOT NULL DEFAULT '{}',
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  -- Badges: official Page.ma partner / identity and activity checked by Page.ma.
  is_partner BOOLEAN NOT NULL DEFAULT false,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX agencies_services_idx ON public.agencies USING GIN (services);

ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;

-- Visitors can read published agencies only; nobody can write from the website.
CREATE POLICY "Published agencies are public"
  ON public.agencies FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE OR REPLACE FUNCTION public.agencies_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER agencies_updated_at
  BEFORE UPDATE ON public.agencies
  FOR EACH ROW EXECUTE FUNCTION public.agencies_touch_updated_at();

-- The five partners already shown on the site, from their own websites (checked 30/09/2026).
-- Generated from src/lib/agencies-seed.ts.
INSERT INTO public.agencies (slug, name, logo_url, summary_fr, summary_ar, description_fr, description_ar, services, phone, website, address, city, is_partner, is_verified, published, sort_order) VALUES
  ('asomovit-nettoyage',
   'Asomovit Nettoyage',
   '/agencies/asomovit-nettoyage.png',
   'Société de nettoyage à Marrakech depuis plus de 13 ans : bureaux, commerces, sites industriels et fins de chantier.',
   'شركة تنظيف في مراكش منذ أكثر من 13 سنة: المكاتب والمحلات التجارية والمواقع الصناعية وما بعد الأشغال.',
   'Depuis plus de 13 ans, Asomovit accompagne les entreprises de Marrakech pour le nettoyage et l''entretien de leurs locaux : bureaux, espaces commerciaux, hôtels, restaurants, magasins et sites logistiques.

Ses prestations couvrent le nettoyage de bureaux et d''espaces commerciaux, le nettoyage industriel, le traitement des sols, le nettoyage des vitres et le nettoyage de fin de chantier. Le service est disponible 24 h/24 et 7 j/7.',
   'منذ أكثر من 13 سنة، ترافق أسوموفيت الشركات في مراكش في تنظيف وصيانة مقرّاتها: المكاتب، الفضاءات التجارية، الفنادق، المطاعم، المتاجر والمواقع اللوجستية.

تشمل خدماتها تنظيف المكاتب والفضاءات التجارية، التنظيف الصناعي، معالجة الأرضيات، تنظيف الواجهات الزجاجية والتنظيف بعد الأشغال. الخدمة متوفرة 24 ساعة على 24 و7 أيام على 7.',
   ARRAY['Nettoyage']::TEXT[],
   '+212 661-622455',
   'https://www.asomovit.com/',
   '3ème étage, Bureau N°27, Immeuble 26, Bd Allal Al Fassi, Marrakech',
   'Marrakech',
   true,
   false,
   true,
   10),
  ('azur-protection',
   'Azur Protection',
   '/agencies/azur-protection.png',
   'Société de sécurité depuis 2005 : gardiennage, sécurité électronique, rondes, événementiel et protection rapprochée partout au Maroc.',
   'شركة أمن منذ 2005: الحراسة، الأمن الإلكتروني، الدوريات، تأمين التظاهرات والحماية المقرّبة في كل أنحاء المغرب.',
   'Depuis 2005, Azur Protection conçoit des solutions de sécurité sur mesure pour les entreprises, les institutions et les particuliers, partout au Maroc.

Ses métiers : sécurité physique (gardiennage, contrôle d''accès), sécurité électronique, rondes de sécurité, sécurité événementielle, protection rapprochée, ainsi que l''ingénierie et la formation, avec un centre de formation interne.',
   'منذ 2005، تصمّم أزور بروتكشن حلولاً أمنية حسب الطلب للشركات والمؤسسات والأفراد في كل أنحاء المغرب.

مجالات عملها: الأمن البشري (الحراسة ومراقبة الولوج)، الأمن الإلكتروني، الدوريات الأمنية، تأمين التظاهرات، الحماية المقرّبة، إضافة إلى الهندسة والتكوين عبر مركز تكوين داخلي.',
   ARRAY['Sécurité']::TEXT[],
   '+212 6 62 33 18 68',
   'https://www.azurprotection.ma/',
   'Sidi Moumen Jadid, Lot Warda 251, Rue 38, N°4, Casablanca',
   'Casablanca',
   true,
   false,
   true,
   20),
  ('s4u-safety-for-you',
   'S4U — Safety For You',
   '/agencies/s4u-safety-for-you.png',
   'Société de sécurité privée à Marrakech : gardiennage, vidéosurveillance, rondes, événementiel, protection rapprochée et sécurité incendie.',
   'شركة أمن خاص في مراكش: الحراسة، المراقبة بالفيديو، الدوريات، تأمين التظاهرات، الحماية المقرّبة والسلامة من الحرائق.',
   'Safety For You (S4U) est une société de sécurité privée basée à Marrakech, au service des particuliers, des entreprises et des organisateurs d''événements.

Ses prestations : sécurité physique et gardiennage, sécurité électronique et vidéosurveillance, rondes de sécurité, sécurité événementielle, protection rapprochée, ingénierie et formation en sécurité, et sécurité incendie. Téléphone fixe : +212 524 312 304.',
   'سيفتي فور يو (S4U) شركة أمن خاص مقرّها مراكش، في خدمة الأفراد والشركات ومنظّمي التظاهرات.

خدماتها: الأمن البشري والحراسة، الأمن الإلكتروني والمراقبة بالفيديو، الدوريات الأمنية، تأمين التظاهرات، الحماية المقرّبة، الهندسة والتكوين في مجال الأمن، والسلامة من الحرائق. الهاتف الثابت: ‎+212 524 312 304.',
   ARRAY['Sécurité']::TEXT[],
   '+212 661 319 512',
   'https://safetyforyou.ma/',
   '1er étage, Bureau 2, 38 Sidi Abbad 1, Marrakech 40000',
   'Marrakech',
   true,
   false,
   true,
   30),
  ('azur-facilities',
   'Azur Facilities',
   '/agencies/azur-facilities.png',
   'Société de nettoyage à Casablanca : résidences, bureaux et commerces, nettoyage industriel, fin de chantier et désinfection.',
   'شركة تنظيف في الدار البيضاء: المساكن، المكاتب والمحلات، التنظيف الصناعي، ما بعد الأشغال والتعقيم.',
   'Azur Facilities propose des solutions de nettoyage professionnel pour des espaces sains et agréables, chez les particuliers comme en entreprise, à Casablanca et partout au Maroc.

Ses prestations : nettoyage résidentiel, entretien de bureaux et d''espaces commerciaux, nettoyage industriel et de fin de chantier, désinfection et services spécialisés. Horaires : du lundi au vendredi de 8 h à 12 h et de 14 h 30 à 18 h 30, le samedi de 8 h à 12 h.',
   'تقدّم أزور فاسيليتيز حلول تنظيف احترافية لفضاءات صحية ومريحة، لدى الأفراد والشركات، في الدار البيضاء وفي كل أنحاء المغرب.

خدماتها: تنظيف المساكن، صيانة المكاتب والفضاءات التجارية، التنظيف الصناعي وما بعد الأشغال، التعقيم والخدمات المتخصصة. أوقات العمل: من الاثنين إلى الجمعة من 8 إلى 12 ومن 14:30 إلى 18:30، والسبت من 8 إلى 12.',
   ARRAY['Nettoyage']::TEXT[],
   '+212 6 62 33 18 68',
   'https://www.azurfacilities.com/',
   'N°4, Sidi Moumen Jadid, 251 Rue 38, Casablanca 20000',
   'Casablanca',
   true,
   false,
   true,
   40),
  ('asomovit-securite-privee',
   'Asomovit Sécurité Privée',
   '/agencies/asomovit-securite-privee.png',
   'Société de gardiennage à Marrakech depuis 2005, agréée par le Ministère de l''Intérieur et certifiée ISO 9001.',
   'شركة حراسة في مراكش منذ 2005، معتمدة من وزارة الداخلية وحاصلة على شهادة ISO 9001.',
   'Asomovit Sécu est une société de sécurité privée et de gardiennage basée à Marrakech depuis 2005. Elle est agréée par le Ministère de l''Intérieur et certifiée ISO 9001.

Ses prestations, pour les entreprises, les résidences et les événements : sécurité physique, sécurité électronique et vidéosurveillance, rondes et intervention sur alarme, sécurité événementielle et accueil, ingénierie et formation. Téléphone fixe : +212 524 44 66 33.',
   'أسوموفيت سيكو شركة أمن خاص وحراسة مقرّها مراكش منذ 2005، معتمدة من وزارة الداخلية وحاصلة على شهادة ISO 9001.

خدماتها للشركات والإقامات والتظاهرات: الأمن البشري، الأمن الإلكتروني والمراقبة بالفيديو، الدوريات والتدخل عند الإنذار، تأمين التظاهرات والاستقبال، الهندسة والتكوين. الهاتف الثابت: ‎+212 524 44 66 33.',
   ARRAY['Sécurité']::TEXT[],
   '+212 661-077668',
   'https://asomovitsecu.com/',
   'Résidence Jakar, 55 Bd Mohammed V, Bureau 32, Marrakech',
   'Marrakech',
   true,
   false,
   true,
   50);
