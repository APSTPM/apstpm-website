'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { logAudit } from './audit';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function saveProfile(formData: FormData, mode: 'create' | 'edit') {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  await checkRateLimit(supabase, 'profile:save');

  const realName = (formData.get('real_name') as string)?.trim();
  const schoolId = formData.get('school_id') as string;
  const userType = formData.get('user_type') as string;

  if (!realName) throw new Error('Real name is required');
  if (!schoolId) throw new Error('School is required');
  if (!UUID_REGEX.test(schoolId)) throw new Error('School must be a valid UUID');
  if (!userType || !['teacher', 'student'].includes(userType)) throw new Error('User type is required');

  if (mode === 'create') {
    const { error } = await supabase
      .from('profiles')
      .update({
        real_name: realName,
        school_id: schoolId,
        user_type: userType as 'teacher' | 'student',
        profile_completed: true,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Failed to create profile:', error);
      throw new Error('Failed to save profile. Please try again later.');
    }

    const cookieStore = await cookies();
    cookieStore.set('profile_completed', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
    });

    revalidatePath('/');
  } else {
    const { data: currentProfile, error: currentProfileError } = await supabase
      .from('profiles')
      .select('real_name, school_id, user_type')
      .eq('id', user.id)
      .single();

    if (currentProfileError) {
      console.error('Failed to fetch current profile:', currentProfileError);
      throw new Error('Update failed. Please try again later.');
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        real_name: realName,
        school_id: schoolId,
        user_type: userType as 'teacher' | 'student',
      })
      .eq('id', user.id);

    if (error) {
      console.error('Failed to update profile:', error);
      throw new Error('Update failed. Please try again later.');
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
          user_type: userType,
        },
      },
    }, { supabase, userId: user.id }).catch((err) => console.error('Audit log failed:', err));

    revalidatePath('/');
    revalidatePath('/settings');
  }
}
