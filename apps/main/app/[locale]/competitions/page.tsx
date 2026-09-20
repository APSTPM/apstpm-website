'use client';

import {useTranslations, useLocale} from 'next-intl';
import {motion} from 'framer-motion';
import CompetitionCard from '@/components/CompetitionCard';

import {competitions} from '@/data/competitions';

export default function CompetitionsPage() {
  const t = useTranslations('competitions');
  const locale = useLocale();

  const upcomingComps = competitions.filter(c => c.status !== 'ended');
  const pastComps = competitions.filter(c => c.status === 'ended');

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative py-24 px-4 bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-display mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-3xl font-bold text-brand-700 font-display mb-12">
            {t('upcoming')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingComps.map((comp) => (
              <CompetitionCard
                key={comp.id}
                id={comp.id}
                title={(comp.title as Record<string, string>)[locale] || comp.title.en}
                description={(comp.description as Record<string, string>)[locale] || comp.description.en}
                image={comp.image}
                date={comp.date}
                prize={comp.prize}
                participants={comp.participants}
                status={comp.status}
                category={comp.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      {pastComps.length > 0 && (
        <section className="bg-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-3xl font-bold text-gray-400 font-display mb-12">
              {t('past')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastComps.map((comp) => (
                <CompetitionCard
                  key={comp.id}
                  id={comp.id}
                  title={(comp.title as Record<string, string>)[locale] || comp.title.en}
                  description={(comp.description as Record<string, string>)[locale] || comp.description.en}
                  image={comp.image}
                  date={comp.date}
                  prize={comp.prize}
                  participants={comp.participants}
                  status={comp.status}
                  category={comp.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
