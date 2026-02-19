import { getTranslations } from 'next-intl/server';
import { contentProvider } from '@/lib/content';
import AnnouncementCard from '@/components/AnnouncementCard';

export default async function AnnouncementsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations('Announcements');
  const announcements = await contentProvider.getAnnouncements();

  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="relative">
          {sortedAnnouncements.map((announcement, index) => (
            <div key={announcement.id} className="relative pl-8 pb-8 last:pb-0">
              <div className="absolute left-0 top-6 bottom-0 w-px bg-robot-200" />
              <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full bg-robot-600 border-2 border-white shadow-sm" />
              {index === 0 && (
                <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-robot-400 border-2 border-white shadow-sm" />
              )}
              <AnnouncementCard announcement={announcement} locale={locale} />
            </div>
          ))}

          {sortedAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {t('noAnnouncements')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
