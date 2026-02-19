import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import AdminQaList from '@/components/admin/AdminQaList';
import { getPosts } from '@/lib/queries/qa';

export default async function AdminQaPage() {
  const t = await getTranslations('Admin');
  const { posts } = await getPosts({ pageSize: 100 });

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={'/admin' as any}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-robot-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToSite')}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-display mb-6">
            {t('qaManagement')}
          </h1>
          <AdminQaList posts={posts} />
        </div>
      </div>
    </AuthGuard>
  );
}
