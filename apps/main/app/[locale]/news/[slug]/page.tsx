import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import SectionNav from '@/components/SectionNav';
import BackButton from '@/components/BackButton';
import {GallerySection, HighlightsSection, OrganizersSection, OverviewSection, SourcesSection} from '@/components/DetailContent';
import {activities, getActivity} from '@/data/activities';

// 本會承辦的比賽已有比賽詳情頁，這裡只生成其餘活動
export function generateStaticParams() {
  return activities.filter(item => !item.competitionId).map(item => ({slug: item.id}));
}

export const dynamicParams = false;

export async function generateMetadata({params}: {params: Promise<{slug: string; locale: string}>}): Promise<Metadata> {
  const {slug, locale} = await params;
  const activity = getActivity(slug);
  if (!activity) return {};
  const t = await getTranslations({locale, namespace: 'nav'});
  // 上層 layout 已設字符串標題，模板傳不到這一層，這裡直接拼完整標題
  return {title: {absolute: `${activity.title} | ${t('siteName')}`}, description: activity.summary};
}

export default async function ActivityDetailPage({params}: {params: Promise<{slug: string; locale: string}>}) {
  const {slug, locale} = await params;
  setRequestLocale(locale);
  const activity = getActivity(slug);
  if (!activity || activity.competitionId) notFound();

  const t = await getTranslations('news');
  const tDetail = await getTranslations('competitions.detail');
  const tCommon = await getTranslations('common');
  const videos = activity.videos ?? [];
  const hasGallery = activity.gallery.length > 0 || videos.length > 0;
  const mediaLabel = videos.length > 0 ? tDetail('media') : tDetail('gallery');

  const navItems = [
    {id: 'overview', label: tDetail('overview')},
    ...(hasGallery ? [{id: 'gallery', label: mediaLabel}] : []),
    {id: 'highlights', label: tDetail('highlights')},
    {id: 'organizers', label: tDetail('organizers')},
    {id: 'sources', label: tDetail('sources')},
  ];

  return (
    <div>
      <BackButton href="/news" label={tCommon('back')} />
      <SectionNav items={navItems} label={tCommon('onThisPage')} />
      <PageHeader
        narrow
        title={<span lang="zh-Hant">{activity.title}</span>}
        eyebrow={
          <>
            {/* 給懸浮返回按鈕留位，xl 起按鈕移到左側留白 */}
            <div aria-hidden className="h-8 xl:hidden" />
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">{t(`categories.${activity.category}`)}</span>
              <span lang="zh-Hant" className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{activity.role}</span>
            </div>
          </>
        }
      >
        <div lang="zh-Hant" className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-gray-600">
          <div className="flex items-center gap-2"><span aria-hidden="true">📅</span><time dateTime={activity.date}>{activity.period}</time></div>
          <div className="flex items-center gap-2"><span aria-hidden="true">📍</span><span>{activity.location}</span></div>
        </div>
        {locale !== 'zh-TW' && <p className="mt-4 text-sm text-gray-500">{t('chineseOnly')}</p>}
      </PageHeader>

      <OverviewSection title={tDetail('overview')} cover={{src: activity.image, alt: activity.imageAlt ?? '', credit: activity.imageCredit}} paragraphs={activity.overview} />
      {hasGallery && <GallerySection title={mediaLabel} photos={activity.gallery} videos={videos} />}
      <HighlightsSection title={tDetail('highlights')} items={activity.highlights} muted={hasGallery} />
      <OrganizersSection title={tDetail('organizers')} items={activity.organizers} muted={!hasGallery} />
      <SourcesSection title={tDetail('sources')} items={activity.sources} muted={hasGallery} />
    </div>
  );
}
