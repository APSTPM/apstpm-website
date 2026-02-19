'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@apstpm-website/ui';
import { Shield, Clock } from 'lucide-react';
import QaStatusBadge from './QaStatusBadge';

interface Reply {
  id: string;
  content: string;
  is_official: boolean;
  created_at: string;
  author: {
    display_name: string | null;
    avatar_url: string | null;
    role: string;
  } | null;
}

interface QaDetailProps {
  post: {
    id: string;
    title: string;
    content: string;
    status: 'open' | 'answered' | 'closed';
    pinned: boolean;
    tags: string[];
    created_at: string;
    author: {
      display_name: string | null;
      avatar_url: string | null;
    } | null;
  };
  replies: Reply[];
}

export default function QaDetail({ post, replies }: QaDetailProps) {
  const t = useTranslations('QA');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Post */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <QaStatusBadge status={post.status} />
            {post.pinned && (
              <Badge variant="outline" className="text-amber-600 border-amber-300">
                {t('pinned')}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {post.content}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              {post.author?.avatar_url ? (
                <img src={post.author.avatar_url} alt="" className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-robot-100 flex items-center justify-center text-robot-600 text-xs font-bold">
                  {(post.author?.display_name || '?')[0].toUpperCase()}
                </div>
              )}
              <span>{post.author?.display_name || '匿名'}</span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(post.created_at)}
            </span>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t('replies')} ({replies.length})
        </h2>
        {replies.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('noReplies')}</p>
        ) : (
          <div className="space-y-3">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className={`p-5 rounded-xl border ${
                  reply.is_official
                    ? 'bg-robot-50/50 border-robot-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                {reply.is_official && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Shield className="w-4 h-4 text-robot-600" />
                    <span className="text-sm font-medium text-robot-700">{t('officialReply')}</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                  {reply.content}
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {reply.author?.avatar_url ? (
                      <img src={reply.author.avatar_url} alt="" className="w-5 h-5 rounded-full" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold">
                        {(reply.author?.display_name || '?')[0].toUpperCase()}
                      </div>
                    )}
                    <span>{reply.author?.display_name || '匿名'}</span>
                    {reply.author?.role === 'admin' && (
                      <Badge variant="default" className="text-xs py-0">Admin</Badge>
                    )}
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(reply.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
