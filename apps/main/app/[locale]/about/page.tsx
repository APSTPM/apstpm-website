'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {UserRound} from 'lucide-react';

import MemberDialog from '@/components/MemberDialog';
import SectionNav from '@/components/SectionNav';
import {organizationGroups, type OrganizationGroup, type OrganizationMember} from '@/data/organization';

export default function AboutPage() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'en' | 'zh-TW';
  // 當前打開彈窗的成員及其所屬組別
  const [selected, setSelected] = useState<{member: OrganizationMember; group: OrganizationGroup['key']} | null>(null);

  const navItems = [
    // 宗旨與會員資格在桌面端同一行，目錄合併為一項
    {id: 'mission', label: t('missionTitle')},
    {id: 'organization', label: t('organizationTitle')},
    ...organizationGroups.map(group => ({id: `organization-${group.key}`, label: t(`organization.${group.key}`), level: 2 as const})),
  ];

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>
      <SectionNav items={navItems} label={tCommon('onThisPage')} />

      {/* 宗旨與會員資格：兩段都很短，桌面端並排成兩欄，避免各佔一整屏 */}
      <section id="mission" className="scroll-mt-24 bg-gray-50 px-4 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {[
            {key: 'mission', title: t('missionTitle'), body: t('missionDescription')},
            {key: 'membership', anchor: 'membership', title: t('historyTitle'), body: t('historyDescription')},
          ].map((card, i) => (
            <motion.div
              key={card.key}
              id={card.anchor}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: i * 0.08}}
              className="scroll-mt-24 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-brand-700 font-display mb-3">{card.title}</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Organization */}
      <section id="organization" className="scroll-mt-16 bg-white py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display mb-3">{t('organizationTitle')}</h2>
            <p className="text-lg text-gray-600">{t('organizationSubtitle')}</p>
          </motion.div>
          <div className="space-y-12">
            {organizationGroups.map(group => (
              <div key={group.key} id={`organization-${group.key}`} className="scroll-mt-28">
                <h3 className="text-2xl font-bold text-brand-700 font-display text-center mb-6">
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
                      <button
                        type="button"
                        onClick={() => setSelected({member: m, group: group.key})}
                        aria-label={t('member.viewProfile', {name: m.name[locale]})}
                        className="group block w-full rounded-2xl text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800"
                      >
                        <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center mb-4 transition-shadow group-hover:shadow-md group-hover:border-brand-200">
                          {m.photo ? (
                            <Image src={m.photo} alt={m.name[locale]} fill sizes="(min-width: 640px) 176px, 50vw" className="object-cover" />
                          ) : (
                            <UserRound className="w-16 h-16 text-gray-300" strokeWidth={1.5} aria-hidden />
                          )}
                        </div>
                        <p className="font-display font-bold text-gray-900 transition-colors group-hover:text-brand-700">{m.name[locale]}</p>
                        <p className="text-sm text-gray-500 mt-1">{m.position[locale]}</p>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MemberDialog
        member={selected?.member ?? null}
        groupLabel={selected ? t(`organization.${selected.group}`) : ''}
        locale={locale}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
