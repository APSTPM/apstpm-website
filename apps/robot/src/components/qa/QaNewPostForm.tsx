'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Input, Button, Badge, cn, toast } from '@apstpm-website/ui';
import { Loader2, Send, X } from 'lucide-react';
import { createPost } from '@/lib/actions/qa';

interface CompetitionCategory {
  id: string;
  name: string;
  name_en: string;
}

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  name?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  maxSelections?: number;
  required?: boolean;
}

function MultiSelect({
  options,
  value,
  onChange,
  name,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  noResultsText = 'No results',
  maxSelections = 3,
  required,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOptions = options.filter((o) => value.includes(o.value));

  const filtered = search
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(search.toLowerCase()) &&
          !value.includes(o.value)
      )
    : options.filter((o) => !value.includes(o.value));

  const availableCount = maxSelections - value.length;

  const open = useCallback(() => {
    if (availableCount <= 0) return;
    setIsOpen(true);
    setSearch('');
    setHighlightedIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [availableCount]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setHighlightedIndex(-1);
  }, []);

  const select = useCallback(
    (val: string) => {
      if (value.length >= maxSelections) return;
      onChange([...value, val]);
      close();
    },
    [value, maxSelections, onChange, close]
  );

  const remove = useCallback(
    (val: string) => {
      onChange(value.filter((v) => v !== val));
    },
    [value, onChange]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        open();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          select(filtered[highlightedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Backspace':
        if (search === '' && value.length > 0) {
          e.preventDefault();
          remove(value[value.length - 1]);
        }
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', !value.length && required && 'has-error')}
      onKeyDown={handleKeyDown}
    >
      {name && value.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}
      {required && value.length === 0 && (
        <input type="hidden" name={name} value="" required />
      )}

      <div
        className={cn(
          'min-h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 transition-colors',
          'focus-within:ring-2 focus-within:ring-robot-500 focus-within:border-transparent',
          isOpen && 'ring-2 ring-robot-500 border-transparent'
        )}
      >
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="flex items-center gap-1 pr-1 pl-2.5"
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(option.value);
                  }}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-gray-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {value.length < maxSelections && (
          <button
            type="button"
            onClick={() => (isOpen ? close() : open())}
            className="flex w-full items-center justify-between text-sm"
          >
            <span className={selectedOptions.length === 0 ? 'text-gray-400' : ''}>
              {selectedOptions.length > 0
                ? `${availableCount} 個可選`
                : placeholder}
            </span>
            <svg
              className={cn(
                'h-4 w-4 shrink-0 text-gray-400 transition-transform',
                isOpen && 'rotate-180'
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {value.length >= maxSelections && (
          <span className="text-xs text-gray-400">
            已達最大選擇數量 ({maxSelections})
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-robot-500 focus:ring-1 focus:ring-robot-500"
            />
          </div>

          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto px-1 pb-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400">{noResultsText}</li>
            ) : (
              filtered.map((option, idx) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value.includes(option.value)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => select(option.value)}
                  className={cn(
                    'cursor-pointer rounded-md px-3 py-2 text-sm transition-colors',
                    idx === highlightedIndex && 'bg-robot-50 text-robot-900',
                    value.includes(option.value) && 'font-medium text-robot-600',
                    idx !== highlightedIndex && 'hover:bg-gray-50'
                  )}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

interface QaNewPostFormProps {
  competitionCategories: CompetitionCategory[];
}

export default function QaNewPostForm({ competitionCategories }: QaNewPostFormProps) {
  const t = useTranslations('QA');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionId, setSubmissionId] = useState<string>(() => crypto.randomUUID());

  const isFormComplete = title.trim() !== '' && content.trim() !== '' && tags.length >= 1;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.currentTarget);
    setLoading(true);
    let keepLoadingUntilRouteChange = false;
    try {
      formData.set('submissionId', submissionId);
      const post = await createPost(formData);
      if (!post) {
        toast.error(t('postFailed'));
        return;
      }

      setSubmissionId(crypto.randomUUID());
      toast.success(t('postCreated'));
      keepLoadingUntilRouteChange = true;
      router.push(`/qa/${post.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error(t('postFailed'));
    } finally {
      if (!keepLoadingUntilRouteChange) {
        setLoading(false);
      }
    }
  };

  const categoryOptions: { value: string; label: string }[] = competitionCategories.map(
    (cat) => ({
      value: cat.id,
      label: cat.name,
    })
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="submissionId" value={submissionId} readOnly />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('questionTitle')} <span className="text-red-500">*</span>
        </label>
        <Input
          name="title"
          placeholder={t('questionTitlePlaceholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('questionContent')} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          placeholder={t('questionContentPlaceholder')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-robot-500 focus:ring-1 focus:ring-robot-500 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('tags')} <span className="text-red-500">*</span>
        </label>
        <MultiSelect
          name="tags"
          options={categoryOptions}
          value={tags}
          onChange={setTags}
          placeholder="選擇競賽類別..."
          searchPlaceholder="搜尋競賽類別..."
          noResultsText="找不到相關類別"
          maxSelections={3}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          最多可選擇 3 個標籤，已選擇 {tags.length}/3
        </p>
        {/* TODO: 當 CMS 完成後，需更新 competitionCategories 的獲取方式，改為從 CMS API 拉取標籤列表 */}
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={!isFormComplete || loading}>
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
