'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

interface HeroProps {
  locale: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Hero({ locale: _locale }: HeroProps) {
  const t = useTranslations('hero');

  return (
    <section className="bg-white min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 w-full">
        <div className="relative z-10 text-center">
          {/* Badge */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
            className="bg-brand-50 text-brand-700 border border-brand-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span className="text-sm font-medium">{t('badge')}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 font-display mb-6"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-colors"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center border-2 border-brand-700 text-brand-700 hover:bg-brand-50 px-8 py-4 text-lg font-semibold rounded-xl transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '500+', label: t('stats.participants') },
              { value: '50+', label: t('stats.teams') },
              { value: '20+', label: t('stats.countries') },
              { value: '$50K', label: t('stats.prize') },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-700 font-display mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
