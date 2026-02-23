'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, MessageCircleQuestion } from 'lucide-react';
import { Input } from '@apstpm-website/ui';
import QaPostCard, { type QaPost } from './QaPostCard';

type StatusFilter = 'all' | 'open' | 'answered';

interface QaListProps {
  posts: QaPost[];
  total: number;
}

export default function QaList({ posts, total: _total }: QaListProps) {
  const t = useTranslations('QA');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');

  const filters: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'open', label: t('filterOpen') },
    { key: 'answered', label: t('filterAnswered') },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === 'all' || post.status === activeFilter;
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeFilter === f.key
                  ? 'bg-white text-robot-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full sm:w-auto sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircleQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{t('noQuestions')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <QaPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
