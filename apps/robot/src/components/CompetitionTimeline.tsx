'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, Button } from '@apstpm-website/ui';
import Link from 'next/link';
import type { CompetitionInfo } from '@/lib/content';

interface CompetitionTimelineProps {
  competitionInfo: CompetitionInfo | null;
}

export default function CompetitionTimeline({ competitionInfo }: CompetitionTimelineProps) {
  const t = useTranslations('Home');
  const locale = 'zh-TW';

  const timelineItems = [
    {
      icon: Calendar,
      label: t('registrationPeriod'),
      startDate: competitionInfo?.registrationPeriod.start,
      endDate: competitionInfo?.registrationPeriod.end,
      color: 'bg-robot-100 text-robot-600',
      borderColor: 'border-robot-200',
    },
    {
      icon: Clock,
      label: t('competitionPeriod'),
      startDate: competitionInfo?.competitionDates.start,
      endDate: competitionInfo?.competitionDates.end,
      color: 'bg-robot-200 text-robot-700',
      borderColor: 'border-robot-300',
    },
    {
      icon: MapPin,
      label: t('location'),
      venue: competitionInfo?.venue,
      color: 'bg-robot-300 text-robot-800',
      borderColor: 'border-robot-400',
    },
  ];

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-display mb-4">
            {t('competitionInfo')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className={`h-full border-2 ${item.borderColor} hover:shadow-lg transition-shadow duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                      {item.startDate && item.endDate ? (
                        <p className="text-lg font-semibold text-gray-900">
                          {formatDate(item.startDate)}
                        </p>
                      ) : null}
                      {item.startDate && item.endDate && (
                        <p className="text-gray-700">
                          - {formatDate(item.endDate)}
                        </p>
                      )}
                      {item.venue && (
                        <p className="text-lg font-semibold text-gray-900">{item.venue}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/competition">
            <Button variant="outline" size="lg" className="border-robot-300 text-robot-700 hover:bg-robot-50">
              {t('learnMore')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
