/**
 * 控制字元正則：\x00-\x1f（ASCII 控制字元）與 \x7f（DEL）
 * 用於防禦 open redirect / response splitting
 */
const CONTROL_CHARS_REGEX = /[\x00-\x1f\x7f]/;

/**
 * 安全重導向路徑：驗證並淨化 redirect path，防止 open redirect 與 response splitting。
 * @param path - 原始 path（可能來自 query string）
 * @returns 安全的絕對路徑，不安全時回傳 '/'
 */
export function safeRedirectPath(path: string | null): string {
  if (!path || typeof path !== 'string') return '/';
  if (!path.startsWith('/') || path.startsWith('//')) return '/';
  if (CONTROL_CHARS_REGEX.test(path)) return '/';
  return path;
}
