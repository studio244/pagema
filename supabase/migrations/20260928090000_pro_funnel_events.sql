-- Funnel tracking for the /pro campaign landing:
-- visits -> CTA clicks -> forms started -> forms submitted, per day and hero variant.
CREATE TABLE IF NOT EXISTS public.pro_funnel_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  event TEXT NOT NULL CHECK (event IN ('visit', 'cta_click', 'form_start', 'form_submit')),
  session_id TEXT NOT NULL CHECK (char_length(session_id) <= 64),
  hero_variant TEXT CHECK (char_length(hero_variant) <= 8),
  category TEXT CHECK (char_length(category) <= 80),
  city TEXT CHECK (char_length(city) <= 80),
  utm_source TEXT CHECK (char_length(utm_source) <= 120),
  utm_medium TEXT CHECK (char_length(utm_medium) <= 120),
  utm_campaign TEXT CHECK (char_length(utm_campaign) <= 200),
  utm_content TEXT CHECK (char_length(utm_content) <= 200)
);

CREATE INDEX IF NOT EXISTS pro_funnel_events_created_at_idx ON public.pro_funnel_events (created_at);

GRANT INSERT ON public.pro_funnel_events TO anon;
GRANT ALL ON public.pro_funnel_events TO service_role;
ALTER TABLE public.pro_funnel_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a funnel event" ON public.pro_funnel_events FOR INSERT TO anon WITH CHECK (true);

-- Daily funnel (Morocco time). Each step counts unique sessions.
CREATE OR REPLACE VIEW public.pro_funnel_daily
WITH (security_invoker = true) AS
SELECT
  (created_at AT TIME ZONE 'Africa/Casablanca')::date AS day,
  coalesce(hero_variant, 'a') AS hero_variant,
  count(DISTINCT session_id) FILTER (WHERE event = 'visit') AS visits,
  count(DISTINCT session_id) FILTER (WHERE event = 'cta_click') AS cta_clicks,
  count(DISTINCT session_id) FILTER (WHERE event = 'form_start') AS forms_started,
  count(DISTINCT session_id) FILTER (WHERE event = 'form_submit') AS forms_submitted
FROM public.pro_funnel_events
GROUP BY 1, 2
ORDER BY 1 DESC, 2;

REVOKE ALL ON public.pro_funnel_daily FROM anon, authenticated;
GRANT SELECT ON public.pro_funnel_daily TO service_role;
