import { contentProvider } from '@/lib/content';
import ContactPageContent from './ContactPageContent';

export default async function ContactPage() {
  const contactInfo = await contentProvider.getContactInfo();

  return (
    <ContactPageContent
      contactInfo={contactInfo}
    />
  );
}
