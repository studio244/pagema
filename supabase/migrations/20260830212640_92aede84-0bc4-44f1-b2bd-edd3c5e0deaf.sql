CREATE TABLE public.preregistrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  profile TEXT NOT NULL DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.preregistrations TO anon;
GRANT ALL ON public.preregistrations TO service_role;
ALTER TABLE public.preregistrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can preregister" ON public.preregistrations FOR INSERT TO anon WITH CHECK (true);