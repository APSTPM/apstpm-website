'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  status: 'past' | 'current' | 'future';
}

interface TimelineProps {
  events: TimelineEvent[];
}

interface StatusClasses {
  dot: string;
  border: string;
  text: string;
  dateBadge: string;
  iconBg: string;
}

export default function Timeline({ events }: TimelineProps) {
  const t = useTranslations('timeline');

  const getStatusStyles = (status: 'past' | 'current' | 'future'): StatusClasses => {
    switch (status) {
      case 'past':
        return {
          dot: 'bg-gray-300',
          border: 'border-gray-200',
          text: 'text-gray-400',
          dateBadge: 'bg-gray-100 text-gray-500',
          iconBg: 'bg-gray-100',
        };
      case 'current':
        return {
          dot: 'bg-brand-500 shadow-md shadow-brand-500/50',
          border: 'border-brand-500',
          text: 'text-gray-900',
          dateBadge: 'bg-brand-50 text-brand-700',
          iconBg: 'bg-brand-50',
        };
      case 'future':
        return {
          dot: 'bg-brand-200',
          border: 'border-brand-100',
          text: 'text-gray-600',
          dateBadge: 'bg-brand-50 text-brand-600',
          iconBg: 'bg-brand-50',
        };
    }
  };

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2 bg-linear-to-b from-transparent via-brand-300 to-transparent" />

      {/* Timeline Events */}
      <div className="space-y-12">
        {events.map((event, index) => {
          const styles = getStatusStyles(event.status);
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 ${styles.dot}`}
              />

              {/* Content Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                  isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}
              >
                <div
                  className={`relative bg-white rounded-2xl border shadow-sm p-6 ${styles.border}`}
                >
                  <div className="relative">
                    {/* Date Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${styles.dateBadge}`}
                    >
                      <span>{event.date}</span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl ${styles.iconBg}`}
                    >
                      {event.icon}
                    </div>

                    {/* Title */}
                    <h3 className={`font-display font-bold text-xl mb-2 ${styles.text}`}>
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm">{event.description}</p>

                    {/* Status Indicator */}
                    {event.status === 'current' && (
                      <div className="absolute -top-3 -right-3 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {t('now')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
