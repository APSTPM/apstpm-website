import * as React from 'react';
import { Inter, Space_Grotesk, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from '@apstpm-website/ui';

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

export default async function RootLayout({ children }: { children?: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="zh-TW">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansTC.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
