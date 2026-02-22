'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button, toast } from '@apstpm-website/ui';
import { Plus, Pencil, Trash2, X, Check, Loader2 } from 'lucide-react';
import { createCompetitionCategory, updateCompetitionCategory, deleteCompetitionCategory } from '@/lib/actions/competition-categories';

interface CompetitionCategory {
  id: string;
  name: string;
  name_en: string;
}

interface AdminCompetitionCategoryListProps {
  competitionCategories: CompetitionCategory[];
}

export default function AdminCompetitionCategoryList({ competitionCategories }: AdminCompetitionCategoryListProps) {
  const t = useTranslations('Admin');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const submissionIdRef = useRef<string | null>(null);

  const getOrCreateSubmissionId = () => {
    if (!submissionIdRef.current) {
      submissionIdRef.current = crypto.randomUUID();
    }
    return submissionIdRef.current;
  };

  const resetSubmissionId = () => {
    submissionIdRef.current = null;
  };

  const toggleAddForm = () => {
    resetSubmissionId();
    setEditingId(null);
    setShowAdd((prev) => !prev);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set('submissionId', getOrCreateSubmissionId());
      await createCompetitionCategory(formData);
      resetSubmissionId();
      setShowAdd(false);
      toast.success(t('categoryCreated'));
    } catch (error) {
      console.error('Failed to create competition category:', error);
      toast.error(t('categoryError'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set('submissionId', getOrCreateSubmissionId());
      await updateCompetitionCategory(id, formData);
      resetSubmissionId();
      setEditingId(null);
      toast.success(t('categoryUpdated'));
    } catch (error) {
      console.error('Failed to update competition category:', error);
      toast.error(t('categoryError'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setDeleteLoadingId(id);
    try {
      await deleteCompetitionCategory(id);
      toast.success(t('categoryDeleted'));
    } catch (error) {
      console.error('Failed to delete competition category:', error);
      toast.error(t('categoryError'));
    } finally {
      setDeleteLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('competitionCategoryManagement')}</h2>
        <Button size="sm" onClick={toggleAddForm}>
          <Plus className="w-4 h-4 mr-1" />
          {t('addCompetitionCategory')}
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-200 p-4 flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('categoryName')}</label>
            <input
              name="name"
              required
              placeholder={t('categoryNamePlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('categoryNameEn')}</label>
            <input
              name="name_en"
              placeholder={t('categoryNameEnPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
            />
          </div>
          <Button type="submit" size="sm" disabled={formLoading}>
            {formLoading ? t('saving') : t('save')}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              resetSubmissionId();
              setShowAdd(false);
            }}
            disabled={formLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {competitionCategories.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t('noCompetitionCategories')}</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">{t('categoryName')}</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">{t('categoryNameEn')}</th>
                <th className="text-right text-sm font-medium text-gray-600 px-4 py-3 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {competitionCategories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100 last:border-0">
                  {editingId === category.id ? (
                    <td colSpan={3} className="px-4 py-3">
                      <form onSubmit={(e) => handleUpdate(category.id, e)} className="flex items-center gap-3">
                        <input
                          name="name"
                          defaultValue={category.name}
                          required
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
                        />
                        <input
                          name="name_en"
                          defaultValue={category.name_en}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-robot-500 focus:border-transparent outline-none"
                        />
                        <Button type="submit" size="sm" disabled={formLoading}>
                          {formLoading ? t('saving') : <Check className="w-4 h-4" />}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            resetSubmissionId();
                            setEditingId(null);
                          }}
                          disabled={formLoading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm text-gray-700">{category.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{category.name_en || '-'}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              resetSubmissionId();
                              setShowAdd(false);
                              setEditingId(category.id);
                            }}
                            className="p-1.5 text-gray-400 hover:text-robot-600 rounded"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={deleteLoadingId === category.id}
                            title={deleteLoadingId === category.id ? t('deleting') : undefined}
                          >
                            {deleteLoadingId === category.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
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
