'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Paperclip, Calendar } from 'lucide-react';
import { type Announcement } from '@/lib/content';
import { Badge } from '@apstpm-website/ui';

interface AnnouncementCardProps {
  announcement: Announcement;
  locale?: string;
}

export default function AnnouncementCard({ announcement, locale = 'zh-TW' }: AnnouncementCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const hasAttachments = announcement.attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link
        href={`/announcements/${announcement.slug}`}
        className="block group"
      >
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-robot-200 transition-all duration-300 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-robot-700 transition-colors truncate">
                {announcement.title}
              </h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(announcement.publishedAt)}</span>
                </div>
                {hasAttachments && (
                  <Badge variant="secondary" className="flex items-center gap-1 bg-robot-50 text-robot-700">
                    <Paperclip className="w-3 h-3" />
                    <span>{announcement.attachments.length}</span>
                  </Badge>
                )}
              </div>
            </div>
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-robot-100 group-hover:bg-robot-600 transition-colors flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-robot-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
