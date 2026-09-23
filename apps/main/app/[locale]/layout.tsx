import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const resolvedLocale = routing.locales.find(
    (supportedLocale) => supportedLocale.toLowerCase() === locale.toLowerCase()
  );

  if (!resolvedLocale) {
    notFound();
  }

  // next-intl 4 不調用這個就會讀請求頭，整站變成動態渲染；每個服務端頁面也要各自調用
  setRequestLocale(resolvedLocale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation locale={resolvedLocale} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
