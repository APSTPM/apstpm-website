'use server';

import { createServerClient } from '@apstpm/database/server';
import { revalidatePath } from 'next/cache';

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

  const name = (formData.get('name') as string)?.trim();
  const name_en = (formData.get('name_en') as string)?.trim() || null;

  if (!name) throw new Error('Name is required');

  const { error } = await supabase
    .from('competition_categories')
    .insert({ name, name_en });

  if (error) throw error;
  revalidatePath('/admin/competition-categories');
}

export async function updateCompetitionCategory(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = (formData.get('name') as string)?.trim();
  const name_en = (formData.get('name_en') as string)?.trim() || null;

  if (!name) throw new Error('Name is required');

  const { error } = await supabase
    .from('competition_categories')
    .update({ name, name_en })
    .eq('id', id);

  if (error) throw error;
  revalidatePath('/admin/competition-categories');
}

export async function deleteCompetitionCategory(id: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from('competition_categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
  revalidatePath('/admin/competition-categories');
}
