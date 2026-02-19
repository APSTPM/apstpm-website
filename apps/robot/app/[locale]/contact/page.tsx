import { contentProvider } from '@/lib/content';
import ContactPageContent from './ContactPageContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const contactInfo = await contentProvider.getContactInfo();

  return (
    <ContactPageContent
      locale={locale}
      contactInfo={contactInfo}
    />
  );
}
