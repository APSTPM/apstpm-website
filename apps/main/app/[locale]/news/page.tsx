'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const newsData = [
  {id: 'apstpm-2026-call-for-papers', title: {en: 'Call for Papers: APSTPM 2026', 'zh-TW': '徵稿啟事：APSTPM 2026'}, excerpt: {en: 'We invite researchers to submit papers for the upcoming APSTPM 2026 conference.', 'zh-TW': '我們邀請研究人員提交論文參加即將舉行的 APSTPM 2026 會議。'}, category: 'announcements', date: '2026-01-15', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop'},
  {id: 'smart-grid-summit-highlights', title: {en: 'Smart Grid Summit 2025 Highlights', 'zh-TW': '智慧電網高峰會 2025 重點回顧'}, excerpt: {en: 'Key takeaways from the successful Smart Grid Summit 2025 held in Singapore.', 'zh-TW': '新加坡舉辦的智慧電網高峰會 2025 成功與會的重點摘要。'}, category: 'events', date: '2025-12-20', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop'},
  {id: 'new-partnership-announcement', title: {en: 'APSTPM Announces Strategic Partnership', 'zh-TW': 'APSTPM 宣布策略合作夥伴'}, excerpt: {en: 'APSTPM partners with leading energy companies to advance sustainable solutions.', 'zh-TW': 'APSTPM 與領先能源公司合作，推動可持續解決方案。'}, category: 'industry', date: '2025-11-28', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop'},
  {id: 'research-breakthrough-energy-storage', title: {en: 'New Research Breakthrough in Energy Storage', 'zh-TW': '能源儲存研究突破'}, excerpt: {en: 'APSTPM researchers publish groundbreaking study on next-generation battery technology.', 'zh-TW': 'APSTPM 研究人員發表下一代電池技術的開創性研究。'}, category: 'research', date: '2025-10-15', image: 'https://images.unsplash.com/photo-1581092160607-ee67df30dd0c?w=800&h=500&fit=crop'},
  {id: 'renewable-energy-trends-2025', title: {en: 'Renewable Energy Trends Report 2025', 'zh-TW': '2025再生能源趨勢報告'}, excerpt: {en: 'Annual report on the latest trends and developments in renewable energy sector.', 'zh-TW': '關於再生能源領域最新趨勢和發展的年度報告。'}, category: 'research', date: '2025-09-01', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop'},
  {id: 'student-competition-winners', title: {en: 'Student Competition Winners Announced', 'zh-TW': '學生競賽獲獎者公佈'}, excerpt: {en: 'Congratulations to the winners of the 2025 APSTPM Student Competition.', 'zh-TW': '祝賀 2025 APSTPM 學生競賽的獲獎者。'}, category: 'events', date: '2025-08-20', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop'},
];

export default function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'announcements', 'events', 'research', 'industry'];
  const filtered = filter === 'all' ? newsData : newsData.filter(n => n.category === filter);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative py-24 px-4 bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-display mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
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
                <motion.article key={item.id} layout initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, scale: 0.9}} transition={{delay: i * 0.05}}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer">
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
