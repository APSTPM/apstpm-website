'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@apstpm-website/ui';
import { Badge } from '@apstpm-website/ui';
import type { PastCompetition } from '@/lib/content';

interface HistoryPageContentProps {
  pastCompetitions: PastCompetition[];
}

export default function HistoryPageContent({ pastCompetitions }: HistoryPageContentProps) {
  const t = useTranslations('History');
  const tNav = useTranslations('Navigation');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-robot-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-robot-600/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">
            {tNav('history')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('title')}
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {pastCompetitions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t('noHistory') || '暫無歷屆資料'}</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {pastCompetitions.map((competition) => (
              <motion.article
                key={competition.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Year Badge - Timeline */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-robot-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    <Calendar className="w-5 h-5" />
                    <span>{competition.year}</span>
                  </div>
                  <div className="flex-1 h-px bg-robot-200" />
                </div>

                {/* Content Card */}
                <Card className="ml-8 md:ml-12 border-robot-200 hover:border-robot-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-2xl text-robot-800 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-robot-500" />
                        {t('theme')}: {competition.theme}
                      </CardTitle>
                      <Badge variant="outline" className="w-fit bg-robot-50 text-robot-700 border-robot-200">
                        {competition.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {competition.description}
                    </p>

                    {/* Highlights */}
                    <div className="bg-robot-50 rounded-xl p-5">
                      <h4 className="font-semibold text-robot-800 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        {t('highlights')}
                      </h4>
                      <ul className="space-y-2">
                        {competition.highlights.map((highlight, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <ChevronRight className="w-4 h-4 text-robot-500 mt-1 shrink-0" />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
