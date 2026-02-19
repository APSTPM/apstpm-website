'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button, SearchableSelect } from '@apstpm-website/ui';
import { completeProfile } from '@/lib/actions/profile';

interface School {
  id: string;
  code: string;
  name: string;
}

interface CompleteProfileFormProps {
  schools: School[];
}

export default function CompleteProfileForm({ schools }: CompleteProfileFormProps) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [realName, setRealName] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [userType, setUserType] = useState('');

  const isFormComplete = realName.trim() !== '' && selectedSchool !== '' && userType !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await completeProfile(formData);
      router.push('/qa');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
              className="w-4 h-4 text-robot-600 focus:ring-robot-500"
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
              className="w-4 h-4 text-robot-600 focus:ring-robot-500"
            />
            <span className="text-sm text-gray-700">{t('student')}</span>
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={!isFormComplete || loading}>
        {loading ? t('saving') : t('saveProfile')}
      </Button>
    </form>
  );
}
