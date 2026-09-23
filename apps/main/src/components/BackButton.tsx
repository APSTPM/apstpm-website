import type {ComponentProps} from 'react';
import {ArrowLeft} from 'lucide-react';
import {Link} from '@/i18n/routing';

// 詳情頁的圓形返回按鈕，放在頁面根元素的第一個子元素，滾動時一直貼在導航欄下方
// 外層高度為 0，不佔版面；xl 以下疊在頁頭左上角（頁頭需預留空位），xl 起移到正文左側留白
export default function BackButton({href, label}: {href: ComponentProps<typeof Link>['href']; label: string}) {
  return (
    <div className="sticky top-16 z-40 h-0 px-4">
      <div className="relative mx-auto max-w-4xl">
        <Link
          href={href}
          aria-label={label}
          title={label}
          className="absolute left-0 top-4 flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-brand-700 shadow-sm backdrop-blur transition-colors hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800 xl:-left-16"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
