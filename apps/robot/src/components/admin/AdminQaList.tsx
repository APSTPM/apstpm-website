'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Badge, Button, toast } from '@apstpm-website/ui';
import { Pin, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { togglePin, deletePost } from '@/lib/actions/qa';
import { formatAuthor, type AuthorInfo } from '@/lib/utils/author';
import { formatDateBeijing } from '@/lib/utils/date';
import QaStatusBadge from '@/components/qa/QaStatusBadge';

interface QaPostItem {
  id: string;
  title: string;
  status: 'open' | 'answered';
  pinned: boolean;
  reply_count: number;
  created_at: string;
  author: AuthorInfo | null;
}

interface AdminQaListProps {
  posts: QaPostItem[];
}

export default function AdminQaList({ posts }: AdminQaListProps) {
  const t = useTranslations('Admin');
  const tQa = useTranslations('QA');
  const [loadingState, setLoadingState] = useState<{ postId: string; action: 'pin' | 'delete' } | null>(null);

  const handleTogglePin = async (postId: string) => {
    setLoadingState({ postId, action: 'pin' });
    try {
      await togglePin(postId);
      toast.success(t('pinToggled'));
    } catch (error) {
      console.error('Toggle pin failed:', error);
      toast.error(t('categoryError'));
    } finally {
      setLoadingState(null);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setLoadingState({ postId, action: 'delete' });
    try {
      await deletePost(postId);
      toast.success(t('postDeleted'));
    } catch (error) {
      console.error('Delete post failed:', error);
      toast.error(t('categoryError'));
    } finally {
      setLoadingState(null);
    }
  };

  if (posts.length === 0) {
    return <p className="text-center text-gray-500 py-8">{tQa('noQuestions')}</p>;
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <QaStatusBadge status={post.status} />
                {post.pinned && (
                  <Badge variant="outline" className="text-amber-600 border-amber-300 text-xs">
                    {tQa('pinned')}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {formatAuthor(post.author)} · {post.reply_count} {tQa('replyCount')} · {formatDateBeijing(post.created_at)}
              </p>
            </div>

            <Link href={`/qa/${post.id}`} className="shrink-0 text-gray-400 hover:text-robot-600">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleTogglePin(post.id)}
              disabled={loadingState?.postId === post.id}
            >
              {loadingState?.postId === post.id && loadingState?.action === 'pin' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  {t('processing')}
                </>
              ) : (
                <>
                  <Pin className="w-3.5 h-3.5 mr-1" />
                  {t('togglePin')}
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(post.id)}
              disabled={loadingState?.postId === post.id}
            >
              {loadingState?.postId === post.id && loadingState?.action === 'delete' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  {t('deleting')}
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  {t('deletePost')}
                </>
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
