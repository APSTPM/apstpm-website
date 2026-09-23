import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {ArrowLeft, LockKeyhole} from 'lucide-react';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'admin'});
  return {title: `${t('title')} | APSTPM`, robots: {index: false, follow: false}};
}

export default async function AdminPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('admin');

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-10">
        <LockKeyhole aria-hidden="true" className="mb-6 h-9 w-9 text-brand-800" strokeWidth={1.5} />
        <p className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{t('status')}</p>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-4 text-base leading-8 text-gray-600">{t('description')}</p>
        <p className="mt-4 border-t border-gray-100 pt-4 text-sm leading-7 text-gray-500">{t('availability')}</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-800 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{t('back')}</Link>
      </div>
    </section>
  );
}
