'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Input, Button } from '@apstpm-website/ui';
import { Loader2, Send } from 'lucide-react';
import { createPost } from '@/lib/actions/qa';

export default function QaNewPostForm() {
  const t = useTranslations('QA');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const post = await createPost(formData);
      if (post) router.push(`/qa/${post.id}` as any);
    } catch (error) {
      console.error('Failed to create post:', error);
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('questionTitle')}
        </label>
        <Input
          name="title"
          placeholder={t('questionTitlePlaceholder')}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('questionContent')}
        </label>
        <textarea
          name="content"
          placeholder={t('questionContentPlaceholder')}
          required
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-robot-500 focus:ring-1 focus:ring-robot-500 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('tags')}
        </label>
        <Input
          name="tags"
          placeholder="例：比賽規則, 評分標準"
        />
        <p className="text-xs text-gray-500 mt-1">用逗號分隔多個標籤</p>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Send className="w-4 h-4 mr-2" />
          )}
          {loading ? t('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
