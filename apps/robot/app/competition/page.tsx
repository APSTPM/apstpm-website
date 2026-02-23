import { contentProvider } from '@/lib/content';
import CompetitionPageContent from './CompetitionPageContent';

export default async function CompetitionPage() {
  const competitionInfo = await contentProvider.getCompetitionInfo();

  return (
    <CompetitionPageContent
      competitionInfo={competitionInfo}
    />
  );
}
