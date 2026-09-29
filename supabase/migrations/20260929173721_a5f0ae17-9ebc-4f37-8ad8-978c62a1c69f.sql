DROP POLICY "Anyone can preregister" ON public.preregistrations;
CREATE POLICY "Anyone can submit a valid preregistration" ON public.preregistrations
FOR INSERT TO anon, authenticated
WITH CHECK (
  profile IN ('client','prestataire')
  AND length(coalesce(full_name,'')) <= 120
  AND length(coalesce(email,'')) <= 160
  AND length(phone) BETWEEN 6 AND 40
  AND length(city) BETWEEN 1 AND 80
  AND length(category) BETWEEN 1 AND 80
);