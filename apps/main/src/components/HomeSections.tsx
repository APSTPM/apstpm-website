import type {ReactNode} from 'react';
import Image from 'next/image';
import {getLocale, getTranslations} from 'next-intl/server';
import {ArrowRight, BookOpen, HeartHandshake, Lightbulb} from 'lucide-react';
import {Link} from '@/i18n/routing';
import {competitions} from '@/data/competitions';
import {activities, activityHref} from '@/data/activities';
import {galleryItems} from '@/data/gallery';

const previewLimit = 3;
const gridClassName = 'grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6';
const linkClassName = 'group block h-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800';

function PreviewSection({id, title, href, moreLabel, children, muted = false}: {
  id: string;
  title: string;
  href: string;
  moreLabel: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className={muted ? 'bg-gray-50' : 'bg-white'}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <h2 id={`${id}-title`} className="text-2xl font-bold text-gray-900">{title}</h2>
          <Link href={href} aria-label={`${moreLabel} · ${title}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800">
            {moreLabel}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}

function PreviewImage({src}: {src: string}) {
  return <Image src={src} alt="" width={800} height={500} unoptimized className="aspect-[8/5] w-full bg-gray-100 object-cover" />;
}

export default async function HomeSections() {
  const locale = await getLocale();
  const t = await getTranslations('homeIntro');
  const nav = await getTranslations('nav');
  const about = await getTranslations('about');
  const home = await getTranslations('home');
  const news = await getTranslations('news');
  const localized = (value: Record<string, string>) => value[locale] || value.en;
  const values = [
    {key: 'innovation', Icon: Lightbulb},
    {key: 'collaboration', Icon: BookOpen},
    {key: 'sustainability', Icon: HeartHandshake},
  ] as const;

  return (
    <>
      <PreviewSection id="home-competitions" title={nav('competitions')} href="/competitions" moreLabel={t('viewMore')} muted>
        <div className={gridClassName}>
          {competitions.slice(0, previewLimit).map(item => (
            <Link key={item.id} href={`/competitions/${item.id}`} className={linkClassName}>
              <PreviewImage src={item.image} />
              <div lang="zh-Hant" className="p-5 sm:p-6">
                <time dateTime={item.date} className="text-xs tabular-nums text-gray-500">{item.period}</time>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-gray-900 group-hover:text-brand-800">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection id="home-news" title={nav('news')} href="/news" moreLabel={t('viewMore')}>
        <div className={gridClassName}>
          {activities.slice(0, previewLimit).map(item => (
            <Link key={item.id} href={activityHref(item)} className={linkClassName}>
              <PreviewImage src={item.image} />
              <div lang="zh-Hant" className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                  <span lang={locale} className="rounded-md bg-brand-50 px-2 py-1 font-medium text-brand-800">{news(`categories.${item.category}`)}</span>
                  <time dateTime={item.date} className="tabular-nums text-gray-500">{item.period}</time>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900 group-hover:text-brand-800">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection id="home-gallery" title={nav('gallery')} href="/gallery" moreLabel={t('viewMore')} muted>
        <div className={gridClassName}>
          {galleryItems.slice(0, previewLimit).map(item => (
            <Link key={item.id} href={`/gallery#photo-${item.id}`} className={linkClassName}>
              <PreviewImage src={item.image} />
              <h3 className="p-5 text-base font-semibold text-gray-900 group-hover:text-brand-800">{localized(item.title)}</h3>
            </Link>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection id="home-about" title={home('aboutSection.title')} href="/about" moreLabel={t('viewMore')}>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">{home('aboutSection.description')}</p>
        <div className={gridClassName}>
          {values.map(({key, Icon}) => (
            <div key={key} className="rounded-xl border border-gray-200 p-5 sm:p-6">
              <Icon aria-hidden="true" className="mb-4 h-6 w-6 text-brand-800" />
              <h3 className="text-lg font-semibold text-gray-900">{about(`values.${key}`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{about(`values.${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </PreviewSection>

      <section aria-labelledby="home-contact-title" className="border-y border-brand-100 bg-brand-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="home-contact-title" className="text-2xl font-bold text-gray-900">{home('cta.title')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{home('cta.description')}</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-3 rounded-lg bg-brand-800 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800 sm:w-auto">
            {t('contact')}<ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
