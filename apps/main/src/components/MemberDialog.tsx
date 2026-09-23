'use client';

import Image from 'next/image';
import {Dialog} from 'radix-ui';
import {useTranslations} from 'next-intl';
import {ExternalLink, UserRound, X} from 'lucide-react';

import type {OrganizationMember} from '@/data/organization';

type Props = {
  member: OrganizationMember | null;
  groupLabel: string;
  locale: 'en' | 'zh-TW';
  onClose: () => void;
};

// 組織架構成員詳情彈窗：照片、職務、本職、簡介、會內工作，以及可選的個人主頁連結
export default function MemberDialog({member, groupLabel, locale, onClose}: Props) {
  const t = useTranslations('about.member');

  return (
    <Dialog.Root open={member !== null} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-xl focus:outline-none">
          {member && (
            <div className="flex flex-col sm:flex-row">
              {/* 照片：手機上在頂部，桌面在左側 */}
              <div className="relative flex aspect-[4/3] items-center justify-center bg-gray-100 sm:aspect-auto sm:w-56 sm:shrink-0">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name[locale]} fill sizes="(min-width: 640px) 224px, 100vw" className="object-cover" />
                ) : (
                  <UserRound className="size-20 text-gray-300" strokeWidth={1.5} aria-hidden />
                )}
              </div>

              <div className="flex-1 p-6 sm:p-8">
                <p className="text-sm font-medium text-brand-600">{groupLabel}</p>
                <Dialog.Title className="mt-1 font-display text-2xl font-bold text-gray-900">{member.name[locale]}</Dialog.Title>
                <Dialog.Description className="mt-1 text-gray-600">{member.position[locale]}</Dialog.Description>

                <dl className="mt-6 space-y-5 text-sm leading-relaxed">
                  {member.affiliation && (
                    <div>
                      <dt className="font-semibold text-gray-900">{t('affiliation')}</dt>
                      <dd className="mt-1 text-gray-600">{member.affiliation[locale]}</dd>
                    </div>
                  )}
                  {member.bio && (
                    <div>
                      <dt className="font-semibold text-gray-900">{t('bio')}</dt>
                      <dd className="mt-1 text-gray-600">{member.bio[locale]}</dd>
                    </div>
                  )}
                  {member.duties && (
                    <div>
                      <dt className="font-semibold text-gray-900">{t('duties')}</dt>
                      <dd className="mt-1 text-gray-600">{member.duties[locale]}</dd>
                    </div>
                  )}
                </dl>

                {member.link && (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-800"
                  >
                    {t('homepage')}
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          )}

          <Dialog.Close
            aria-label={t('close')}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="size-5" aria-hidden />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
