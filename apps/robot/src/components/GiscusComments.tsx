'use client';

import Giscus from '@giscus/react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface GiscusCommentsProps {
  locale?: string;
}

const GISCUS_REPO = (process.env.NEXT_PUBLIC_GISCUS_REPO || 'apstpm/website') as `${string}/${string}`;
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_kgDOExample';
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements';
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOExample1c4B';

export default function GiscusComments({ locale: propLocale }: GiscusCommentsProps) {
  const localeFromHook = useLocale();
  const t = useTranslations('Giscus');
  const [error, setError] = useState(false);
  
  const locale = propLocale || localeFromHook;
  const giscusLang = locale === 'zh-TW' ? 'zh-TW' : 'en';

  useEffect(() => {
    const handleError = () => setError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-600">{t('loadError')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {t('comments')}
      </h3>
      <Giscus
        repo={GISCUS_REPO}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang={giscusLang}
        loading="lazy"
      />
    </div>
  );
}
