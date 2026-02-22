import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import { createServerClient } from '@apstpm/database/server';
import AuthGuard from '@/components/auth/AuthGuard';
import QaNewPostForm from '@/components/qa/QaNewPostForm';
import { getCompetitionCategories } from '@/lib/queries/competition-categories';

async function checkProfileComplete(supabase: Awaited<ReturnType<typeof createServerClient>>, userId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('real_name, school_id')
    .eq('id', userId)
    .single();

  return profile?.real_name?.trim() && profile?.school_id;
}

export default async function QaNewPage() {
  const t = await getTranslations('QA');
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const isProfileComplete = await checkProfileComplete(supabase, user.id);
  if (!isProfileComplete) {
    redirect('/auth/complete-profile');
  }

  const competitionCategories = await getCompetitionCategories();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-linear-to-b from-robot-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={'/qa' as any}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-robot-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToList')}
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">
              {t('askQuestion')}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {t('newPostDescription')}
            </p>
            <QaNewPostForm competitionCategories={competitionCategories} />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
