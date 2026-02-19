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

export async function createSchool(formData: FormData) {
  const { supabase } = await requireAdmin();

  const code = (formData.get('code') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();

  if (!code || !name) throw new Error('Code and name are required');

  const { error } = await supabase
    .from('schools')
    .insert({ code, name });

  if (error) throw error;
  revalidatePath('/admin/schools');
}

export async function updateSchool(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();

  const code = (formData.get('code') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();

  if (!code || !name) throw new Error('Code and name are required');

  const { error } = await supabase
    .from('schools')
    .update({ code, name })
    .eq('id', id);

  if (error) throw error;
  revalidatePath('/admin/schools');
}

export async function deleteSchool(id: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from('schools')
    .delete()
    .eq('id', id);

  if (error) throw error;
  revalidatePath('/admin/schools');
}
