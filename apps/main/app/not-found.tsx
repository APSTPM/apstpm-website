import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {title: '404 | 澳門科技實踐促進會'};

// 根佈局不輸出 <html>，未匹配路由的 404 要自己補上
export default function NotFound() {
  return (
    <html lang="zh-TW">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center antialiased">
        <p className="text-5xl font-bold text-brand-700">404</p>
        <p className="text-gray-600">找不到這個頁面 · Page not found</p>
        <Link href="/" className="text-brand-700 underline underline-offset-4">返回首頁 · Home</Link>
      </body>
    </html>
  );
}
