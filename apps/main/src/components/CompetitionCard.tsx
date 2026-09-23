'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import type { CompetitionStatus } from '@/data/competitions';

interface CompetitionCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  period: string;
  status: CompetitionStatus;
  category: string;
}

const statusConfig = {
  ongoing: { className: 'bg-brand-600 text-white', labelKey: 'status.ongoing' as const },
  upcoming: { className: 'bg-amber-100 text-amber-800', labelKey: 'status.upcoming' as const },
  ended: { className: 'bg-gray-100 text-gray-500', labelKey: 'status.ended' as const },
};

export default function CompetitionCard({
  id,
  title,
  summary,
  image,
  date,
  period,
  status,
  category,
}: CompetitionCardProps) {
  const t = useTranslations('competitions');
  const { className: statusClassName, labelKey } = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Card Content */}
      <div className="relative flex h-full flex-col overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 shrink-0 overflow-hidden">
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-white to-transparent" />

          {/* Status Badge */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${statusClassName}`}
          >
            {t(labelKey)}
          </div>

          {/* Category Badge */}
          <div lang="zh-Hant" className="absolute top-4 left-4 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6">
          <div lang="zh-Hant">
            <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-brand-700 transition-colors">
              {title}
            </h3>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {summary}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-4 h-4 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={date} className="text-sm text-gray-600">{period}</time>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/competitions/${id}`}
            className="mt-auto bg-brand-700 hover:bg-brand-800 text-white py-2.5 rounded-xl text-center font-semibold block w-full transition-colors"
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
