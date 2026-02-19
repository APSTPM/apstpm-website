'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';
import {motion} from 'framer-motion';
import Hero from '@/components/Hero';
import CompetitionCard from '@/components/CompetitionCard';

const featuredCompetitions = [
  {
    id: 'smart-grid-innovation-2026',
    title: '智慧電網創新挑戰賽 2026',
    description: '展示現代電網挑戰的創新解決方案，匯聚全球頂尖工程師與研究人員。',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
    date: '2026-03-15',
    prize: '$10,000',
    participants: 200,
    status: 'ongoing' as const,
    category: 'Robotics',
  },
  {
    id: 'energy-efficiency-hackathon',
    title: '能源效率黑客松',
    description: '為期24小時的黑客松，專注於減少能源消耗的創新技術方案。',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop',
    date: '2026-04-20',
    prize: '$5,000',
    participants: 150,
    status: 'upcoming' as const,
    category: 'Science',
  },
  {
    id: 'renewable-integration-challenge',
    title: '再生能源整合挑戰賽',
    description: '解決再生能源整合的挑戰，推動可持續能源發展。',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    date: '2026-05-10',
    prize: '$8,000',
    participants: 180,
    status: 'upcoming' as const,
    category: 'Technology',
  },
];

export default function HomePage() {
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div>
      <Hero locale={locale} />

      {/* Featured Competitions */}
      <section className="relative py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">
              {tHome('eventsSection.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {tHome('eventsSection.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompetitions.map((comp) => (
              <CompetitionCard key={comp.id} {...comp} />
            ))}
          </div>

          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="text-center mt-12"
          >
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 border border-brand-700 text-brand-700 hover:bg-brand-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {tCommon('viewAll')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="relative py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-6">
              {tHome('aboutSection.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              {tHome('aboutSection.description')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-brand-700 text-brand-700 hover:bg-brand-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {tCommon('learnMore')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest News Teaser */}
      <section className="relative py-24 px-4 bg-brand-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">
              {tHome('newsSection.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {tHome('newsSection.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {title: 'APSTPM 2026 徵稿啟事', date: '2026-01-15', cat: 'Announcements'},
              {title: '智慧電網高峰會 2025 回顧', date: '2025-12-20', cat: 'Events'},
              {title: 'APSTPM 宣布策略合作', date: '2025-11-28', cat: 'Industry'},
            ].map((news, i) => (
              <motion.article
                key={i}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: i * 0.1}}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden bg-linear-to-t from-white to-transparent" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-2 py-1 rounded-md">{news.cat}</span>
                    <span className="text-gray-400 text-xs">{news.date}</span>
                  </div>
                  <h3 className="text-gray-900 text-lg font-semibold group-hover:text-brand-700 transition-colors">{news.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="text-center mt-12"
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 border border-brand-700 text-brand-700 hover:bg-brand-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {tCommon('readMore')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 overflow-hidden bg-white">
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-6">
              {tHome('cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {tHome('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white px-10 py-4 text-lg font-semibold rounded-lg transition-colors"
            >
              {tHome('cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
