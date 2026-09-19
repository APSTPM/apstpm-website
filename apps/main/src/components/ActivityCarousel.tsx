'use client';

import {useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {ArrowUpRight, ChevronLeft, ChevronRight, Bot} from 'lucide-react';
import {homeSources} from '@/data/home';

const slides = ['youthSkills', 'robotics'] as const;

export default function ActivityCarousel() {
  const t = useTranslations('carousel');
  const [active, setActive] = useState(0);
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const show = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section
      aria-label={t('label')}
      aria-roledescription={t('role')}
      className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white"
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
      <div aria-live="polite" aria-atomic="true">
        {slides.map((key, index) => (
          <article key={key} hidden={index !== active} aria-roledescription={t('slideRole')} aria-label={t('position', {current: index + 1, total: slides.length})}>
            {key === 'youthSkills' ? (
              <div className="relative aspect-[16/9] bg-gray-100">
                <Image src="/images/activities/youth-skills-2025.jpg" alt={t('youthSkills.alt')} fill sizes="(min-width: 1024px) 700px, 100vw" priority className="object-cover" />
                <a href={homeSources.youthSkills} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white hover:underline">{t('credit')}</a>
              </div>
            ) : (
              <div className="relative flex aspect-[16/9] items-center justify-between overflow-hidden bg-[#123f32] px-8 text-white sm:px-10" aria-hidden="true">
                <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full border border-white/15" />
                <div className="relative">
                  <p className="text-sm tracking-[0.15em] text-green-100">ROBOTICS</p>
                  <p className="mt-2 text-6xl font-light tracking-tight sm:text-8xl">2025</p>
                </div>
                <Bot className="relative h-24 w-24 text-green-100/80 sm:h-32 sm:w-32" strokeWidth={1} />
              </div>
            )}
            <div className="min-h-36 px-5 pb-4 pt-4 sm:px-6">
              <p className="text-xs text-gray-500">{t(`${key}.meta`)}</p>
              <h2 className="mt-2 text-lg font-semibold leading-snug text-gray-900 sm:text-xl">{t(`${key}.title`)}</h2>
              <a href={homeSources[key]} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-800 hover:underline">
                {t(`${key}.link`)}<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-1.5">
        <div className="flex gap-1">
          {slides.map((key, index) => (
            <button key={key} type="button" onClick={() => show(index)} aria-label={t('goTo', {title: t(`${key}.title`)})} aria-current={active === index ? 'true' : undefined} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-gray-50">
              <span aria-hidden="true" className={`h-1.5 rounded-full ${active === index ? 'w-6 bg-brand-800' : 'w-1.5 bg-gray-300'}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span aria-hidden="true" className="mr-3 text-xs tabular-nums text-gray-500">{active + 1} / {slides.length}</span>
          <button type="button" aria-label={t('previous')} onClick={() => show(active - 1)} className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
          <button type="button" aria-label={t('next')} onClick={() => show(active + 1)} className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}
