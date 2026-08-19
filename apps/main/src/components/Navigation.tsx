'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {useTransition, useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';

export default function Navigation({locale}: {locale: string}) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      window.location.href = `/${newLocale}${pathname}`;
    });
  };

  const navLinks = [
    {href: '/' as const, label: t('home')},
    {href: '/about' as const, label: t('about')},
    {href: '/competitions' as const, label: t('competitions')},
    {href: '/news' as const, label: t('news')},
    {href: '/gallery' as const, label: t('gallery')},
    {href: '/contact' as const, label: t('contact')},
  ];

  return (
    <nav
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center min-h-16 py-2 gap-2">
          {/* Logo + full name */}
          <Link
            href="/"
            aria-label={t('siteName')}
            className="flex items-center gap-2 min-w-0 justify-self-start z-10 group"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={40}
              height={41}
              className="h-9 w-9 sm:h-10 sm:w-10 shrink-0"
              priority
            />
            <span
              className={`min-w-0 font-display font-bold text-brand-800 leading-snug text-[13px] sm:text-sm lg:text-base ${
                locale === 'zh-TW' ? 'whitespace-nowrap' : 'text-balance'
              }`}
            >
              {t('siteName')}
            </span>
          </Link>

          {/* Desktop Nav — centered in the bar */}
          <div className="hidden lg:flex items-center justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive ? 'text-brand-700 font-semibold' : 'text-gray-600 hover:text-brand-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-brand-700"
                      transition={{type: 'spring', bounce: 0.2, duration: 0.6}}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Language switcher — far right */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3 justify-self-end z-10">
            <div className="flex gap-1">
              {(['en', 'zh-TW'] as const).map((loc) => {
                const isActive = locale === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    disabled={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => switchLocale(loc)}
                    className={`border rounded-md px-2 sm:px-3 py-1.5 text-xs font-semibold transition-all duration-300 disabled:opacity-100 ${
                      isActive
                        ? 'bg-brand-700 text-white border-brand-700 cursor-default'
                        : 'border-gray-300 text-gray-600 cursor-pointer hover:border-brand-700 hover:text-brand-700'
                    }`}
                  >
                    {loc === 'en' ? 'EN' : '中文'}
                  </button>
                );
              })}
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
