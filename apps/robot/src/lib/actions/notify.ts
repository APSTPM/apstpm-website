'use server';

import { createServerClient } from '@apstpm/database/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function notifyPostAuthor(postId: string, replyId: string) {
  try {
    const supabase = await createServerClient();

    const { data: post } = await supabase
      .from('qa_posts')
      .select('title, author_id, author:profiles!author_id(email, display_name)')
      .eq('id', postId)
      .single() as { data: { title: string; author_id: string; author: { email: string | null; display_name: string | null } | null } | null };

    if (!post?.author?.email) return;

    const { data: reply } = await supabase
      .from('qa_replies')
      .select('content, author:profiles!author_id(display_name, role)')
      .eq('id', replyId)
      .single() as { data: { content: string; author: { display_name: string | null; role: string } | null } | null };

    if (!reply) return;

    const safeTitle = escapeHtml(post.title);
    const safeName = escapeHtml(reply.author?.display_name || '匿名用戶');
    const safeContent = escapeHtml(reply.content);

    const { sendEmail } = await import('@/lib/email/resend');
    await sendEmail({
      to: post.author.email,
      subject: `您的問題「${post.title}」有新回覆`,
      html: `
        <h2>您的問題有新回覆</h2>
        <p><strong>問題：</strong>${safeTitle}</p>
        <p><strong>回覆者：</strong>${safeName}${reply.author?.role === 'admin' ? ' (官方)' : ''}</p>
        <p><strong>回覆內容：</strong></p>
        <blockquote style="border-left: 3px solid #3b82f6; padding-left: 12px; color: #374151;">${safeContent}</blockquote>
        <p><a href="${SITE_URL}/qa/${encodeURIComponent(postId)}" style="color: #3b82f6;">查看完整回覆</a></p>
      `,
    });
  } catch (error) {
    console.error('Failed to notify post author:', error);
  }
}

export async function notifyAdmins(_postId: string, title: string) {
  try {
    const supabase = await createServerClient();

    const { data: admins } = await supabase
      .from('profiles')
      .select('email')
      .eq('role', 'admin');

    if (!admins?.length) return;

    const adminEmails = admins.map(a => a.email).filter(Boolean) as string[];
    if (!adminEmails.length) return;

    const safeTitle = escapeHtml(title);
    const { sendEmail } = await import('@/lib/email/resend');
    await sendEmail({
      to: adminEmails,
      subject: `新的賽規問題：${title}`,
      html: `
        <h2>有新的賽規問題需要回覆</h2>
        <p><strong>問題：</strong>${safeTitle}</p>
        <p><a href="${SITE_URL}/admin/qa" style="color: #3b82f6;">前往管理面板查看</a></p>
      `,
    });
  } catch (error) {
    console.error('Failed to notify admins:', error);
  }
}
