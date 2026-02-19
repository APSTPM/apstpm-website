'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@apstpm-website/ui';

const statusConfig = {
  open: { variant: 'warning' as const, key: 'statusOpen' },
  answered: { variant: 'success' as const, key: 'statusAnswered' },
  closed: { variant: 'secondary' as const, key: 'statusClosed' },
};

export default function QaStatusBadge({ status }: { status: 'open' | 'answered' | 'closed' }) {
  const t = useTranslations('QA');
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{t(config.key)}</Badge>;
}
