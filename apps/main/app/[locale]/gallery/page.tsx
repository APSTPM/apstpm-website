import {getTranslations, setRequestLocale} from 'next-intl/server';

import GalleryGrid from '@/components/GalleryGrid';
import {albums} from '@/data/gallery';

export default async function GalleryPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gallery');

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>
      {locale !== 'zh-TW' && (
        <div className="border-b border-gray-200 bg-[#fafcf9] px-4">
          <p className="mx-auto max-w-7xl py-3 text-sm text-gray-600">{t('chineseOnly')}</p>
        </div>
      )}

      <section className="bg-gray-50 px-4 pt-10 pb-16 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid albums={albums} />
        </div>
      </section>
    </div>
  );
}
