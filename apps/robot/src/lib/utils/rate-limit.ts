interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per window
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, newEntry);
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: newEntry.resetTime,
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key);
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

export const RATE_LIMIT_ERROR_CODE = 'RATE_LIMIT_EXCEEDED';
export const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR';
export const VALIDATION_ERROR_CODE = 'VALIDATION_ERROR';
export const AUTHORIZATION_ERROR_CODE = 'AUTHORIZATION_ERROR';

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

  if (error instanceof Error) {
    if (error.message.includes('Unauthorized')) {
      return createErrorResponse(
        AUTHORIZATION_ERROR_CODE,
        'Unauthorized',
        401
      );
    }

    if (
      error.message.includes('required') ||
      error.message.includes('invalid')
    ) {
      return createErrorResponse(
        VALIDATION_ERROR_CODE,
        error.message,
        400
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
