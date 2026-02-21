-- Competition Categories table
CREATE TABLE public.competition_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default data
INSERT INTO public.competition_categories (name, name_en) VALUES
  ('VEXIQ', 'VEXIQ'),
  ('RIC創新挑戰賽', 'RIC Innovation Challenge'),
  ('EnjoyAI', 'EnjoyAI');

-- RLS
ALTER TABLE public.competition_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Competition categories are publicly readable"
  ON public.competition_categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert competition categories"
  ON public.competition_categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update competition categories"
  ON public.competition_categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete competition categories"
  ON public.competition_categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
