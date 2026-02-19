'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@apstpm-website/ui';
import { Send, Loader2 } from 'lucide-react';
import { createReply } from '@/lib/actions/qa';

interface QaReplyFormProps {
  postId: string;
}

export default function QaReplyForm({ postId }: QaReplyFormProps) {
  const t = useTranslations('QA');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      formData.append('postId', postId);
      await createReply(formData);
      formRef.current?.reset();
    } catch (error) {
      console.error('Failed to create reply:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-3">
      <textarea
        name="content"
        placeholder={t('replyPlaceholder')}
        required
        rows={4}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-robot-500 focus:ring-1 focus:ring-robot-500 resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} size="sm">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Send className="w-4 h-4 mr-2" />
          )}
          {t('submitReply')}
        </Button>
      </div>
    </form>
  );
}
