'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_NAME_LENGTH = 200;

function assertUuid(value: string | null | undefined, fieldName: string): string {
  if (!value || !UUID_REGEX.test(value)) {
    throw new Error(`${fieldName} is required and must be a valid UUID`);
  }
  return value;
}

async function requireAdmin() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Forbidden');
  return { supabase, user };
}

export async function createCompetitionCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:category:create');

  const name = (formData.get('name') as string)?.trim();
  const name_en = (formData.get('name_en') as string)?.trim() || null;

  if (!name) throw new Error('Name is required');
  if (name.length > MAX_NAME_LENGTH) throw new Error(`Name must be under ${MAX_NAME_LENGTH} characters`);
  if (name_en && name_en.length > MAX_NAME_LENGTH) {
    throw new Error(`English name must be under ${MAX_NAME_LENGTH} characters`);
  }

  const { error } = await supabase
    .from('competition_categories')
    .insert({ name, name_en });

  if (error) {
    console.error('Failed to create competition category:', error);
    throw new Error('Failed to create category. Please try again later.');
  }
  revalidatePath('/admin/competition-categories');
}

export async function updateCompetitionCategory(id: string, formData: FormData) {
  assertUuid(id, 'id');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:category:update');

  const name = (formData.get('name') as string)?.trim();
  const name_en = (formData.get('name_en') as string)?.trim() || null;

  if (!name) throw new Error('Name is required');
  if (name.length > MAX_NAME_LENGTH) throw new Error(`Name must be under ${MAX_NAME_LENGTH} characters`);
  if (name_en && name_en.length > MAX_NAME_LENGTH) {
    throw new Error(`English name must be under ${MAX_NAME_LENGTH} characters`);
  }

  const { error } = await supabase
    .from('competition_categories')
    .update({ name, name_en })
    .eq('id', id);

  if (error) {
    console.error('Failed to update competition category:', error);
    throw new Error('Failed to update category. Please try again later.');
  }
  revalidatePath('/admin/competition-categories');
}

export async function deleteCompetitionCategory(id: string) {
  assertUuid(id, 'id');
  const { supabase } = await requireAdmin();
  await checkRateLimit(supabase, 'admin:category:delete');

  const { error } = await supabase
    .from('competition_categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete competition category:', error);
    throw new Error('Failed to delete category. Please try again later.');
  }
  revalidatePath('/admin/competition-categories');
}
