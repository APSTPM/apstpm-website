import { contentProvider } from '@/lib/content';
import HomePageContent from './HomePageContent';

export default async function HomePage() {
  const [announcements, contactInfo, competitionInfo] = await Promise.all([
    contentProvider.getAnnouncements(),
    contentProvider.getContactInfo(),
    contentProvider.getCompetitionInfo(),
  ]);

  return (
    <HomePageContent
      announcements={announcements}
      contactInfo={contactInfo}
      competitionInfo={competitionInfo}
    />
  );
}
