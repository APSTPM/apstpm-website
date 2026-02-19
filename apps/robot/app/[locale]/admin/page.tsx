import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import AuthGuard from '@/components/auth/AuthGuard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Button } from '@apstpm-website/ui';
import { MessageSquare } from 'lucide-react';

export default async function AdminPage() {
  const t = await getTranslations('Admin');

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">{t('title')}</h1>
              <p className="text-gray-500 mt-1">{t('dashboard')}</p>
            </div>
            <Link href={'/admin/qa' as any}>
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                {t('qaManagement')}
              </Button>
            </Link>
          </div>
          <AdminDashboard />
        </div>
      </div>
    </AuthGuard>
  );
}
