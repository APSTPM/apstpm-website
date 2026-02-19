-- QA Posts
CREATE TABLE public.qa_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
  pinned BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  reply_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- QA Replies
CREATE TABLE public.qa_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.qa_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_qa_posts_status ON public.qa_posts(status);
CREATE INDEX idx_qa_posts_author ON public.qa_posts(author_id);
CREATE INDEX idx_qa_posts_pinned ON public.qa_posts(pinned DESC, created_at DESC);
CREATE INDEX idx_qa_replies_post ON public.qa_replies(post_id);

-- Auto-update reply_count trigger
CREATE OR REPLACE FUNCTION public.update_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.qa_posts SET reply_count = reply_count + 1, updated_at = now() WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.qa_posts SET reply_count = reply_count - 1, updated_at = now() WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_reply_change
  AFTER INSERT OR DELETE ON public.qa_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_reply_count();

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_posts
  BEFORE UPDATE ON public.qa_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at_replies
  BEFORE UPDATE ON public.qa_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- RLS for qa_posts
ALTER TABLE public.qa_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are publicly readable"
  ON public.qa_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON public.qa_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts"
  ON public.qa_posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Admins can update any post"
  ON public.qa_posts FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete posts"
  ON public.qa_posts FOR DELETE
  USING (public.is_admin());

-- RLS for qa_replies
ALTER TABLE public.qa_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Replies are publicly readable"
  ON public.qa_replies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON public.qa_replies FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own replies"
  ON public.qa_replies FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Admins can update any reply"
  ON public.qa_replies FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete replies"
  ON public.qa_replies FOR DELETE
  USING (public.is_admin());
