'use client';

import {useEffect, useState} from 'react';

export type SectionNavItem = {
  id: string;
  label: string;
  // 1 = 主標題，2 = 子標題（短線、縮進）
  level?: 1 | 2;
};

// 標題滾到導航欄下方這個距離以內，就算作當前章節
const ACTIVE_OFFSET = 140;

// 右側懸浮目錄：平時只顯示一列短線，鼠標移上去展開標題列表（類似 Notion）
export default function SectionNav({items, label}: {items: SectionNavItem[]; label: string}) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = item.id;
      }
      // 滾到底部時，最後幾節可能永遠碰不到判定線，直接選最後一項
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1]?.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label={label} className="group fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      {/* 收起狀態：短線 */}
      <ul className="flex flex-col items-end gap-3 py-3 pl-6 pr-1 transition-opacity duration-150 group-hover:opacity-0 group-focus-within:opacity-0" aria-hidden>
        {items.map(item => (
          <li
            key={item.id}
            className={`h-0.5 rounded-full transition-colors ${item.level === 2 ? 'w-2.5' : 'w-4'} ${
              item.id === activeId ? 'bg-brand-700' : 'bg-gray-300'
            }`}
          />
        ))}
      </ul>

      {/* 展開狀態：標題列表 */}
      <ul className="absolute right-0 top-1/2 -translate-y-1/2 w-56 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-lg opacity-0 pointer-events-none translate-x-2 transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0">
        {items.map(item => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? 'location' : undefined}
                className={`block truncate rounded-md py-1.5 pr-3 text-sm transition-colors hover:bg-gray-50 ${
                  item.level === 2 ? 'pl-6' : 'pl-3'
                } ${active ? 'font-semibold text-brand-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
