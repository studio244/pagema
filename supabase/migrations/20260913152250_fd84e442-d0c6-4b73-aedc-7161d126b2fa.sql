ALTER TABLE public.preregistrations
  ADD COLUMN IF NOT EXISTS company_name text,
  ADD COLUMN IF NOT EXISTS team_size text,
  ADD COLUMN IF NOT EXISTS need_details text,
  ADD COLUMN IF NOT EXISTS health_entity_type text;