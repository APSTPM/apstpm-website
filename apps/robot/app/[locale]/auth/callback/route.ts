import { NextResponse } from 'next/server';
import { createServerClient } from '@apstpm/database/server';

function safeRedirectPath(path: string | null): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return '/';
  return path;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeRedirectPath(searchParams.get('next'));

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth`);
}
