'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@apstpm-website/ui';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { createSchool, updateSchool, deleteSchool } from '@/lib/actions/schools';

interface School {
  id: string;
  code: string;
  name: string;
}

interface AdminSchoolListProps {
  schools: School[];
}

export default function AdminSchoolList({ schools }: AdminSchoolListProps) {
  const t = useTranslations('Admin');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await createSchool(formData);
      setShowAdd(false);
    } catch (error) {
      console.error('Failed to create school:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateSchool(id, formData);
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update school:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setLoading(true);
    try {
      await deleteSchool(id);
    } catch (error) {
      console.error('Failed to delete school:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('schoolManagement')}</h2>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)}>
          <Plus className="w-4 h-4 mr-1" />
          {t('addSchool')}
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-200 p-4 flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('schoolCode')}</label>
            <input
              name="code"
              required
              placeholder={t('schoolCodePlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('schoolName')}</label>
            <input
              name="name"
              required
              placeholder={t('schoolNamePlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
            />
          </div>
          <Button type="submit" size="sm" disabled={loading}>
            {t('save')}
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setShowAdd(false)}>
            <X className="w-4 h-4" />
          </Button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {schools.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t('noSchools')}</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">{t('schoolCode')}</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">{t('schoolName')}</th>
                <th className="text-right text-sm font-medium text-gray-600 px-4 py-3 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-b border-gray-100 last:border-0">
                  {editingId === school.id ? (
                    <td colSpan={3} className="px-4 py-3">
                      <form onSubmit={(e) => handleUpdate(school.id, e)} className="flex items-center gap-3">
                        <input
                          name="code"
                          defaultValue={school.code}
                          required
                          className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
                        />
                        <input
                          name="name"
                          defaultValue={school.name}
                          required
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
                        />
                        <Button type="submit" size="sm" disabled={loading}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => setEditingId(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{school.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{school.name}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditingId(school.id)}
                            className="p-1.5 text-gray-400 hover:text-robot-600 rounded"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(school.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
