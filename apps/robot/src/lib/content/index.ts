// Phase 3: Replace StaticContentProvider with PayloadCMSProvider
import { StaticContentProvider } from './static-provider';
import type { ContentProvider } from './provider';

export const contentProvider: ContentProvider = new StaticContentProvider();

export type { ContentProvider } from './provider';
export type {
  Announcement,
  RuleFile,
  CompetitionInfo,
  PastCompetition,
  ContactInfo,
  CompetitionCategory,
  Attachment
} from './types';
