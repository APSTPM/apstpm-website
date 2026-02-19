import { contentProvider } from '@/lib/content';
import RulesPageContent from './RulesPageContent';

export default async function RulesPage() {
  const ruleFiles = await contentProvider.getRuleFiles();

  return <RulesPageContent ruleFiles={ruleFiles} />;
}
