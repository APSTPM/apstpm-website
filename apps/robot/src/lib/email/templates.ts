const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #374151;
`;

const headerStyle = `
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 24px;
  border-radius: 8px 8px 0 0;
  text-align: center;
`;

const bodyStyle = `
  background: #ffffff;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

const buttonStyle = `
  display: inline-block;
  background: #2563eb;
  color: white;
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 16px;
`;

export function newReplyTemplate(params: {
  postTitle: string;
  postId: string;
  replierName: string;
  isOfficial: boolean;
  replyContent: string;
}) {
  const { postTitle, postId, replierName, isOfficial, replyContent } = params;
  const safeTitle = escapeHtml(postTitle);
  const safeName = escapeHtml(replierName);
  const safeContent = escapeHtml(replyContent);
  const officialBadge = isOfficial
    ? '<span style="background: #2563eb; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-left: 8px;">官方回覆</span>'
    : '';

  return `
    <div style="${baseStyle}">
      <div style="${headerStyle}">
        <h1 style="margin: 0; font-size: 20px;">APSTPM 賽規問答</h1>
      </div>
      <div style="${bodyStyle}">
        <h2 style="margin-top: 0;">您的問題有新回覆</h2>
        <p><strong>問題：</strong>${safeTitle}</p>
        <p><strong>回覆者：</strong>${safeName}${officialBadge}</p>
        <div style="border-left: 3px solid #2563eb; padding-left: 16px; margin: 16px 0; color: #4b5563;">
          ${safeContent}
        </div>
        <a href="${SITE_URL}/qa/${encodeURIComponent(postId)}" style="${buttonStyle}">查看完整回覆</a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
          此郵件由 APSTPM 賽規問答系統自動發送，請勿直接回覆。
        </p>
      </div>
    </div>
  `;
}

export function newPostTemplate(params: {
  postTitle: string;
  postId: string;
  authorName: string;
}) {
  const { postTitle, authorName } = params;
  const safeTitle = escapeHtml(postTitle);
  const safeName = escapeHtml(authorName);

  return `
    <div style="${baseStyle}">
      <div style="${headerStyle}">
        <h1 style="margin: 0; font-size: 20px;">APSTPM 賽規問答</h1>
      </div>
      <div style="${bodyStyle}">
        <h2 style="margin-top: 0;">有新的賽規問題</h2>
        <p><strong>問題：</strong>${safeTitle}</p>
        <p><strong>提問者：</strong>${safeName}</p>
        <a href="${SITE_URL}/admin/qa" style="${buttonStyle}">前往管理面板</a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
          此郵件由 APSTPM 賽規問答系統自動發送，請勿直接回覆。
        </p>
      </div>
    </div>
  `;
}
