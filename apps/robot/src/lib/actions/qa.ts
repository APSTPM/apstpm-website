'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';
import { notifyPostAuthor, notifyAdmins } from './notify';

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 10000;
const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 30;

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
    .insert({ author_id: user.id, title, content, tags })
    .select()
    .single();

  if (error) throw error;

  if (data) notifyAdmins(data.id, title).catch(console.error);
  revalidatePath('/qa');

  return data!;
}

export async function createReply(formData: FormData) {
  const { supabase, user } = await requireAuth();

  const postId = formData.get('postId') as string;
  const content = (formData.get('content') as string)?.trim();

  if (!postId) throw new Error('Post ID is required');
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
    .insert({ post_id: postId, author_id: user.id, content, is_official: isOfficial })
    .select()
    .single();

  if (error) throw error;

  if (data) notifyPostAuthor(postId, data.id).catch(console.error);
  
  // 根據最後回覆自動更新帖子狀態
  await updatePostStatusBasedOnLastReply(supabase, postId);
  
  revalidatePath(`/qa/${postId}`);
  revalidatePath('/qa');

  return data;
}

export async function togglePin(postId: string) {
  const { supabase } = await requireAdmin();

  const { data: post } = await supabase
    .from('qa_posts')
    .select('pinned')
    .eq('id', postId)
    .single();

  const { error } = await supabase
    .from('qa_posts')
    .update({ pinned: !(post?.pinned ?? false) })
    .eq('id', postId);

  if (error) throw error;
  revalidatePath(`/qa/${postId}`);
  revalidatePath('/qa');
}

export async function deletePost(postId: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from('qa_posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
  revalidatePath('/qa');
}

export async function deleteReply(replyId: string, postId: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from('qa_replies')
    .delete()
    .eq('id', replyId);

  if (error) throw error;
  
  // 根據最後回覆自動更新帖子狀態
  await updatePostStatusBasedOnLastReply(supabase, postId);
  
  revalidatePath(`/qa/${postId}`);
  revalidatePath('/qa');
}
