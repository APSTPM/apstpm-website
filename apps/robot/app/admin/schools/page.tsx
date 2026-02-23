import { getTranslations } from 'next-intl/server';
import AuthGuard from '@/components/auth/AuthGuard';
import AdminSchoolList from '@/components/admin/AdminSchoolList';
import { getSchools } from '@/lib/queries/schools';
import Link from 'next/link';
import { Button } from '@apstpm-website/ui';
import { ArrowLeft } from 'lucide-react';

export default async function AdminSchoolsPage() {
  const t = await getTranslations('Admin');
  const schools = await getSchools();

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('backToSite')}
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">{t('schoolManagement')}</h1>
            </div>
          </div>
          <AdminSchoolList schools={schools} />
        </div>
      </div>
    </AuthGuard>
  );
}
