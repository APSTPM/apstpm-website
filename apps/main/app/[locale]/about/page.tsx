'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {motion} from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');

  const values = [
    {key: 'innovation', icon: '💡'},
    {key: 'collaboration', icon: '🤝'},
    {key: 'sustainability', icon: '🌱'},
  ];

  return (
    <div className="pt-16">
      {/* Hero Header */}
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

      {/* Mission */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-6">{t('missionTitle')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t('missionDescription')}</p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-brand-700 font-display mb-6">{t('historyTitle')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t('historyDescription')}</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-4xl font-bold text-gray-900 font-display text-center mb-16">
            {t('valuesTitle')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: i * 0.15}}
                className="group bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="text-5xl mb-6">{v.icon}</div>
                <h3 className="text-brand-700 font-display font-bold text-xl mb-3">
                  {t(`values.${v.key}`)}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t(`values.${v.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-4">{t('teamTitle')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('teamDescription')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              {tCommon('contactUs')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
