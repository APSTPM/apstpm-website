-- Extend profiles with additional fields
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS real_name TEXT,
ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS user_type TEXT CHECK (user_type IN ('teacher', 'student')),
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN NOT NULL DEFAULT false;

-- Add index on school_id for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_school_id ON public.profiles(school_id);

-- Add index on user_type for filtering
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);
