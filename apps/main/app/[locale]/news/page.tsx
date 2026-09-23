'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import {newsData} from '@/data/news';

export default function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'announcements', 'events', 'research', 'industry'];
  const filtered = filter === 'all' ? newsData : newsData.filter(n => n.category === filter);

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>

      <section className="bg-gray-50 px-4 pt-10 pb-16 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <motion.button key={cat} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} onClick={() => setFilter(cat)}
                className={filter === cat ? 'bg-brand-700 text-white rounded-full px-5 py-2 text-sm font-semibold' : 'bg-white text-gray-600 border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold hover:text-brand-700'}>
                {t(`categories.${cat}`)}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.article key={item.id} id={item.id} layout initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, scale: 0.9}} transition={{delay: i * 0.05}}
                  className="group scroll-mt-24 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer">
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: `url(${item.image})`}} />
                    <div className="absolute inset-0 bg-linear-to-t from-white to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">{t(`categories.${item.category}`)}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-gray-400 text-xs mb-3 block">{item.date}</span>
                    <h3 className="text-gray-900 text-lg font-semibold mb-2 group-hover:text-brand-700 transition-colors">{(item.title as Record<string, string>)[locale] || item.title.en}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{(item.excerpt as Record<string, string>)[locale] || item.excerpt.en}</p>
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
