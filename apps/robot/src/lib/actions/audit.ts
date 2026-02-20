'use server';

import type { Json } from '@apstpm/database';
import { createServerClient } from '@apstpm/database/server';
import { requireAuth } from './requireAuth';

const MAX_ACTION_LENGTH = 100;
const MAX_ENTITY_TYPE_LENGTH = 50;

export type LogAuditParams = {
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function logAudit(
  params: LogAuditParams,
  ctx?: { supabase: Awaited<ReturnType<typeof createServerClient>>; userId: string }
) {
  if (ctx) {
    return logAuditWithContext(params, ctx.supabase, ctx.userId);
  }
  const { supabase, user } = await requireAuth();
  return logAuditWithContext(params, supabase, user.id);
}

async function logAuditWithContext(
  params: LogAuditParams,
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  userId: string
) {
  const action = (params.action ?? '').trim().slice(0, MAX_ACTION_LENGTH);
  if (!action) throw new Error('Action is required');

  const entityType = params.entityType != null
    ? String(params.entityType).trim().slice(0, MAX_ENTITY_TYPE_LENGTH) || null
    : null;

  const entityId = params.entityId != null && params.entityId !== ''
    ? String(params.entityId).trim()
    : null;

  const metadata: Json = params.metadata != null && typeof params.metadata === 'object'
    ? (params.metadata as Json)
    : {};

  const { error } = await supabase.from('audit_logs').insert({
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
  });

  if (error) {
    console.error('Audit log failed:', error);
    throw new Error('Audit log failed');
  }
}
