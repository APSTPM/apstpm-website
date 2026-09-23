import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import SectionNav from '@/components/SectionNav';
import BackButton from '@/components/BackButton';
import {GallerySection, HighlightsSection, OrganizersSection, OverviewSection, SourcesSection} from '@/components/DetailContent';
import {competitions, getCompetition} from '@/data/competitions';

const statusClasses: Record<string, string> = {
  ongoing: 'bg-brand-600 text-white',
  upcoming: 'bg-amber-100 text-amber-800',
  ended: 'bg-gray-100 text-gray-500',
};

export function generateStaticParams() {
  return competitions.map(item => ({slug: item.id}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string; locale: string}>}): Promise<Metadata> {
  const {slug, locale} = await params;
  const competition = getCompetition(slug);
  if (!competition) return {};
  const t = await getTranslations({locale, namespace: 'nav'});
  // 上層 layout 已設字符串標題，模板傳不到這一層，這裡直接拼完整標題
  return {title: {absolute: `${competition.title} | ${t('siteName')}`}, description: competition.summary};
}

export default async function CompetitionDetailPage({params}: {params: Promise<{slug: string; locale: string}>}) {
  const {slug, locale} = await params;
  setRequestLocale(locale);
  const competition = getCompetition(slug);
  if (!competition) notFound();

  const t = await getTranslations('competitions');
  const tCommon = await getTranslations('common');

  const gallery = competition.gallery ?? [];
  const videos = competition.videos ?? [];
  const hasMedia = gallery.length > 0 || videos.length > 0;
  const mediaLabel = videos.length > 0 ? t('detail.media') : t('detail.gallery');
  const navItems = [
    {id: 'overview', label: t('detail.overview')},
    ...(hasMedia ? [{id: 'gallery', label: mediaLabel}] : []),
    {id: 'highlights', label: t('detail.highlights')},
    {id: 'organizers', label: t('detail.organizers')},
    {id: 'sources', label: t('detail.sources')},
  ];

  return (
    <div>
      <BackButton href="/competitions" label={tCommon('back')} />
      <SectionNav items={navItems} label={tCommon('onThisPage')} />
      <PageHeader
        narrow
        title={<span lang="zh-Hant">{competition.title}</span>}
        eyebrow={
          <>
            {/* 給懸浮返回按鈕留位，xl 起按鈕移到左側留白 */}
            <div aria-hidden className="h-8 xl:hidden" />
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[competition.status]}`}>
                {t(`status.${competition.status}`)}
              </span>
              <span lang="zh-Hant" className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">
                {competition.category}
              </span>
            </div>
          </>
        }
      >
        <div lang="zh-Hant" className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-gray-600">
          <div className="flex items-center gap-2"><span aria-hidden="true">📅</span><time dateTime={competition.date}>{competition.period}</time></div>
          <div className="flex items-center gap-2"><span aria-hidden="true">📍</span><span>{competition.location}</span></div>
        </div>
        {locale !== 'zh-TW' && <p className="mt-4 text-sm text-gray-500">{t('chineseOnly')}</p>}
      </PageHeader>

      <OverviewSection title={t('detail.overview')} cover={{src: competition.image, alt: competition.imageAlt ?? '', credit: competition.imageCredit}} paragraphs={competition.overview} />
      {hasMedia && <GallerySection title={mediaLabel} photos={gallery} videos={videos} />}
      <HighlightsSection title={t('detail.highlights')} items={competition.highlights} muted={hasMedia} />
      <OrganizersSection title={t('detail.organizers')} items={competition.organizers} muted={!hasMedia} />
      <SourcesSection title={t('detail.sources')} items={competition.sources} muted={hasMedia} />
    </div>
  );
}
