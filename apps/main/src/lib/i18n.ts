import {locales, defaultLocale} from '@apstpm-website/i18n';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateStaticProps() {
  return {
    props: {},
  };
}

export { locales, defaultLocale };

export function isValidLocale(locale: string): locale is typeof locales[number] {
  return locales.includes(locale as typeof locales[number]);
}

export function getLocaleFromParams(params: { locale?: string }): string {
  const locale = params.locale;
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  return defaultLocale;
}

export function redirectToDefaultLocale() {
  notFound();
}
