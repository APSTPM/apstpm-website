'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState} from 'react';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {ArrowRight, ArrowUpRight} from 'lucide-react';

import {Link} from '@/i18n/routing';
import {activities, type ActivityCategory} from '@/data/activities';

const categories = ['all', 'organized', 'partnered'] as const;

export default function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const [filter, setFilter] = useState<'all' | ActivityCategory>('all');
  const filtered = filter === 'all' ? activities : activities.filter(item => item.category === filter);

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>
      {locale !== 'zh-TW' && (
        <div className="border-b border-gray-200 bg-[#fafcf9] px-4">
          <p className="mx-auto max-w-7xl py-3 text-sm text-gray-600">{t('chineseOnly')}</p>
        </div>
      )}

      <section className="bg-gray-50 px-4 pt-10 pb-16 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          {/* 篩選 */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <motion.button key={cat} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} onClick={() => setFilter(cat)} aria-pressed={filter === cat}
                className={filter === cat ? 'bg-brand-700 text-white rounded-full px-5 py-2 text-sm font-semibold' : 'bg-white text-gray-600 border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold hover:text-brand-700'}>
                {t(`categories.${cat}`)}
              </motion.button>
            ))}
          </div>

          {/* 活動列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.article key={item.id} id={item.id} layout initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, scale: 0.9}} transition={{delay: i * 0.05}}
                  className="scroll-mt-24 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="relative">
                    <Image src={item.image} alt="" width={800} height={500} unoptimized className="aspect-[8/5] w-full bg-gray-100 object-cover" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">{t(`categories.${item.category}`)}</span>
                    {item.imageCredit && (
                      <span lang="zh-Hant" className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white">{item.imageCredit}</span>
                    )}
                  </div>
                  <div lang="zh-Hant" className="flex flex-1 flex-col p-6">
                    <time dateTime={item.date} className="text-gray-500 text-xs tabular-nums">{item.period}</time>
                    <h2 className="mt-2 text-gray-900 text-lg font-semibold leading-snug">{item.title}</h2>
                    <p className="mt-2 text-sm text-brand-800"><span lang={locale}>{t('role')}</span>：{item.role}</p>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.summary}</p>
                    <div lang={locale} className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
                      {item.competitionId && (
                        <Link href={`/competitions/${item.competitionId}`} className="inline-flex items-center gap-1 text-brand-800 hover:underline">
                          {t('competitionDetails')}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                      )}
                      <a href={item.source.url} target="_blank" rel="noopener noreferrer" title={item.source.label} className="inline-flex items-center gap-1 text-gray-600 hover:text-brand-800 hover:underline">
                        {t('source')}<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
