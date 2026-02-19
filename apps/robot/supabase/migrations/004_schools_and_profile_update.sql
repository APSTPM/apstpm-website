-- Schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schools are publicly readable"
  ON public.schools FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert schools"
  ON public.schools FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update schools"
  ON public.schools FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete schools"
  ON public.schools FOR DELETE
  USING (public.is_admin());

-- Add columns to profiles
ALTER TABLE public.profiles
  ADD COLUMN real_name TEXT,
  ADD COLUMN school_id UUID REFERENCES public.schools(id),
  ADD COLUMN user_type TEXT CHECK (user_type IN ('teacher', 'student')),
  ADD COLUMN profile_completed BOOLEAN NOT NULL DEFAULT false;

-- Users can already update their own profile (policy from 001); the new columns
-- real_name, school_id, user_type, profile_completed are included in that update.
