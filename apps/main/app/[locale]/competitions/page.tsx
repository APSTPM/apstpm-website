'use client';

import {useTranslations, useLocale} from 'next-intl';
import {motion} from 'framer-motion';
import CompetitionCard from '@/components/CompetitionCard';

import {competitions, type Competition} from '@/data/competitions';

function CompetitionGrid({items}: {items: Competition[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((comp) => (
        <CompetitionCard
          key={comp.id}
          id={comp.id}
          title={comp.title}
          summary={comp.summary}
          image={comp.image}
          date={comp.date}
          period={comp.period}
          status={comp.status}
          category={comp.category}
        />
      ))}
    </div>
  );
}

export default function CompetitionsPage() {
  const t = useTranslations('competitions');
  const locale = useLocale();

  const currentComps = competitions.filter(c => c.status !== 'ended');
  const pastComps = competitions.filter(c => c.status === 'ended');

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>
      {locale !== 'zh-TW' && (
        <div className="border-b border-gray-200 bg-[#fafcf9] px-4">
          <p className="mx-auto max-w-7xl py-3 text-sm text-gray-600">{t('chineseOnly')}</p>
        </div>
      )}

      {/* Current */}
      {currentComps.length > 0 && (
        <section className="bg-gray-50 px-4 pt-10 pb-12 sm:pt-12">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-3xl font-bold text-brand-700 font-display mb-8">
              {t('current')}
            </motion.h2>
            <CompetitionGrid items={currentComps} />
          </div>
        </section>
      )}

      {/* Past */}
      {pastComps.length > 0 && (
        <section className={`bg-white px-4 pb-20 ${currentComps.length > 0 ? 'pt-12' : 'pt-10 sm:pt-12'}`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-3xl font-bold text-gray-400 font-display mb-8">
              {t('past')}
            </motion.h2>
            <CompetitionGrid items={pastComps} />
          </div>
        </section>
      )}
    </div>
  );
}
