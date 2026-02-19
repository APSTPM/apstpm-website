import { contentProvider } from '@/lib/content';
import HomePageContent from './HomePageContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const [announcements, contactInfo, competitionInfo] = await Promise.all([
    contentProvider.getAnnouncements(),
    contentProvider.getContactInfo(),
    contentProvider.getCompetitionInfo(),
  ]);

  return (
    <HomePageContent
      locale={locale}
      announcements={announcements}
      contactInfo={contactInfo}
      competitionInfo={competitionInfo}
    />
  );
}
