'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';
import {ArrowRight} from 'lucide-react';
import ActivityCarousel from './ActivityCarousel';

export default function Hero() {
  const t = useTranslations('homeIntro');
  const locale = useLocale();

  return (
    <section aria-labelledby="home-title" className="border-b border-gray-200 bg-[#fafcf9]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-12 lg:py-12">
        <div>
          <h1 id="home-title" className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.65rem]">
            {locale === 'zh-TW' ? <><span className="block">澳門科技實踐</span><span className="block">促進會</span></> : 'APSTPM'}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-800 sm:text-lg">{t('headline')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="inline-flex min-h-11 items-center gap-4 rounded-lg bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-900">
              {t('about')}<ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-700 hover:text-brand-800">{t('contact')}</Link>
          </div>
        </div>
        <ActivityCarousel />
      </div>
    </section>
  );
}
