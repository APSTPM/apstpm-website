'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {ArrowRight, ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react';
import {Link} from '@/i18n/routing';
import {competitions} from '@/data/competitions';
import {activities, activityHref} from '@/data/activities';

// 每張停留時間（毫秒）
const interval = 6000;

// 進行中和即將舉辦的比賽排最前，其後接活動紀錄；兩者都直接取自現有數據
const slides = [
  ...competitions.filter(item => item.status !== 'ended').map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    period: item.period,
    image: item.image,
    imageCredit: undefined as string | undefined,
    label: {ns: 'competitions', key: `status.${item.status}`},
    href: `/competitions/${item.id}`,
  })),
  ...activities.map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    period: item.period,
    image: item.image,
    imageCredit: item.imageCredit,
    label: {ns: 'news', key: `categories.${item.category}`},
    href: activityHref(item),
  })),
];

export default function ActivityCarousel() {
  const t = useTranslations('carousel');
  const tAll = useTranslations();
  const [active, setActive] = useState(0);
  // 使用者手動暫停
  const [paused, setPaused] = useState(false);
  // 滑鼠懸停或鍵盤焦點在輪播內時暫時停下
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const show = (index: number) => setActive((index + slides.length) % slides.length);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const playing = !paused && !reducedMotion && !hovered && !focused && slides.length > 1;

  // 依賴 active，手動切換後重新計時
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(current => (current + 1) % slides.length), interval);
    return () => window.clearTimeout(timer);
  }, [playing, active]);

  return (
    <section
      aria-label={t('label')}
      aria-roledescription={t('role')}
      className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          show(active + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}
      onTouchStart={(event) => {
        touchStart.current = {x: event.touches[0].clientX, y: event.touches[0].clientY};
      }}
      onTouchCancel={() => {touchStart.current = null;}}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(active + (dx < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {/* 所有投影片疊在同一格，高度取最高一張，切換時不跳動；自動播放時不朗讀，避免打斷讀屏 */}
      <div aria-live={playing ? 'off' : 'polite'} className="grid">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            inert={index !== active}
            aria-roledescription={t('slideRole')}
            aria-label={t('position', {current: index + 1, total: slides.length})}
            className={`col-start-1 row-start-1 flex flex-col transition-opacity duration-700 motion-reduce:transition-none ${index === active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div className="relative aspect-[16/9] bg-gray-100">
              <Image src={slide.image} alt="" fill unoptimized priority={index === 0} sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
              {slide.imageCredit && (
                <span lang="zh-Hant" className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white">{slide.imageCredit}</span>
              )}
            </div>
            <div className="flex-1 px-5 pb-4 pt-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                <span className="rounded-md bg-brand-50 px-2 py-1 font-medium text-brand-800">{tAll(`${slide.label.ns}.${slide.label.key}`)}</span>
                <time lang="zh-Hant" dateTime={slide.date} className="tabular-nums text-gray-500">{slide.period}</time>
              </div>
              <h2 lang="zh-Hant" className="mt-2 text-lg font-semibold leading-snug text-gray-900 sm:text-xl">{slide.title}</h2>
              <Link href={slide.href} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-800 hover:underline">
                {t('details')}<ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-1.5">
        <div className="flex flex-wrap">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => show(index)} aria-label={t('goTo', {title: slide.title})} aria-current={active === index ? 'true' : undefined} className="flex h-11 w-6 items-center justify-center rounded-lg hover:bg-gray-50 sm:w-9">
              <span aria-hidden="true" className={`h-1.5 rounded-full transition-all ${active === index ? 'w-5 bg-brand-800' : 'w-1.5 bg-gray-300'}`} />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span aria-hidden="true" className="mr-2 hidden text-xs tabular-nums text-gray-500 sm:inline">{active + 1} / {slides.length}</span>
          {!reducedMotion && (
            <button type="button" aria-label={paused ? t('play') : t('pause')} onClick={() => setPaused(value => !value)} className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100">
              {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
            </button>
          )}
          <button type="button" aria-label={t('previous')} onClick={() => show(active - 1)} className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
          <button type="button" aria-label={t('next')} onClick={() => show(active + 1)} className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}
