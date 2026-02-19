import { contentProvider } from '@/lib/content';
import CompetitionPageContent from './CompetitionPageContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CompetitionPage({ params }: PageProps) {
  const { locale } = await params;
  const competitionInfo = await contentProvider.getCompetitionInfo();

  return (
    <CompetitionPageContent
      locale={locale}
      competitionInfo={competitionInfo}
    />
  );
}
