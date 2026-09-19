'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import {LockKeyhole} from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-[#102d25] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-10 sm:px-8">
        <div className="grid gap-8 pb-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/logo.png" alt="" width={40} height={41} className="h-11 w-auto rounded bg-white p-1" />
              <span className="text-base font-semibold">{tNav('siteName')}</span>
            </Link>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{t('links.about')}</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white hover:underline">{tNav('about')}</Link></li>
              <li><Link href="/#home-events" className="hover:text-white hover:underline">{t('records')}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{t('sections.contact')}</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/contact" className="hover:text-white hover:underline">{t('links.contact')}</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline">{t('links.careers')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 text-xs text-gray-300">
          <p>© {new Date().getFullYear()} APSTPM. {t('copyright')}</p>
          <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 hover:text-white hover:underline"><LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />{t('admin')}</Link>
        </div>
      </div>
    </footer>
  );
}
