import { getTranslations } from 'next-intl/server';
import AuthGuard from '@/components/auth/AuthGuard';
import AdminCompetitionCategoryList from '@/components/admin/AdminCompetitionCategoryList';
import { getCompetitionCategories } from '@/lib/queries/competition-categories';
import { Link } from '@/i18n/routing';
import { Button } from '@apstpm-website/ui';
import { ArrowLeft } from 'lucide-react';

export default async function AdminCompetitionCategoriesPage() {
  const t = await getTranslations('Admin');
  const categories = await getCompetitionCategories();

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href={'/admin' as any}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('backToSite')}
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">{t('competitionCategoryManagement')}</h1>
            </div>
          </div>
          <AdminCompetitionCategoryList competitionCategories={categories} />
        </div>
      </div>
    </AuthGuard>
  );
}
