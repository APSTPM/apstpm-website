import type { ContentProvider } from './provider';
import type {
  Announcement,
  RuleFile,
  CompetitionInfo,
  PastCompetition,
  ContactInfo
} from './types';
import { announcements as announcementsData } from '../../data/announcements';
import { ruleFiles as rulesData } from '../../data/rules';
import { competitionInfo as competitionData } from '../../data/competition';
import { pastCompetitions as historyData } from '../../data/history';
import { contactInfo as contactData } from '../../data/contact';

export class StaticContentProvider implements ContentProvider {
  async getAnnouncements(): Promise<Announcement[]> {
    return announcementsData.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getAnnouncement(slug: string): Promise<Announcement | null> {
    return announcementsData.find((announcement) => announcement.slug === slug) || null;
  }

  async getRuleFiles(): Promise<RuleFile[]> {
    return rulesData.sort((a, b) => b.year - a.year);
  }

  async getCompetitionInfo(): Promise<CompetitionInfo | null> {
    return competitionData;
  }

  async getPastCompetitions(): Promise<PastCompetition[]> {
    return historyData.sort((a, b) => b.year - a.year);
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    return contactData;
  }
}
