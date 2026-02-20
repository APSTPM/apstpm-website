import { createServerClient } from '@apstpm/database/server';

// TODO(Phase 3): Replace with CMS API

export interface QaFilters {
  status?: 'open' | 'answered';
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getPosts(filters: QaFilters = {}) {
  const supabase = await createServerClient();
  const { status, search, page = 1, pageSize = 20 } = filters;

  let query = supabase
    .from('qa_posts')
    .select('*, author:profiles!author_id(id, display_name, avatar_url, role, real_name, user_type, school:schools!school_id(code, name))', { count: 'exact' })
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (status) {
    query = query.eq('status', status);
  }

  if (search) {
    const sanitized = search.replace(/[,%()\\]/g, '');
    if (sanitized) {
      query = query.or(`title.ilike.%${sanitized}%,content.ilike.%${sanitized}%`);
    }
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    posts: data ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function getPostById(id: string) {
  const supabase = await createServerClient();

  const [postResult, repliesResult] = await Promise.all([
    supabase
      .from('qa_posts')
      .select('*, author:profiles!author_id(id, display_name, avatar_url, role, real_name, user_type, school:schools!school_id(code, name))')
      .eq('id', id)
      .single(),
    supabase
      .from('qa_replies')
      .select('*, author:profiles!author_id(id, display_name, avatar_url, role, real_name, user_type, school:schools!school_id(code, name))')
      .eq('post_id', id)
      .order('created_at', { ascending: true }),
  ]);

  if (postResult.error) throw postResult.error;

  return {
    post: postResult.data,
    replies: repliesResult.data ?? [],
  };
}

export async function getPostStats() {
  const supabase = await createServerClient();

  const [totalResult, openResult, answeredResult, todayResult] = await Promise.all([
    supabase.from('qa_posts').select('*', { count: 'exact', head: true }),
    supabase.from('qa_posts').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('qa_posts').select('*', { count: 'exact', head: true }).eq('status', 'answered'),
    supabase.from('qa_posts').select('*', { count: 'exact', head: true }).gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
  ]);

  return {
    total: totalResult.count ?? 0,
    open: openResult.count ?? 0,
    answered: answeredResult.count ?? 0,
    today: todayResult.count ?? 0,
  };
}
