import { createServerClient } from '@apstpm/database/server';
import { redirect } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default async function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (requireAdmin) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      redirect('/');
    }
  }

  return <>{children}</>;
}
