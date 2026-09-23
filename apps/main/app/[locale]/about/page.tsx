'use client';

import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {UserRound} from 'lucide-react';

import SectionNav from '@/components/SectionNav';
import {organizationGroups} from '@/data/organization';

export default function AboutPage() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'en' | 'zh-TW';

  const navItems = [
    {id: 'mission', label: t('missionTitle')},
    {id: 'membership', label: t('historyTitle')},
    {id: 'organization', label: t('organizationTitle')},
    ...organizationGroups.map(group => ({id: `organization-${group.key}`, label: t(`organization.${group.key}`), level: 2 as const})),
  ];

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>
      <SectionNav items={navItems} label={tCommon('onThisPage')} />

      {/* Mission */}
      <section id="mission" className="scroll-mt-24 bg-gray-50 px-4 pt-10 pb-20 sm:pt-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-6">{t('missionTitle')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t('missionDescription')}</p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section id="membership" className="scroll-mt-16 bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-brand-700 font-display mb-6">{t('historyTitle')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t('historyDescription')}</p>
          </motion.div>
        </div>
      </section>

      {/* Organization */}
      <section id="organization" className="scroll-mt-16 bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">{t('organizationTitle')}</h2>
            <p className="text-lg text-gray-600">{t('organizationSubtitle')}</p>
          </motion.div>
          <div className="space-y-16">
            {organizationGroups.map(group => (
              <div key={group.key} id={`organization-${group.key}`} className="scroll-mt-28">
                <h3 className="text-2xl font-bold text-brand-700 font-display text-center mb-8">
                  {t(`organization.${group.key}`)}
                </h3>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {group.members.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{opacity: 0, y: 20}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true}}
                      transition={{delay: i * 0.08}}
                      className="w-[calc(50%-0.75rem)] sm:w-44 text-center"
                    >
                      <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center mb-4">
                        {m.photo ? (
                          <Image src={m.photo} alt={m.name[locale]} fill sizes="(min-width: 640px) 176px, 50vw" className="object-cover" />
                        ) : (
                          <UserRound className="w-16 h-16 text-gray-300" strokeWidth={1.5} aria-hidden />
                        )}
                      </div>
                      <p className="font-display font-bold text-gray-900">{m.name[locale]}</p>
                      <p className="text-sm text-gray-500 mt-1">{m.position[locale]}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
