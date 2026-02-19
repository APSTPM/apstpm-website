import * as React from 'react';
import { Inter, Space_Grotesk, Noto_Sans_TC } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansTC.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
