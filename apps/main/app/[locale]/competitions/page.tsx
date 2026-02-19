'use client';

import {useTranslations, useLocale} from 'next-intl';
import {motion} from 'framer-motion';
import CompetitionCard from '@/components/CompetitionCard';

const competitions = [
  {
    id: 'smart-grid-innovation-2026',
    title: {en: 'Smart Grid Innovation Challenge 2026', 'zh-TW': '智慧電網創新挑戰賽 2026'},
    description: {en: 'Showcase innovative solutions for modern power grid challenges.', 'zh-TW': '展示現代電網挑戰的創新解決方案。'},
    date: '2026-03-15',
    prize: '$10,000',
    participants: 200,
    status: 'ongoing' as const,
    category: 'Robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
  },
  {
    id: 'energy-efficiency-hackathon',
    title: {en: 'Energy Efficiency Hackathon', 'zh-TW': '能源效率黑客松'},
    description: {en: '24-hour hackathon focused on reducing energy consumption.', 'zh-TW': '為期24小時的黑客松，專注於減少能源消耗。'},
    date: '2026-04-20',
    prize: '$5,000',
    participants: 150,
    status: 'upcoming' as const,
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop',
  },
  {
    id: 'renewable-integration-challenge',
    title: {en: 'Renewable Integration Challenge', 'zh-TW': '再生能源整合挑戰賽'},
    description: {en: 'Tackle the challenges of integrating renewable energy sources.', 'zh-TW': '解決再生能源整合的挑戰。'},
    date: '2026-05-10',
    prize: '$8,000',
    participants: 180,
    status: 'upcoming' as const,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
  },
  {
    id: 'power-management-summit',
    title: {en: 'Power Management Summit 2025', 'zh-TW': '能源管理高峰會 2025'},
    description: {en: 'Annual summit bringing together industry leaders.', 'zh-TW': '匯聚產業領袖的年度高峰會。'},
    date: '2025-11-15',
    prize: '-',
    participants: 300,
    status: 'ended' as const,
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
  },
];

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
