'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Badge, Button } from '@apstpm-website/ui';
import { CheckCircle, Pin, XCircle, Trash2, ExternalLink } from 'lucide-react';
import { markAsAnswered, togglePin, closePost, deletePost } from '@/lib/actions/qa';
import QaStatusBadge from '@/components/qa/QaStatusBadge';

interface AdminQaListProps {
  posts: any[];
}

export default function AdminQaList({ posts }: AdminQaListProps) {
  const t = useTranslations('Admin');
  const tQa = useTranslations('QA');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (action: () => Promise<void>, postId: string) => {
    setLoadingId(postId);
    try {
      await action();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoadingId(null);
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
                {post.author?.display_name || '匿名'} · {post.reply_count} {tQa('replyCount')} · {new Date(post.created_at).toLocaleDateString('zh-TW')}
              </p>
            </div>

            <Link href={`/qa/${post.id}` as any} className="shrink-0 text-gray-400 hover:text-robot-600">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {post.status === 'open' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction(() => markAsAnswered(post.id), post.id)}
                disabled={loadingId === post.id}
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                {t('markAnswered')}
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction(() => togglePin(post.id), post.id)}
              disabled={loadingId === post.id}
            >
              <Pin className="w-3.5 h-3.5 mr-1" />
              {t('togglePin')}
            </Button>
            {post.status !== 'closed' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction(() => closePost(post.id), post.id)}
                disabled={loadingId === post.id}
              >
                <XCircle className="w-3.5 h-3.5 mr-1" />
                {t('closePost')}
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                if (confirm(t('confirmDelete'))) {
                  handleAction(() => deletePost(post.id), post.id);
                }
              }}
              disabled={loadingId === post.id}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              {t('deletePost')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
