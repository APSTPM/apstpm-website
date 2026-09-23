'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {motion, AnimatePresence} from 'framer-motion';
import {ArrowRight, ChevronLeft, ChevronRight, Play, X} from 'lucide-react';

import {Link} from '@/i18n/routing';
import {youtubeId, type Album, type MediaItem, type MediaType} from '@/data/gallery';

type Filter = 'all' | MediaType;

interface Entry {
  album: Album;
  item: MediaItem;
}

function Thumbnail({item}: {item: MediaItem}) {
  if (item.thumbnail) {
    return <Image src={item.thumbnail} alt="" width={600} height={400} unoptimized className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />;
  }
  // 本地視頻沒有封面時取第一幀
  return <video src={`${item.src}#t=0.1`} preload="metadata" muted playsInline className="h-full w-full object-cover" />;
}

function Player({item}: {item: MediaItem}) {
  if (item.type === 'image') {
    return <Image src={item.src} alt={item.alt} width={1600} height={1067} unoptimized className="mx-auto h-auto max-h-[75vh] w-auto max-w-full object-contain" />;
  }
  const id = youtubeId(item.src);
  if (id) {
    return (
      <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={item.alt} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="aspect-video w-full" />
    );
  }
  return <video src={item.src} poster={item.thumbnail} controls autoPlay playsInline aria-label={item.alt} className="mx-auto max-h-[75vh] w-full" />;
}

export default function GalleryGrid({albums}: {albums: Album[]}) {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const hasVideos = albums.some(album => album.items.some(item => item.type === 'video'));
  const visibleAlbums = useMemo(
    () => albums
      .map(album => ({...album, items: filter === 'all' ? album.items : album.items.filter(item => item.type === filter)}))
      .filter(album => album.items.length > 0),
    [albums, filter],
  );
  // 燈箱按篩選後的順序跨相冊切換
  const entries = useMemo<Entry[]>(() => visibleAlbums.flatMap(album => album.items.map(item => ({album, item}))), [visibleAlbums]);
  // 每個相冊第一項在 entries 裡的位置
  const starts = useMemo(() => visibleAlbums.map((_, i) => visibleAlbums.slice(0, i).reduce((sum, album) => sum + album.items.length, 0)), [visibleAlbums]);
  const current = selected === null ? null : entries[selected];
  const isOpen = selected !== null;

  const close = useCallback(() => {
    setSelected(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback((delta: number) => {
    setSelected(index => (index === null ? null : (index + delta + entries.length) % entries.length));
  }, [entries.length]);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close, step]);

  const filters: Filter[] = ['all', 'image', 'video'];

  return (
    <>
      {/* 還沒有視頻時不顯示篩選 */}
      {hasVideos && (
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {filters.map(value => (
            <motion.button key={value} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} onClick={() => setFilter(value)} aria-pressed={filter === value}
              className={filter === value ? 'rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white' : 'rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 hover:text-brand-700'}>
              {t(`filters.${value}`)}
            </motion.button>
          ))}
        </div>
      )}

      <div className="space-y-14">
        {visibleAlbums.map((album, albumIndex) => {
          const start = starts[albumIndex];
          return (
            <section key={album.id} id={`album-${album.id}`} aria-labelledby={`album-${album.id}-title`} className="scroll-mt-24">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div lang="zh-Hant" className="min-w-0">
                  <time dateTime={album.date} className="text-xs tabular-nums text-gray-500">{album.period}</time>
                  <h2 id={`album-${album.id}-title`} className="mt-1 text-xl font-bold leading-snug text-gray-900">{album.title}</h2>
                </div>
                <Link href={album.href} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800">
                  {t('viewDetails')}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {album.items.map((item, i) => (
                  <li key={item.src}>
                    <button type="button" onClick={event => { triggerRef.current = event.currentTarget; setSelected(start + i); }}
                      aria-label={item.type === 'video' ? `${t('playVideo')}：${item.alt}` : item.alt}
                      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800">
                      <Thumbnail item={item} />
                      {item.type === 'video' && (
                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-800 shadow">
                            <Play className="ml-0.5 h-5 w-5 fill-current" />
                          </span>
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <AnimatePresence>
        {current && selected !== null && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} role="dialog" aria-modal="true" aria-label={current.item.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-12" onClick={close}>
            <button ref={closeRef} type="button" onClick={close} aria-label={t('close')}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            {entries.length > 1 && (
              <>
                <button type="button" onClick={event => { event.stopPropagation(); step(-1); }} aria-label={t('previous')}
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/20 sm:left-4">
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                </button>
                <button type="button" onClick={event => { event.stopPropagation(); step(1); }} aria-label={t('next')}
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/20 sm:right-4">
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                </button>
              </>
            )}
            <figure key={current.item.src} className="w-full max-w-5xl" onClick={event => event.stopPropagation()}>
              <Player item={current.item} />
              <figcaption lang="zh-Hant" className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                <span className="min-w-0 space-y-1">
                  {current.item.caption && <span className="block text-white">{current.item.caption}</span>}
                  <Link href={current.album.href} className="block text-gray-300 underline underline-offset-4 hover:text-white">{current.album.title}</Link>
                </span>
                <span className="flex flex-wrap items-baseline gap-x-4 text-xs text-gray-400">
                  {current.item.credit && <span>{current.item.credit}</span>}
                  <span className="tabular-nums">{selected + 1} / {entries.length}</span>
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
