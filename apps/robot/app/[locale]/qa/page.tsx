import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPosts } from '@/lib/queries/qa';
import { createServerClient } from '@apstpm/database/server';
import { Button } from '@apstpm-website/ui';
import { Plus } from 'lucide-react';
import QaList from '@/components/qa/QaList';

export default async function QaPage() {
  const t = await getTranslations('QA');
  const { posts, total } = await getPosts();
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-linear-to-b from-robot-50 to-white">
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-robot-600/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-3">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{t('subtitle')}</p>
          {user ? (
            <Link href={'/qa/new' as any}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('askQuestion')}
              </Button>
            </Link>
          ) : (
            <p className="text-sm text-gray-500">{t('loginToAsk')}</p>
          )}
        </div>
      </section>

      {/* List */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <QaList posts={posts} total={total} />
      </div>
    </div>
  );
}
