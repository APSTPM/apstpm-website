'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { createBrowserClient } from '@apstpm/database/browser';
import { Button } from '@apstpm-website/ui';
import { LogOut, User, Shield, Settings } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function UserMenu() {
  const t = useTranslations('Auth');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<{
    role?: string;
    real_name?: string | null;
    school?: { code: string; name: string } | null;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from('profiles')
          .select('role, real_name, school:schools!school_id(code, name)')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            setProfile(data ?? null);
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setProfile(null);
      } else {
        supabase
          .from('profiles')
          .select('role, real_name, school:schools!school_id(code, name)')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setProfile(data ?? null));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    window.location.href = '/';
  };

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button variant="outline" size="sm">
          {t('login')}
        </Button>
      </Link>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const displayName =
    profile?.real_name?.trim() ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0];
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition-colors"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName ?? ''}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-robot-100 flex items-center justify-center">
            <User className="w-4 h-4 text-robot-600" />
          </div>
        )}
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profile?.school ? `${profile.school.code} - ${profile.school.name}` : user.email}
              </p>
            </div>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                {t('admin')}
              </Link>
            )}
            <Link
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <Settings className="w-4 h-4" />
              {t('settings')}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              {t('logout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
