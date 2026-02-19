import { createServerClient } from '@apstpm/database/server';

// TODO(Phase 3): Replace with CMS API

export async function getRuleVersions() {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('rule_versions')
    .select('*, uploader:profiles!uploaded_by(display_name)')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getRuleVersionById(id: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('rule_versions')
    .select('*, uploader:profiles!uploaded_by(display_name)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
