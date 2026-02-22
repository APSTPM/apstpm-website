'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';
import { notifyPostAuthor, notifyAdmins } from './notify';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 10000;
const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 30;
const QA_POST_RETURN_FIELDS = 'id, author_id, title, content, tags, status, pinned, created_at, updated_at, submission_id';
const QA_REPLY_RETURN_FIELDS = 'id, post_id, author_id, content, is_official, created_at, updated_at, submission_id';

async function requireAuth() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return { supabase, user };
}

async function requireAdmin() {
  const { supabase, user } = await requireAuth();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Forbidden');
  return { supabase, user };
}

function assertUuid(value: string | null | undefined, fieldName: string): string {
  if (!value || !UUID_REGEX.test(value)) {
    throw new Error(`${fieldName} is required and must be a valid UUID`);
  }
  return value;
}

async function updatePostStatusBasedOnLastReply(supabase: Awaited<ReturnType<typeof createServerClient>>, postId: string) {
  const { data: replies } = await supabase
    .from('qa_replies')
    .select('is_official')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  const lastReply = replies?.[replies.length - 1];
  const newStatus = lastReply?.is_official ? 'answered' : 'open';

  await supabase
    .from('qa_posts')
    .update({ status: newStatus })
    .eq('id', postId);
}

export async function createPost(formData: FormData) {
  const { supabase, user } = await requireAuth();

  await checkRateLimit(supabase, 'qa:create_post');

  const submissionId = assertUuid(formData.get('submissionId') as string, 'submissionId');

  const title = (formData.get('title') as string)?.trim();
  const content = (formData.get('content') as string)?.trim();
  const rawTags = formData.getAll('tags') as string[];
  const tags = rawTags
    .map(t => t.trim().slice(0, MAX_TAG_LENGTH))
    .filter(Boolean)
    .slice(0, MAX_TAGS);

  if (!title || title.length > MAX_TITLE_LENGTH) {
    throw new Error(`Title is required and must be under ${MAX_TITLE_LENGTH} characters`);
  }
  if (!content || content.length > MAX_CONTENT_LENGTH) {
    throw new Error(`Content is required and must be under ${MAX_CONTENT_LENGTH} characters`);
  }

  const { data, error } = await supabase
    .from('qa_posts')
    .insert({ author_id: user.id, title, content, tags, submission_id: submissionId })
    .select(QA_POST_RETURN_FIELDS)
    .single();

  if (error) {
    if (error.code === '23505') {
      const { data: existing } = await supabase
        .from('qa_posts')
        .select(QA_POST_RETURN_FIELDS)
        .eq('author_id', user.id)
        .eq('submission_id', submissionId)
        .single();
      if (existing) {
        revalidatePath('/qa');
        return existing;
      }
    }
    console.error('Failed to create qa post:', error);
    throw new Error('Failed to create post. Please try again later.');
  }

  if (data) notifyAdmins(data.id, title).catch(console.error);
  revalidatePath('/qa');

  return data!;
}

export async function createReply(formData: FormData) {
  const { supabase, user } = await requireAuth();

  await checkRateLimit(supabase, 'qa:create_reply');

  const submissionId = assertUuid(formData.get('submissionId') as string, 'submissionId');
  const postId = assertUuid(formData.get('postId') as string, 'postId');
  const content = (formData.get('content') as string)?.trim();
  if (!content || content.length > MAX_CONTENT_LENGTH) {
    throw new Error(`Reply content is required and must be under ${MAX_CONTENT_LENGTH} characters`);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isOfficial = profile?.role === 'admin';

  const { data, error } = await supabase
    .from('qa_replies')
    .insert({ post_id: postId, author_id: user.id, content, is_official: isOfficial, submission_id: submissionId })
    .select(QA_REPLY_RETURN_FIELDS)
    .single();

  if (error) {
    if (error.code === '23505') {
      const { data: existing } = await supabase
        .from('qa_replies')
        .select(QA_REPLY_RETURN_FIELDS)
        .eq('author_id', user.id)
        .eq('submission_id', submissionId)
        .single();
      if (existing) {
        await updatePostStatusBasedOnLastReply(supabase, postId);
        revalidatePath(`/qa/${postId}`);
        revalidatePath('/qa');
        return existing;
      }
    }
    console.error('Failed to create qa reply:', error);
    throw new Error('Failed to create reply. Please try again later.');
  }

  if (data) notifyPostAuthor(postId, data.id).catch(console.error);

  await updatePostStatusBasedOnLastReply(supabase, postId);
  revalidatePath(`/qa/${postId}`);
  revalidatePath('/qa');

  return data;
}

export async function togglePin(postId: string) {
  assertUuid(postId, 'postId');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:qa:toggle_pin');

  const { data: post } = await supabase
    .from('qa_posts')
    .select('pinned')
    .eq('id', postId)
    .single();

  const { error } = await supabase
    .from('qa_posts')
    .update({ pinned: !(post?.pinned ?? false) })
    .eq('id', postId);

  if (error) {
    console.error('Failed to toggle qa post pin:', error);
    throw new Error('Failed to update post. Please try again later.');
  }
  revalidatePath(`/qa/${postId}`);
  revalidatePath('/qa');
}

export async function deletePost(postId: string) {
  assertUuid(postId, 'postId');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:qa:delete_post');

  const { error } = await supabase
    .from('qa_posts')
    .delete()
    .eq('id', postId);

  if (error) {
    console.error('Failed to delete qa post:', error);
    throw new Error('Failed to delete post. Please try again later.');
  }
  revalidatePath('/qa');
}

export async function deleteReply(replyId: string, postId: string) {
  assertUuid(replyId, 'replyId');
  assertUuid(postId, 'postId');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:qa:delete_reply');

  const { error } = await supabase
    .from('qa_replies')
    .delete()
    .eq('id', replyId);

  if (error) {
    console.error('Failed to delete qa reply:', error);
    throw new Error('Failed to delete reply. Please try again later.');
  }
  
  // 根據最後回覆自動更新帖子狀態
  await updatePostStatusBasedOnLastReply(supabase, postId);
  
  revalidatePath(`/qa/${postId}`);
  revalidatePath('/qa');
}
