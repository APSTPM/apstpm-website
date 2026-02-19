import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { contentProvider } from '@/lib/content';
import { Link } from '@/i18n/routing';
import { FileText, Calendar, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function AnnouncementPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const announcement = await contentProvider.getAnnouncement(slug);

  if (!announcement) {
    notFound();
  }

  const t = await getTranslations('Announcements');
  const date = new Date(announcement.publishedAt).toLocaleDateString(
    locale,
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/announcements"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-robot-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('title')}
      </Link>

      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <header className="p-6 border-b border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {announcement.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>
        </header>

        <div className="p-6 prose prose-gray max-w-none">
          {announcement.content.split('\n').map((line, index) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('## ')) {
              return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{trimmed.slice(3)}</h2>;
            }
            if (trimmed.startsWith('### ')) {
              return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{trimmed.slice(4)}</h3>;
            }
            if (trimmed.startsWith('- ')) {
              return <li key={index} className="ml-4">{trimmed.slice(2)}</li>;
            }
            if (trimmed.match(/^\d+\. /)) {
              return <li key={index} className="ml-4 list-decimal">{trimmed.replace(/^\d+\. /, '')}</li>;
            }
            if (trimmed === '') {
              return <br key={index} />;
            }
            return <p key={index} className="mb-2">{trimmed}</p>;
          })}
        </div>

        {announcement.attachments && announcement.attachments.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('attachments')}
            </h3>
            <ul className="space-y-2">
              {announcement.attachments.map((attachment) => (
                <li key={attachment.id}>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-robot-700 hover:text-robot-800 hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    {attachment.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
