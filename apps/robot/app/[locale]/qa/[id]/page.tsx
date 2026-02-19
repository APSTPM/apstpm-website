import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPostById } from '@/lib/queries/qa';
import { createServerClient } from '@apstpm/database/server';
import QaDetail from '@/components/qa/QaDetail';
import QaReplyForm from '@/components/qa/QaReplyForm';

export default async function QaPostPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations('QA');

  let data;
  try {
    data = await getPostById(id);
  } catch {
    notFound();
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-linear-to-b from-robot-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href={'/qa' as any}
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-robot-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToList')}
        </Link>

        <QaDetail post={data.post} replies={data.replies} />

        {/* Reply form */}
        <div className="mt-6">
          {user ? (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('reply')}</h3>
              <QaReplyForm postId={id} />
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500 py-4">{t('loginToReply')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
