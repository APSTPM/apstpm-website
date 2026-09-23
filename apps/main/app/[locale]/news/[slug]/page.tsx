import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import SectionNav from '@/components/SectionNav';
import {GallerySection, HighlightsSection, OrganizersSection, OverviewSection, SourcesSection} from '@/components/DetailContent';
import {activities, getActivity} from '@/data/activities';

// 本會承辦的比賽已有比賽詳情頁，這裡只生成其餘活動
export function generateStaticParams() {
  return activities.filter(item => !item.competitionId).map(item => ({slug: item.id}));
}

export const dynamicParams = false;

export default async function ActivityDetailPage({params}: {params: Promise<{slug: string; locale: string}>}) {
  const {slug, locale} = await params;
  setRequestLocale(locale);
  const activity = getActivity(slug);
  if (!activity || activity.competitionId) notFound();

  const t = await getTranslations('news');
  const tDetail = await getTranslations('competitions.detail');
  const tCommon = await getTranslations('common');
  const hasGallery = activity.gallery.length > 0;

  const navItems = [
    {id: 'overview', label: tDetail('overview')},
    ...(hasGallery ? [{id: 'gallery', label: tDetail('gallery')}] : []),
    {id: 'highlights', label: tDetail('highlights')},
    {id: 'organizers', label: tDetail('organizers')},
    {id: 'sources', label: tDetail('sources')},
  ];

  return (
    <div>
      <SectionNav items={navItems} label={tCommon('onThisPage')} />
      <PageHeader
        narrow
        title={<span lang="zh-Hant">{activity.title}</span>}
        eyebrow={
          <>
            <Link href="/news" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors">
              ← {tCommon('back')}
            </Link>
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
      {hasGallery && <GallerySection title={tDetail('gallery')} photos={activity.gallery} />}
      <HighlightsSection title={tDetail('highlights')} items={activity.highlights} muted={hasGallery} />
      <OrganizersSection title={tDetail('organizers')} items={activity.organizers} muted={!hasGallery} />
      <SourcesSection title={tDetail('sources')} items={activity.sources} muted={hasGallery} />
    </div>
  );
}
