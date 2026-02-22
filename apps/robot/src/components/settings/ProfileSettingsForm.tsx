'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, SearchableSelect, toast } from '@apstpm-website/ui';
import { updateProfile } from '@/lib/actions/updateProfile';

interface School {
  id: string;
  code: string;
  name: string;
}

interface ProfileSettingsFormProps {
  schools: School[];
  initialData: {
    real_name: string;
    school_id: string;
  };
}

export default function ProfileSettingsForm({ schools, initialData }: ProfileSettingsFormProps) {
  const t = useTranslations('Settings');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [realName, setRealName] = useState(initialData.real_name);
  const [selectedSchool, setSelectedSchool] = useState(initialData.school_id);
  const submissionIdRef = useRef<string>(crypto.randomUUID());

  const isFormComplete = realName.trim() !== '' && selectedSchool !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('submissionId', submissionIdRef.current);
      await updateProfile(formData);
      submissionIdRef.current = crypto.randomUUID();
      setSuccess(true);
      toast.success(t('updateSuccess'));
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : '';
      const isRateLimited = rawMessage.includes('Too many requests');
      const message = isRateLimited
        ? (t('rateLimitError') || t('updateError'))
        : t('updateError');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('school')} <span className="text-red-500">*</span>
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
          placeholder={t('schoolPlaceholder')}
          searchPlaceholder={t('schoolSearchPlaceholder')}
          noResultsText={t('schoolNoResults')}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{t('updateSuccess')}</p>}

      <Button type="submit" className="w-full" disabled={!isFormComplete || loading}>
        {loading ? t('saving') : t('save')}
      </Button>
    </form>
  );
}
