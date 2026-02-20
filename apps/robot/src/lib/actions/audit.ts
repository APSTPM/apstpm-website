'use server';

import type { Json } from '@apstpm/database';
import { createServerClient } from '@apstpm/database/server';

const MAX_ACTION_LENGTH = 100;
const MAX_ENTITY_TYPE_LENGTH = 50;

async function requireAuth() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return { supabase, user };
}

export type LogAuditParams = {
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function logAudit(params: LogAuditParams) {
  const { supabase, user } = await requireAuth();

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
    user_id: user.id,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
  });

  if (error) throw error;
}
