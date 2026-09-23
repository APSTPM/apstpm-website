import {navTitle} from '@/lib/metadata';

// 頁面是客戶端組件，標題在這裡生成
export const generateMetadata = navTitle('competitions');

export default function Layout({children}: {children: React.ReactNode}) {
  return children;
}
