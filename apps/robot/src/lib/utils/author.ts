interface AuthorInfo {
  real_name: string | null;
  display_name: string | null;
  role: string;
  user_type: 'teacher' | 'student' | null;
  school: { code: string; name: string } | null;
}

export function formatAuthor(author: AuthorInfo | null): string {
  if (!author) return '匿名';
  if (author.role === 'admin') return '系統管理員 (無學校)';
  if (!author.real_name) return author.display_name || '匿名';
  const typeLabel = author.user_type === 'teacher' ? '老師' : author.user_type === 'student' ? '同學' : '';
  const typePart = typeLabel ? ` [${typeLabel}]` : '';
  if (author.school) {
    return `${author.real_name}${typePart} (${author.school.code} - ${author.school.name})`;
  }
  return `${author.real_name}${typePart}`;
}
