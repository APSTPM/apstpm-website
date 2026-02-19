'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MessageSquare, Pin, Clock } from 'lucide-react';
import { formatAuthor } from '@/lib/utils/author';
import QaStatusBadge from './QaStatusBadge';

interface QaPostCardProps {
  post: {
    id: string;
    title: string;
    status: 'open' | 'answered' | 'closed';
    pinned: boolean;
    reply_count: number;
    created_at: string;
    author: {
      display_name: string | null;
      avatar_url: string | null;
      real_name: string | null;
      role: string;
      user_type: 'teacher' | 'student' | null;
      school: { code: string; name: string } | null;
    } | null;
  };
}

export default function QaPostCard({ post }: QaPostCardProps) {
  const t = useTranslations('QA');

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <Link href={`/qa/${post.id}` as any} className="block">
      <div className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 hover:border-robot-300 hover:shadow-md transition-all group">
        <div className="flex items-start gap-3">
          {/* Author avatar */}
          <div className="shrink-0 mt-0.5">
            {post.author?.avatar_url ? (
              <img src={post.author.avatar_url} alt="" className="w-9 h-9 rounded-full" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-robot-100 flex items-center justify-center text-robot-600 text-sm font-bold">
                {(post.author?.display_name || '?')[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {post.pinned && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                  <Pin className="w-3 h-3" />
                  {t('pinned')}
                </span>
              )}
              <QaStatusBadge status={post.status} />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-robot-700 transition-colors truncate">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{formatAuthor(post.author as any)}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {timeAgo(post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {post.reply_count} {t('replyCount')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
