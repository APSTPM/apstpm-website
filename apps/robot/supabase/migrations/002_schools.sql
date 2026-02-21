-- Schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schools are publicly readable"
  ON public.schools FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify schools"
  ON public.schools FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
