'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import {galleryItems} from '@/data/gallery';

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = ['all', ...new Set(galleryItems.map(i => i.category))];
  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter);
  const selectedItem = galleryItems.find(i => i.id === selectedId);

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
                className={filter === cat ? 'bg-brand-700 text-white rounded-full px-5 py-2 text-sm font-semibold capitalize' : 'bg-white text-gray-600 border border-gray-200 rounded-full px-5 py-2 text-sm font-semibold capitalize'}>
                {cat === 'all' ? t('photos') : cat}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div key={item.id} id={`photo-${item.id}`} layout initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} transition={{delay: i * 0.05}}
                  onClick={() => setSelectedId(item.id)}
                  className="group relative scroll-mt-24 cursor-pointer rounded-2xl shadow-sm hover:shadow-md overflow-hidden aspect-4/3 border-2 border-transparent hover:border-brand-500 transition-all duration-300">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: `url(${item.image})`}} />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-brand-700/10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-brand-700 bg-brand-700/20">
                      <svg className="w-5 h-5 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3"><span className="px-2 py-1 rounded-md text-xs font-semibold capitalize bg-brand-50 text-brand-700">{item.category}</span></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4"><h3 className="text-sm font-semibold text-white">{(item.title as Record<string, string>)[locale] || item.title.en}</h3></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedId(null)}>
            <motion.button initial={{opacity: 0}} animate={{opacity: 1}} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20" onClick={() => setSelectedId(null)}>
              <svg className="w-5 h-5 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </motion.button>
            <motion.div initial={{scale: 0.8}} animate={{scale: 1}} exit={{scale: 0.8}} className="max-w-4xl w-full rounded-2xl overflow-hidden border border-white/20" onClick={e => e.stopPropagation()}>
              <img src={selectedItem.image.replace('w=600', 'w=1200').replace('h=400', 'h=800').replace('h=500', 'h=800')} alt={(selectedItem.title as Record<string, string>)[locale] || selectedItem.title.en} className="w-full h-auto" />
              <div className="p-4 bg-gray-900">
                <h3 className="text-white text-lg font-semibold font-display">{(selectedItem.title as Record<string, string>)[locale] || selectedItem.title.en}</h3>
                <p className="text-gray-400 text-sm mt-1 capitalize">{selectedItem.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
