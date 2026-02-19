ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS user_type TEXT CHECK (user_type IN ('teacher', 'student'));
