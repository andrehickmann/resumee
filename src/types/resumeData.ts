export type ResumeLocale = 'de' | 'en';

export type ApiProject = {
  id: string;
  period: string;
  start: number;
  end: number;
  title: string;
  description: string;
  tags: string[];
  sortOrder: number;
};

export type ApiSkill = {
  id: string;
  title: string;
  tools: string;
  sortOrder: number;
};

export type ApiService = {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
};

export type ApiIndustry = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ApiTimelineEntry = {
  id: string;
  period: string;
  role: string;
  summary: string;
  sortOrder: number;
};

export type ResumeApiResponse = {
  locale: ResumeLocale;
  updatedAt: string;
  projects: ApiProject[];
  skills: ApiSkill[];
  services: ApiService[];
  industries: ApiIndustry[];
  timeline: ApiTimelineEntry[];
};
