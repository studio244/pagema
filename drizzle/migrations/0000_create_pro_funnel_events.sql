CREATE TABLE public.pro_funnel_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event text NOT NULL,
  session_id text NOT NULL,
  hero_variant text,
  category text,
  city text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text
);

GRANT INSERT ON public.pro_funnel_events TO anon, authenticated;
GRANT ALL ON public.pro_funnel_events TO service_role;

ALTER TABLE public.pro_funnel_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record funnel events"
  ON public.pro_funnel_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);