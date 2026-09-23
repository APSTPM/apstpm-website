import type {ReactNode} from 'react';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  // 標題上方的輔助內容，例如返回連結、狀態標籤
  eyebrow?: ReactNode;
  // 標題下方的補充內容，例如日期、地點
  children?: ReactNode;
  // 正文容器是 max-w-4xl 的頁面傳 true，讓標題與正文左緣對齊
  narrow?: boolean;
}

export default function PageHeader({title, subtitle, eyebrow, children, narrow = false}: PageHeaderProps) {
  return (
    <section className="border-b border-gray-200 bg-[#fafcf9] px-4">
      <div className={`mx-auto py-10 sm:py-12 ${narrow ? 'max-w-4xl' : 'max-w-7xl'}`}>
        {eyebrow}
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
