import { createServerClient } from '@apstpm/database/server';

export async function getCompetitionCategories() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('competition_categories')
    .select('id, name, name_en')
    .order('name', { ascending: true });

  if (error) throw error;
  return data ?? [];
}
