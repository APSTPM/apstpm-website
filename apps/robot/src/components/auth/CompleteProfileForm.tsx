'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button, SearchableSelect, toast } from '@apstpm-website/ui';
import { saveProfile } from '@/lib/actions/profile';
import { RateLimitError } from '@/lib/utils/rate-limit';

interface School {
  id: string;
  code: string;
  name: string;
}

interface InitialData {
  real_name: string;
  school_id: string;
  user_type: string;
}

interface CompleteProfileFormProps {
  schools: School[];
  initialData: InitialData;
  mode: 'create' | 'edit';
}

export default function CompleteProfileForm({ schools, initialData, mode }: CompleteProfileFormProps) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [realName, setRealName] = useState(initialData.real_name);
  const [selectedSchool, setSelectedSchool] = useState(initialData.school_id);
  const [userType, setUserType] = useState(initialData.user_type);
  const submitAttemptRef = useRef(0);

  const isFormComplete = realName.trim() !== '' && selectedSchool !== '' && userType !== '';
  const isSubmitting = loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    submitAttemptRef.current += 1;
    const attempt = submitAttemptRef.current;

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await saveProfile(formData, mode);

      if (mode === 'create') {
        router.push('/qa');
      } else {
        toast.success(t('updateSuccess'));
      }
    } catch (err: unknown) {
      // Only handle the most recent attempt
      if (attempt !== submitAttemptRef.current) return;

      if (err instanceof RateLimitError) {
        const message = t('rateLimitError') || 'Too many requests. Please try again later.';
        setError(message);
        toast.error(message);
      } else if (err instanceof Error) {
        const message = err.message || 'An error occurred';
        // Check for common error patterns and use i18n keys
        if (message.includes('required') || message.includes('invalid')) {
          setError(t('validationError') || message);
          toast.error(t('validationError') || message);
        } else {
          setError(t('saveError') || 'Failed to save. Please try again.');
          toast.error(t('saveError') || 'Failed to save. Please try again.');
        }
      } else {
        setError(t('saveError') || 'Failed to save. Please try again.');
        toast.error(t('saveError') || 'Failed to save. Please try again.');
      }
    } finally {
      // Only reset loading if this is still the most recent attempt
      if (attempt === submitAttemptRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="real_name" className="block text-sm font-medium text-gray-700 mb-1">
          {t('realName')} <span className="text-red-500">*</span>
        </label>
        <input
          id="real_name"
          name="real_name"
          type="text"
          required
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          placeholder={t('realNamePlaceholder')}
          disabled={isSubmitting}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('selectSchool')} <span className="text-red-500">*</span>
        </label>
        <SearchableSelect
          name="school_id"
          required
          value={selectedSchool}
          onChange={setSelectedSchool}
          options={schools.map((s) => ({
            value: s.id,
            label: `${s.code} - ${s.name}`,
          }))}
          placeholder={t('selectSchoolPlaceholder')}
          searchPlaceholder={t('searchSchoolPlaceholder')}
          noResultsText={t('noSchoolResults')}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('userType')} <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="user_type"
              value="teacher"
              required
              checked={userType === 'teacher'}
              onChange={() => setUserType('teacher')}
              disabled={isSubmitting}
              className="w-4 h-4 text-robot-600 focus:ring-robot-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">{t('teacher')}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="user_type"
              value="student"
              required
              checked={userType === 'student'}
              onChange={() => setUserType('student')}
              disabled={isSubmitting}
              className="w-4 h-4 text-robot-600 focus:ring-robot-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">{t('student')}</span>
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={!isFormComplete || loading}>
        {loading ? (mode === 'create' ? t('saving') : t('saving')) : t('saveProfile')}
      </Button>
    </form>
  );
}
