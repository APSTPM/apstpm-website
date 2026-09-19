import {getTranslations} from 'next-intl/server';
import {ArrowUpRight} from 'lucide-react';
import Hero from '@/components/Hero';
import {homeSources} from '@/data/home';

export default async function HomePage() {
  const t = await getTranslations('homeIntro');
  const carousel = await getTranslations('carousel');

  return (
    <div>
      <Hero />
      <section id="home-events" aria-labelledby="records-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-8 sm:px-8 lg:py-10">
        <h2 id="records-title" className="mb-4 text-xl font-bold text-gray-900">{t('recordsTitle')}</h2>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {(['youthSkills', 'robotics'] as const).map((key) => (
            <a key={key} href={homeSources[key]} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4 text-gray-700 hover:text-brand-800 sm:gap-8">
              <span className="shrink-0 text-xs tabular-nums text-gray-500">{carousel(`${key}.date`)}</span>
              <span className="flex-1 text-sm leading-relaxed group-hover:underline">{carousel(`${key}.title`)}</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
