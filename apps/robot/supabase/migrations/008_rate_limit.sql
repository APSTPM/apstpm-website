-- =============================================================================
-- Migration 008: Rate Limit Table, check_rate_limit Function, submission_id
-- =============================================================================
-- Idempotent: safe to run multiple times (IF NOT EXISTS / defensive blocks)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) Create rate_limits table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 2) Enable RLS, no policies (deny all)
-- -----------------------------------------------------------------------------
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 3) check_rate_limit function
-- -----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.check_rate_limit(TEXT, INT, INT);

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_action TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID;
  v_key TEXT;
  v_count INT;
  v_window_start TIMESTAMPTZ;
  v_reset_at TIMESTAMPTZ;
  v_remaining INT;
  v_allowed BOOLEAN;
  v_max_requests INT;
  v_window_seconds INT;
BEGIN
  -- Require authenticated user
  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Unauthorized' USING errcode = 'P0001';
  END IF;

  -- Allowlist actions (plan-specified)
  IF p_action NOT IN (
    'qa:create_post', 'qa:create_reply',
    'profile:save', 'profile:update',
    'admin:school:create', 'admin:school:update', 'admin:school:delete',
    'admin:category:create', 'admin:category:update', 'admin:category:delete',
    'admin:qa:toggle_pin', 'admin:qa:delete_post', 'admin:qa:delete_reply'
  ) THEN
    RAISE EXCEPTION 'invalid action: %', p_action USING errcode = 'P0002';
  END IF;

  -- Fixed per-action limits to prevent caller-controlled overrides
  CASE p_action
    WHEN 'qa:create_post' THEN
      v_max_requests := 5;
      v_window_seconds := 60;
    WHEN 'qa:create_reply' THEN
      v_max_requests := 10;
      v_window_seconds := 60;
    WHEN 'profile:save' THEN
      v_max_requests := 5;
      v_window_seconds := 60;
    WHEN 'profile:update' THEN
      v_max_requests := 5;
      v_window_seconds := 60;
    WHEN 'admin:school:create' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:school:update' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:school:delete' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:category:create' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:category:update' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:category:delete' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:qa:toggle_pin' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:qa:delete_post' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    WHEN 'admin:qa:delete_reply' THEN
      v_max_requests := 20;
      v_window_seconds := 60;
    ELSE
      RAISE EXCEPTION 'invalid action: %', p_action USING errcode = 'P0002';
  END CASE;

  v_key := p_action || ':' || v_uid::TEXT;

  -- Lazy cleanup: delete up to 20 expired rows (window older than 1 hour)
  DELETE FROM public.rate_limits
  WHERE key IN (
    SELECT key FROM public.rate_limits
    WHERE window_start < now() - interval '3600 seconds'
    LIMIT 20
  );

  -- Atomic upsert
  INSERT INTO public.rate_limits (key, count, window_start)
  VALUES (v_key, 1, now())
  ON CONFLICT (key) DO UPDATE SET
    count = CASE
      WHEN now() - public.rate_limits.window_start > (v_window_seconds || ' seconds')::interval
      THEN 1
      ELSE public.rate_limits.count + 1
    END,
    window_start = CASE
      WHEN now() - public.rate_limits.window_start > (v_window_seconds || ' seconds')::interval
      THEN now()
      ELSE public.rate_limits.window_start
    END
  RETURNING count, window_start INTO v_count, v_window_start;

  v_reset_at := v_window_start + (v_window_seconds || ' seconds')::interval;
  v_allowed := v_count <= v_max_requests;
  v_remaining := GREATEST(0, v_max_requests - v_count);

  RETURN jsonb_build_object(
    'allowed', v_allowed,
    'remaining', v_remaining,
    'reset_at', v_reset_at
  );
END;
$$;

-- -----------------------------------------------------------------------------
-- 4) Revoke all from PUBLIC, grant execute to authenticated only
-- -----------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.check_rate_limit(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT) TO authenticated;

-- -----------------------------------------------------------------------------
-- 5) Add submission_id to qa_posts and qa_replies
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_posts' AND column_name = 'submission_id'
  ) THEN
    ALTER TABLE public.qa_posts ADD COLUMN submission_id UUID;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_replies' AND column_name = 'submission_id'
  ) THEN
    ALTER TABLE public.qa_replies ADD COLUMN submission_id UUID;
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 6) Partial unique index: (author_id, submission_id) WHERE submission_id IS NOT NULL
-- -----------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS idx_qa_posts_author_submission
  ON public.qa_posts (author_id, submission_id)
  WHERE submission_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_qa_replies_author_submission
  ON public.qa_replies (author_id, submission_id)
  WHERE submission_id IS NOT NULL;
