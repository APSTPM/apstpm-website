'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from './requireAuth';
import { assertUuid } from '@/lib/utils/assert';
import { checkRateLimit } from '@/lib/utils/rate-limit';

const MAX_NAME_LENGTH = 200;

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
