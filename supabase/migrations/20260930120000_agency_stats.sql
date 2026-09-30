-- Numbers shown on each agency page (/services/<slug>):
--   * "Clients générés par Page.ma": entered by hand in agencies.clients_generated
--   * "Demandes de contact via Page.ma": counted automatically, one per visitor and agency,
--     when someone clicks Call / the phone number / the website / WhatsApp on the agency page.
-- Apply after 20260930100000_agencies.sql.

ALTER TABLE public.agencies
  ADD COLUMN IF NOT EXISTS clients_generated INTEGER NOT NULL DEFAULT 0
  CHECK (clients_generated >= 0);

CREATE TABLE public.agency_contact_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  agency_slug TEXT NOT NULL REFERENCES public.agencies (slug) ON UPDATE CASCADE ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('phone', 'website', 'whatsapp')),
  -- Random id kept in the visitor's browser: several clicks by the same visitor count once.
  visitor_id TEXT NOT NULL CHECK (char_length(visitor_id) BETWEEN 8 AND 64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX agency_contact_events_slug_idx ON public.agency_contact_events (agency_slug);

ALTER TABLE public.agency_contact_events ENABLE ROW LEVEL SECURITY;

-- Visitors can only add events for published agencies; nobody can read the raw rows.
CREATE POLICY "Visitors can log a contact on a published agency"
  ON public.agency_contact_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.agencies a WHERE a.slug = agency_slug AND a.published)
  );

-- Public totals only: number of distinct visitors who contacted each published agency.
CREATE OR REPLACE FUNCTION public.agency_contact_counts()
RETURNS TABLE (agency_slug TEXT, contacts BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT e.agency_slug, COUNT(DISTINCT e.visitor_id)
  FROM public.agency_contact_events e
  JOIN public.agencies a ON a.slug = e.agency_slug AND a.published
  GROUP BY e.agency_slug;
$$;

REVOKE ALL ON FUNCTION public.agency_contact_counts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.agency_contact_counts() TO anon, authenticated;
