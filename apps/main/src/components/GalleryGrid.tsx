'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  category: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(items.map((item) => item.category))];

  const filteredItems =
    filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === category
                ? 'bg-brand-700 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:text-brand-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedItem(item)}
              className="relative group cursor-pointer rounded-2xl shadow-sm overflow-hidden aspect-square"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.thumbnail})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-300" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-brand-700/10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-700/20 border-2 border-brand-700"
                >
                  {item.type === 'video' ? (
                    <svg
                      className="w-5 h-5 ml-1 text-brand-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-brand-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  )}
                </motion.div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-brand-50 text-brand-700 px-2 py-1 rounded-md text-xs font-semibold">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm font-semibold truncate">
                  {item.title}
                </h3>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-brand-500 pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white"
              onClick={() => setSelectedItem(null)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="relative max-w-4xl w-full bg-gray-900 border border-white/20 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="w-full aspect-video"
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto"
                />
              )}

              {/* Caption */}
              <div className="p-4">
                <h3 className="text-white text-lg font-semibold font-display">
                  {selectedItem.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {selectedItem.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
