'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './requireAuth';
import { assertUuid } from '@/lib/utils/assert';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const MAX_CODE_LENGTH = 50;
const MAX_NAME_LENGTH = 200;

export async function createSchool(formData: FormData) {
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:school:create');

  const code = (formData.get('code') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();

  if (!code || !name) throw new Error('Code and name are required');
  if (code.length > MAX_CODE_LENGTH) throw new Error(`Code must be under ${MAX_CODE_LENGTH} characters`);
  if (name.length > MAX_NAME_LENGTH) throw new Error(`Name must be under ${MAX_NAME_LENGTH} characters`);

  const { error } = await supabase
    .from('schools')
    .insert({ code, name });

  if (error) {
    console.error('Failed to create school:', error);
    throw new Error('Failed to create school. Please try again later.');
  }
  revalidatePath('/admin/schools');
}

export async function updateSchool(id: string, formData: FormData) {
  assertUuid(id, 'id');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:school:update');

  const code = (formData.get('code') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();

  if (!code || !name) throw new Error('Code and name are required');
  if (code.length > MAX_CODE_LENGTH) throw new Error(`Code must be under ${MAX_CODE_LENGTH} characters`);
  if (name.length > MAX_NAME_LENGTH) throw new Error(`Name must be under ${MAX_NAME_LENGTH} characters`);

  const { error } = await supabase
    .from('schools')
    .update({ code, name })
    .eq('id', id);

  if (error) {
    console.error('Failed to update school:', error);
    throw new Error('Failed to update school. Please try again later.');
  }
  revalidatePath('/admin/schools');
}

export async function deleteSchool(id: string) {
  assertUuid(id, 'id');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:school:delete');

  const { error } = await supabase
    .from('schools')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete school:', error);
    throw new Error('Failed to delete school. Please try again later.');
  }
  revalidatePath('/admin/schools');
}
