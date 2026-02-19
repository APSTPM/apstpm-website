import { createServerClient } from '@apstpm/database/server';

export async function getSchools() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('schools')
    .select('id, code, name')
    .order('code', { ascending: true });

  if (error) throw error;
  return data ?? [];
}
