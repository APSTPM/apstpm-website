import type {Metadata} from 'next';
import {Inter, Space_Grotesk, Noto_Sans_TC} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const tNav = await getTranslations({locale, namespace: 'nav'});
  const tHero = await getTranslations({locale, namespace: 'hero'});
  const siteName = tNav('siteName');

  return {
    // 首頁直接用會名，子頁面顯示為「頁面 | 會名」
    title: {default: siteName, template: `%s | ${siteName}`},
    description: tHero('subtitle'),
  };
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
    <html lang={resolvedLocale} data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansTC.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={resolvedLocale} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
