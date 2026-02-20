import { getTranslations } from 'next-intl/server';
import { createServerClient } from '@apstpm/database/server';
import { redirect } from 'next/navigation';
import ProfileSettingsForm from '@/components/settings/ProfileSettingsForm';
import { getSchools } from '@/lib/queries/schools';
import { Link } from '@/i18n/routing';

export default async function SettingsPage() {
  const t = await getTranslations('Settings');
  const tCommon = await getTranslations('Common');
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('real_name, school_id')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/auth/complete-profile');

  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/qa"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          ← {tCommon('back')}
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-500 mb-6">{t('subtitle')}</p>
          <ProfileSettingsForm
            schools={schools}
            initialData={{
              real_name: profile?.real_name ?? '',
              school_id: profile?.school_id ?? '',
            }}
          />
        </div>
      </div>
    </div>
  );
}
