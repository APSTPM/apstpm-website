import {setRequestLocale} from 'next-intl/server';
import Hero from '@/components/Hero';
import HomeSections from '@/components/HomeSections';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Hero />
      <HomeSections />
    </div>
  );
}
