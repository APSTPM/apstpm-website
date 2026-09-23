import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import {competitions, getCompetition} from '@/data/competitions';

const statusClasses: Record<string, string> = {
  ongoing: 'bg-brand-600 text-white',
  upcoming: 'bg-amber-100 text-amber-800',
  ended: 'bg-gray-100 text-gray-500',
};

export function generateStaticParams() {
  return competitions.map(item => ({slug: item.id}));
}

export default async function CompetitionDetailPage({params}: {params: Promise<{slug: string; locale: string}>}) {
  const {slug, locale} = await params;
  setRequestLocale(locale);
  const competition = getCompetition(slug);
  if (!competition) notFound();

  const t = await getTranslations('competitions');
  const tCommon = await getTranslations('common');

  return (
    <div>
      <PageHeader
        narrow
        title={<span lang="zh-Hant">{competition.title}</span>}
        eyebrow={
          <>
            <Link href="/competitions" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors">
              ← {tCommon('back')}
            </Link>
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

      {/* Overview */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Image src={competition.image} alt="" width={1280} height={800} unoptimized className="aspect-[8/5] w-full bg-gray-100 object-cover" />
          <div className="p-8">
            <h2 className="text-2xl font-bold text-brand-700 font-display mb-4">{t('detail.overview')}</h2>
            <div lang="zh-Hant" className="space-y-4 text-lg text-gray-600 leading-relaxed">
              {competition.overview.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-8">{t('detail.highlights')}</h2>
          <dl lang="zh-Hant" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competition.highlights.map(item => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <dt className="text-sm font-semibold text-gray-500">{item.label}</dt>
                <dd className="mt-2 text-xl font-bold text-brand-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Organizers */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">{t('detail.organizers')}</h2>
          <dl lang="zh-Hant" className="space-y-4">
            {competition.organizers.map(item => (
              <div key={item.role} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="min-w-[140px] font-semibold text-brand-700">{item.role}</dt>
                <dd className="text-gray-700">{item.name}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sources */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">{t('detail.sources')}</h2>
          <ul lang="zh-Hant" className="space-y-3">
            {competition.sources.map(source => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline underline-offset-4 hover:text-brand-800">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
