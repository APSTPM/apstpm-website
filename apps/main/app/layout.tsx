import * as React from 'react';
import './globals.css';

// <html> 和 <body> 放在 [locale]/layout，才能按語言設置 lang
export default function RootLayout({children}: {children?: React.ReactNode}) {
  return children;
}
