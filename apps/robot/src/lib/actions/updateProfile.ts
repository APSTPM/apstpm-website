'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';
import { routing } from '@/i18n/routing';
import { logAudit } from './audit';

async function requireAuth() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return { supabase, user };
}

export async function updateProfile(formData: FormData) {
  const { supabase, user } = await requireAuth();

  const realName = (formData.get('real_name') as string | null)?.trim();
  const schoolId = formData.get('school_id') as string | null;

  if (!realName) throw new Error('Real name is required');
  if (!schoolId) throw new Error('School is required');

  const { data: currentProfile, error: currentProfileError } = await supabase
    .from('profiles')
    .select('real_name, school_id')
    .eq('id', user.id)
    .single();

  if (currentProfileError) throw currentProfileError;

  const { error } = await supabase
    .from('profiles')
    .update({
      real_name: realName,
      school_id: schoolId,
    })
    .eq('id', user.id);

  if (error) throw error;

  await logAudit({
    action: 'profile_update',
    entityType: 'profile',
    entityId: user.id,
    metadata: {
      old_data: currentProfile,
      new_data: {
        real_name: realName,
        school_id: schoolId,
      },
    },
  }).catch((err) => console.error('Audit log failed:', err));

  revalidatePath('/');
  revalidatePath('/settings');

  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/settings`);
  }
}
