'use server';

import { revalidatePath } from 'next/cache';
import { routing } from '@/i18n/routing';
import { logAudit } from './audit';
import { requireAuth } from './requireAuth';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function updateProfile(formData: FormData) {
  const { supabase, user } = await requireAuth();
  await checkRateLimit(supabase, 'profile:update');

  const realName = (formData.get('real_name') as string | null)?.trim();
  const schoolId = formData.get('school_id') as string | null;

  if (!realName) throw new Error('Real name is required');
  if (!schoolId) throw new Error('School is required');
  if (!UUID_REGEX.test(schoolId)) throw new Error('School must be a valid UUID');

  const { data: currentProfile, error: currentProfileError } = await supabase
    .from('profiles')
    .select('real_name, school_id')
    .eq('id', user.id)
    .single();

  if (currentProfileError) {
    console.error('Failed to fetch current profile:', currentProfileError);
    throw new Error('Update failed');
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      real_name: realName,
      school_id: schoolId,
    })
    .eq('id', user.id);

  if (error) {
    console.error('Failed to update profile:', error);
    throw new Error('Update failed');
  }

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
  }, { supabase, userId: user.id }).catch((err) => console.error('Audit log failed:', err));

  revalidatePath('/');
  revalidatePath('/settings');

  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/settings`);
  }
}
