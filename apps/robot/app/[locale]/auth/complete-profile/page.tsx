import { getTranslations } from 'next-intl/server';
import { createServerClient } from '@apstpm/database/server';
import { redirect } from 'next/navigation';
import CompleteProfileForm from '@/components/auth/CompleteProfileForm';
import { getSchools } from '@/lib/queries/schools';

export default async function CompleteProfilePage() {
  const t = await getTranslations('Auth');
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('profile_completed')
    .eq('id', user.id)
    .single();

  if (profile?.profile_completed) redirect('/qa');

  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('completeProfile')}</h1>
          <p className="text-gray-500 mb-6">{t('profileRequired')}</p>
          <CompleteProfileForm schools={schools} />
        </div>
      </div>
    </div>
  );
}
