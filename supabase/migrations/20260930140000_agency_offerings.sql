-- Each agency's own detailed services (as named on its website), shown on /services/<slug>.
-- "services" stays the list of Page.ma categories used by the filter (Sécurité, Nettoyage…).
-- Apply after 20260930100000_agencies.sql. Generated from src/lib/agencies-seed.ts.

ALTER TABLE public.agencies
  ADD COLUMN IF NOT EXISTS offerings_fr TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS offerings_ar TEXT[] NOT NULL DEFAULT '{}';

UPDATE public.agencies SET
  offerings_fr = ARRAY['Nettoyage de bureaux et locaux professionnels', 'Nettoyage de commerces et boutiques', 'Nettoyage industriel', 'Nettoyage d''hôtels et restaurants', 'Nettoyage de fin de chantier', 'Nettoyage de vitres', 'Nettoyage et traitement des sols', 'Nettoyage de tapis, moquettes et meubles en tissu', 'Nettoyage ponctuel ou contrat d''entretien régulier']::TEXT[],
  offerings_ar = ARRAY['تنظيف المكاتب والمقرّات المهنية', 'تنظيف المحلات التجارية والمتاجر', 'التنظيف الصناعي', 'تنظيف الفنادق والمطاعم', 'التنظيف بعد الأشغال', 'تنظيف الواجهات الزجاجية', 'تنظيف ومعالجة الأرضيات', 'تنظيف الزرابي والموكيت والأثاث القماشي', 'تنظيف لمرة واحدة أو عقد صيانة منتظم']::TEXT[]
WHERE slug = 'asomovit-nettoyage';

UPDATE public.agencies SET
  offerings_fr = ARRAY['Sécurité physique', 'Sécurité électronique', 'Patrouille de sécurité', 'Sécurité événementielle', 'Protection rapprochée', 'Ingénierie & formation']::TEXT[],
  offerings_ar = ARRAY['الأمن البشري', 'الأمن الإلكتروني', 'الدوريات الأمنية', 'تأمين التظاهرات', 'الحماية المقرّبة', 'الهندسة والتكوين']::TEXT[]
WHERE slug = 'azur-protection';

UPDATE public.agencies SET
  offerings_fr = ARRAY['Sécurité physique : gardiennage résidentiel et sécurité professionnelle', 'Sécurité électronique et vidéosurveillance', 'Patrouille de sécurité', 'Sécurité événementielle', 'Protection rapprochée', 'Ingénierie & formation de sécurité', 'Sécurité incendie']::TEXT[],
  offerings_ar = ARRAY['الأمن البشري: حراسة المساكن وأمن الشركات', 'الأمن الإلكتروني والمراقبة بالفيديو', 'الدوريات الأمنية', 'تأمين التظاهرات', 'الحماية المقرّبة', 'الهندسة والتكوين في مجال الأمن', 'السلامة من الحرائق']::TEXT[]
WHERE slug = 's4u-safety-for-you';

UPDATE public.agencies SET
  offerings_fr = ARRAY['Nettoyage de bureaux et espaces de travail', 'Entretien des commerces et boutiques', 'Nettoyage de fin de chantier', 'Entretien des résidences et copropriétés', 'Nettoyage pour hôtels et restaurants', 'Nettoyage industriel et entrepôts', 'Désinfection et nettoyage spécifique']::TEXT[],
  offerings_ar = ARRAY['تنظيف المكاتب وفضاءات العمل', 'صيانة المحلات التجارية والمتاجر', 'التنظيف بعد الأشغال', 'صيانة المساكن والملكيات المشتركة', 'تنظيف الفنادق والمطاعم', 'التنظيف الصناعي والمستودعات', 'التعقيم والتنظيف المتخصص']::TEXT[]
WHERE slug = 'azur-facilities';

UPDATE public.agencies SET
  offerings_fr = ARRAY['Sécurité physique', 'Sécurité électronique et vidéosurveillance', 'Patrouille et intervention sur alarme', 'Sécurité événementielle et accueil', 'Ingénierie & formation']::TEXT[],
  offerings_ar = ARRAY['الأمن البشري', 'الأمن الإلكتروني والمراقبة بالفيديو', 'الدوريات والتدخل عند الإنذار', 'تأمين التظاهرات والاستقبال', 'الهندسة والتكوين']::TEXT[]
WHERE slug = 'asomovit-securite-privee';
