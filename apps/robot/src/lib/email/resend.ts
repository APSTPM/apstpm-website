import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'APSTPM <noreply@apstpm.org>';

function isInvalidApiKeyError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const maybeError = error as { statusCode?: number; name?: string; message?: string };
  return (
    maybeError.statusCode === 401 &&
    maybeError.name === 'validation_error' &&
    typeof maybeError.message === 'string' &&
    maybeError.message.toLowerCase().includes('api key is invalid')
  );
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping email');
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });

  if (error) {
    if (isInvalidApiKeyError(error)) {
      console.warn('RESEND_API_KEY is invalid, skipping email');
      return;
    }
    throw error;
  }
}
