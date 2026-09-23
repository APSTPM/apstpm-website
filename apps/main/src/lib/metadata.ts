import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

type Props = {params: Promise<{locale: string}>};

// 標題用導航欄的名稱，和頂部菜單一致；會名由 [locale]/layout 的標題模板統一加在後面
export function navTitle(key: 'about' | 'competitions' | 'news' | 'gallery' | 'contact') {
  return async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'nav'});
    return {title: t(key)};
  };
}
