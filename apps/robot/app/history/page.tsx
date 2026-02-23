import { contentProvider } from '@/lib/content';
import HistoryPageContent from './HistoryPageContent';

export default async function HistoryPage() {
  const pastCompetitions = await contentProvider.getPastCompetitions();

  return <HistoryPageContent pastCompetitions={pastCompetitions} />;
}
