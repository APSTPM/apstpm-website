export interface Attachment {
  id: string;
  title: string;
  url: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'zip' | string;
}

export interface Announcement {
  id: string;
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  attachments: Attachment[];
}

export interface RuleFile {
  id: string;
  title: string;
  url: string;
  category: 'regulations' | 'rules';
  year: number;
  updatedAt: string;
}

export interface CompetitionCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  ageGroup: string;
}

export interface CompetitionInfo {
  id: string;
  year: number;
  title: string;
  registrationPeriod: {
    start: string;
    end: string;
  };
  competitionDates: {
    start: string;
    end: string;
  };
  venue: string;
  categories: CompetitionCategory[];
  purpose: string;
  judgingCriteria: string[];
  awards: string[];
}

export interface PastCompetition {
  id: string;
  year: number;
  theme: string;
  description: string;
  highlights: string[];
  galleryImages: string[];
}

export interface ContactInfo {
  id: string;
  organizer: {
    name: string;
    nameEn: string;
  };
  coOrganizer: {
    name: string;
    nameEn: string;
  };
  cooperator: {
    name: string;
    nameEn: string;
  };
  email: string;
  phone: string;
  address: string;
  addressEn: string;
}
