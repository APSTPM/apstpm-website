import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@apstpm/database/middleware';
import { createServerClient } from '@apstpm/database/server';

const AUTH_PATHS = ['/auth/complete-profile', '/auth/login', '/auth/callback', '/auth/confirm'];

export default async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  let setProfileCompletedCookie = false;

  if (!isAuthPath && request.cookies.get('profile_completed')?.value !== 'true') {
    let user: { id: string } | null = null;
    try {
      const supabase = await createServerClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_completed, role')
          .eq('id', user.id)
          .single();

        if (profile && !profile.profile_completed && profile.role !== 'admin') {
          return NextResponse.redirect(new URL('/auth/complete-profile', request.url));
        }

        if (profile?.profile_completed) {
          setProfileCompletedCookie = true;
        }
      }
    } catch {
      // 已登入使用者：fail-closed，導向補全資料頁
      if (user) {
        return NextResponse.redirect(new URL('/auth/complete-profile', request.url));
      }
      // 未登入使用者：fail-open，允許繼續到公開頁
    }
  }

  if (setProfileCompletedCookie) {
    supabaseResponse.cookies.set('profile_completed', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
    });
  }

  return supabaseResponse;
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
