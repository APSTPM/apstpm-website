/** RFC 4122 UUID v4 格式驗證 */
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * 驗證字串為有效 UUID，否則拋錯。
 * @param value 待驗證值
 * @param fieldName 欄位名稱（用於錯誤訊息）
 * @returns 驗證通過的 value
 */
export function assertUuid(
  value: string | null | undefined,
  fieldName: string
): string {
  if (!value || !UUID_REGEX.test(value)) {
    throw new Error(`${fieldName} is required and must be a valid UUID`);
  }
  return value;
}
