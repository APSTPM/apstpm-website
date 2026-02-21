-- Rule Versions table
CREATE TABLE public.rule_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  changelog TEXT NOT NULL DEFAULT '',
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_rule_versions_published ON public.rule_versions(published_at DESC);

-- RLS
ALTER TABLE public.rule_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rule versions are publicly readable"
  ON public.rule_versions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage rule versions"
  ON public.rule_versions FOR ALL
  USING (public.is_admin());
