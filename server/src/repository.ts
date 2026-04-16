import type { PrismaClient } from '@prisma/client';
import type { SupportedLocale } from './config.js';

export type ResumeRepository = {
  getResume(_locale: SupportedLocale): Promise<ResumePayload>;
};

export type ResumePayload = {
  locale: SupportedLocale;
  updatedAt: string;
  projects: Array<{
    id: string;
    period: string;
    start: number;
    end: number;
    title: string;
    description: string;
    tags: string[];
    sortOrder: number;
  }>;
  skills: Array<{
    id: string;
    title: string;
    tools: string;
    sortOrder: number;
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    sortOrder: number;
  }>;
  industries: Array<{
    id: string;
    name: string;
    sortOrder: number;
  }>;
  timeline: Array<{
    id: string;
    period: string;
    role: string;
    summary: string;
    sortOrder: number;
  }>;
};

export class PrismaResumeRepository implements ResumeRepository {
  private readonly client: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.client = prisma;
  }

  async getResume(locale: SupportedLocale): Promise<ResumePayload> {
    const where = { locale, published: true };
    const [projects, skills, services, industries, timeline] = await Promise.all([
      this.client.project.findMany({ where, orderBy: { sortOrder: 'asc' } }),
      this.client.skill.findMany({ where, orderBy: { sortOrder: 'asc' } }),
      this.client.service.findMany({ where, orderBy: { sortOrder: 'asc' } }),
      this.client.industry.findMany({ where, orderBy: { sortOrder: 'asc' } }),
      this.client.timelineEntry.findMany({ where, orderBy: { sortOrder: 'asc' } })
    ]);

    const timestamps = [...projects, ...skills, ...services, ...industries, ...timeline].map(
      (item) => item.updatedAt.getTime()
    );
    const newest = timestamps.length ? new Date(Math.max(...timestamps)) : new Date(0);

    return {
      locale,
      updatedAt: newest.toISOString(),
      projects: projects.map(({ id, period, start, end, title, description, tags, sortOrder }) => ({
        id,
        period,
        start,
        end,
        title,
        description,
        tags,
        sortOrder
      })),
      skills: skills.map(({ id, title, tools, sortOrder }) => ({ id, title, tools, sortOrder })),
      services: services.map(({ id, title, description, sortOrder }) => ({
        id,
        title,
        description,
        sortOrder
      })),
      industries: industries.map(({ id, name, sortOrder }) => ({ id, name, sortOrder })),
      timeline: timeline.map(({ id, period, role, summary, sortOrder }) => ({
        id,
        period,
        role,
        summary,
        sortOrder
      }))
    };
  }
}
