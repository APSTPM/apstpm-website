export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export interface Translations {
  [key: string]: string | Translations;
}

export const translations: Record<Locale, Translations> = {
  en: {
    common: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'APSTPM',
      subtitle: 'Advanced Power System Transient Stability Analysis Platform',
    },
  },
  zh: {
    common: {
      home: '首页',
      about: '关于',
      contact: '联系',
    },
    hero: {
      title: 'APSTPM',
      subtitle: '先进电力系统暂态稳定分析平台',
    },
  },
};

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[locale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
}
