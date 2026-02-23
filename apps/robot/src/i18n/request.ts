import { getRequestConfig } from 'next-intl/server';

const locale = 'zh-TW';

export default getRequestConfig(async () => {
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
