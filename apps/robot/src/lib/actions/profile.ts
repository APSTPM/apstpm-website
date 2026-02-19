'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function completeProfile(formData: FormData) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const realName = (formData.get('real_name') as string)?.trim();
  const schoolId = formData.get('school_id') as string;
  const userType = formData.get('user_type') as string;

  if (!realName) throw new Error('Real name is required');
  if (!schoolId) throw new Error('School is required');
  if (!userType || !['teacher', 'student'].includes(userType)) throw new Error('User type is required');

  const { error } = await supabase
    .from('profiles')
    .update({
      real_name: realName,
      school_id: schoolId,
      user_type: userType as 'teacher' | 'student',
      profile_completed: true,
    })
    .eq('id', user.id);

  if (error) throw error;

  const cookieStore = await cookies();
  cookieStore.set('profile_completed', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
  });

  revalidatePath('/');
}
