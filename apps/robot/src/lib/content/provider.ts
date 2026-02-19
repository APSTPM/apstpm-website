import type {
  Announcement,
  RuleFile,
  CompetitionInfo,
  PastCompetition,
  ContactInfo
} from './types';

export interface ContentProvider {
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(slug: string): Promise<Announcement | null>;
  getRuleFiles(): Promise<RuleFile[]>;
  getCompetitionInfo(): Promise<CompetitionInfo | null>;
  getPastCompetitions(): Promise<PastCompetition[]>;
  getContactInfo(): Promise<ContactInfo | null>;
}
