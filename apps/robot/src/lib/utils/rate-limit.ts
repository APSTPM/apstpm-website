import type { SupabaseClient } from '@supabase/supabase-js';

/** RPC 支援的 action，須與 migration 008 的 allowlist 一致 */
export type RateLimitAction =
  | 'qa:create_post'
  | 'qa:create_reply'
  | 'profile:save'
  | 'profile:update'
  | 'admin:school:create'
  | 'admin:school:update'
  | 'admin:school:delete'
  | 'admin:category:create'
  | 'admin:category:update'
  | 'admin:category:delete'
  | 'admin:qa:toggle_pin'
  | 'admin:qa:delete_post'
  | 'admin:qa:delete_reply';

/** RPC check_rate_limit 回傳格式 */
interface CheckRateLimitRpcResult {
  allowed: boolean;
  remaining: number;
  reset_at: string;
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public readonly resetTime: number,
    public readonly remaining: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

/** RPC 失敗時拋出，採 fail-closed */
export class RateLimitServiceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'RateLimitServiceError';
  }
}

export const RATE_LIMIT_ERROR_CODE = 'RATE_LIMIT_EXCEEDED';
export const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR';
export const AUTHORIZATION_ERROR_CODE = 'AUTHORIZATION_ERROR';
export const SERVICE_UNAVAILABLE_ERROR_CODE = 'SERVICE_UNAVAILABLE';

export interface AppError {
  code: string;
  message: string;
  statusCode: number;
}

export function createErrorResponse(
  code: string,
  message: string,
  statusCode: number = 400
): AppError {
  return { code, message, statusCode };
}

export function mapErrorToResponse(error: unknown): AppError {
  if (error instanceof RateLimitError) {
    return createErrorResponse(
      RATE_LIMIT_ERROR_CODE,
      error.message,
      429
    );
  }

  if (error instanceof RateLimitServiceError) {
    return createErrorResponse(
      SERVICE_UNAVAILABLE_ERROR_CODE,
      error.message,
      503
    );
  }

  if (error instanceof Error) {
    if (error.message.includes('Unauthorized')) {
      return createErrorResponse(
        AUTHORIZATION_ERROR_CODE,
        'Unauthorized',
        401
      );
    }

    return createErrorResponse(
      UNKNOWN_ERROR_CODE,
      'An error occurred. Please try again later.',
      500
    );
  }

  return createErrorResponse(
    UNKNOWN_ERROR_CODE,
    'An unexpected error occurred.',
    500
  );
}

/**
 * 透過 Supabase RPC check_rate_limit 檢查限流。
 * RPC 內部使用 auth.uid() 識別使用者，故需傳入已認證的 supabase client。
 *
 * @param supabase - 已認證的 Supabase client（需有 user session）
 * @param action - 動作名稱，須為 RPC allowlist 中的值
 * @throws RateLimitError 當被限流時
 * @throws RateLimitServiceError 當 RPC 失敗時（fail-closed）
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  action: RateLimitAction
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const { data, error } = await supabase.rpc('check_rate_limit', {
    p_action: action,
  });

  if (error) {
    throw new RateLimitServiceError(
      'Rate limit service unavailable. Please try again later.',
      error
    );
  }

  const result = data as CheckRateLimitRpcResult | null;
  if (result == null || typeof result !== 'object') {
    throw new RateLimitServiceError(
      'Invalid rate limit response. Please try again later.'
    );
  }

  const resetTime = typeof result.reset_at === 'string'
    ? new Date(result.reset_at).getTime()
    : 0;
  const remaining = typeof result.remaining === 'number' ? result.remaining : 0;

  if (!result.allowed) {
    throw new RateLimitError(
      'Too many requests. Please try again later.',
      resetTime,
      remaining
    );
  }

  return {
    allowed: true,
    remaining,
    resetTime,
  };
}
