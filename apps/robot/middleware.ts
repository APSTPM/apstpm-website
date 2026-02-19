import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { updateSession } from '@apstpm/database/middleware';
import { createServerClient } from '@apstpm/database/server';

const intlMiddleware = createIntlMiddleware(routing);

const AUTH_PATHS = ['/auth/complete-profile', '/auth/login', '/auth/callback', '/auth/confirm'];

export default async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);

  const pathname = request.nextUrl.pathname;
  const pathWithoutLocale = pathname.replace(/^\/(en|zh-TW)/, '') || '/';

  const isAuthPath = AUTH_PATHS.some((p) => pathWithoutLocale.startsWith(p));

  let setProfileCompletedCookie = false;

  if (!isAuthPath && request.cookies.get('profile_completed')?.value !== 'true') {
    try {
      const supabase = await createServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_completed, role')
          .eq('id', user.id)
          .single();

        if (profile && !profile.profile_completed && profile.role !== 'admin') {
          const locale = pathname.match(/^\/(en|zh-TW)/)?.[1] || 'zh-TW';
          return NextResponse.redirect(new URL(`/${locale}/auth/complete-profile`, request.url));
        }

        if (profile?.profile_completed) {
          setProfileCompletedCookie = true;
        }
      }
    } catch {
      // continue without redirect on error
    }
  }

  const intlResponse = intlMiddleware(request);

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  if (setProfileCompletedCookie) {
    intlResponse.cookies.set('profile_completed', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
    });
  }

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
