'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';
import { Badge } from '@apstpm-website/ui';
import type { RuleFile } from '@/lib/content';

interface RulesPageContentProps {
  ruleFiles: RuleFile[];
}

export default function RulesPageContent({ ruleFiles }: RulesPageContentProps) {
  const t = useTranslations('Rules');
  const tNav = useTranslations('Navigation');

  const groupedByYear = ruleFiles.reduce((acc, file) => {
    if (!acc[file.year]) {
      acc[file.year] = [];
    }
    acc[file.year].push(file);
    return acc;
  }, {} as Record<number, RuleFile[]>);

  const years = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

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

  const getCategoryLabel = (category: 'regulations' | 'rules') => {
    return category === 'regulations' ? t('regulations') : t('rules');
  };

  const getCategoryVariant = (category: 'regulations' | 'rules') => {
    return category === 'regulations' ? 'default' : 'secondary';
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
            {tNav('rules')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('title')}
          </p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {years.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t('noRules') || '暫無賽規文件'}</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {years.map((year) => (
              <motion.section
                key={year}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-robot-100 overflow-hidden"
              >
                {/* Year Badge */}
                <div className="bg-robot-600 px-6 py-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-lg">{year}</span>
                </div>

                {/* Files List */}
                <div className="divide-y divide-gray-100">
                  {groupedByYear[year].map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="p-6 hover:bg-robot-50/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-robot-100 rounded-lg shrink-0">
                            <FileText className="w-5 h-5 text-robot-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {file.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant={getCategoryVariant(file.category) as 'default' | 'secondary'}>
                                {getCategoryLabel(file.category)}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {t('updated')}: {file.updatedAt}
                              </span>
                            </div>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          download
                          className="shrink-0 inline-flex items-center justify-center gap-2 h-8 px-3 text-xs font-semibold rounded-xl border-2 border-robot-300 text-robot-700 bg-transparent hover:bg-robot-50 hover:border-robot-400 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          {t('download')}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
