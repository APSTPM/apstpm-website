export function formatDateBeijing(dateStr: string): string {
  return new Date(dateStr).toLocaleString('zh-TW', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
