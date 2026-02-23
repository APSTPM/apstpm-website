'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Users, Trophy, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@apstpm-website/ui';
import { Badge } from '@apstpm-website/ui';
import type { CompetitionInfo } from '@/lib/content';

interface CompetitionPageContentProps {
  competitionInfo: CompetitionInfo | null;
}

export default function CompetitionPageContent({ competitionInfo }: CompetitionPageContentProps) {
  const t = useTranslations('Competition');
  const tNav = useTranslations('Navigation');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!competitionInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t('loading') || '載入中...'}</p>
      </div>
    );
  }

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
            {tNav('competition')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {competitionInfo.title}
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Purpose Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-robot-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-robot-100 rounded-lg">
                <Target className="w-6 h-6 text-robot-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('purpose')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {competitionInfo.purpose}
            </p>
          </motion.section>

          {/* Target Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-robot-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-robot-100 rounded-lg">
                <Users className="w-6 h-6 text-robot-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('target')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {competitionInfo.categories.map((category) => (
                <Card key={category.id} className="border-robot-200 hover:border-robot-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-robot-800">
                      {category.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit mt-2">
                      {category.ageGroup}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Judging Criteria Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-robot-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-robot-100 rounded-lg">
                <Scale className="w-6 h-6 text-robot-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('judging')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitionInfo.judgingCriteria.map((criteria, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 bg-robot-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-robot-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-medium">{criteria}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Awards Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-robot-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-robot-100 rounded-lg">
                <Trophy className="w-6 h-6 text-robot-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('awards')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitionInfo.awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-xl border-2 ${
                    index === 0
                      ? 'bg-yellow-50 border-yellow-300'
                      : index === 1
                      ? 'bg-gray-50 border-gray-300'
                      : index === 2
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-robot-50 border-robot-200'
                  }`}
                >
                  <p className={`font-semibold ${
                    index === 0
                      ? 'text-yellow-700'
                      : index === 1
                      ? 'text-gray-700'
                      : index === 2
                      ? 'text-orange-700'
                      : 'text-robot-700'
                  }`}>
                    {award}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
