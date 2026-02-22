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
    .select('real_name, school_id, user_type, profile_completed')
    .eq('id', user.id)
    .single();

  const schools = await getSchools();

  const isEditMode = !!profile?.real_name && !!profile?.school_id;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditMode ? t('editProfile') : t('completeProfile')}
          </h1>
          <p className="text-gray-500 mb-6">
            {isEditMode ? t('editProfileDescription') : t('profileRequired')}
          </p>
          <CompleteProfileForm
            schools={schools}
            initialData={{
              real_name: profile?.real_name ?? '',
              school_id: profile?.school_id ?? '',
              user_type: profile?.user_type ?? '',
            }}
            mode={isEditMode ? 'edit' : 'create'}
          />
        </div>
      </div>
    </div>
  );
}
