'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

interface CompetitionCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  prize: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'ended';
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
  description,
  image,
  date,
  prize,
  participants,
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
      <div className="relative h-full overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
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
          <div className="absolute top-4 left-4 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-brand-700 transition-colors">
            {title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
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
              <span className="text-sm text-gray-600">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-brand-700 font-semibold text-sm">{prize}</span>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {participants} {t('participants')}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/competitions/${id}`}
            className="bg-brand-700 hover:bg-brand-800 text-white py-2.5 rounded-xl text-center font-semibold block w-full transition-colors"
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
