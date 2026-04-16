import type { PrismaClient } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { PrismaResumeRepository } from '../src/repository.js';

const updatedAt = new Date('2026-04-15T00:00:00.000Z');

function createModelMock(rows: unknown[]) {
  return {
    findMany: vi.fn(async () => rows)
  };
}

describe('PrismaResumeRepository', () => {
  it('queries only published records for the requested locale ordered by sortOrder', async () => {
    const project = createModelMock([
      {
        id: 'project-1',
        locale: 'en',
        period: '2026',
        start: 2026,
        end: 2026,
        title: 'Project',
        description: 'Description',
        tags: ['Vue'],
        sortOrder: 0,
        published: true,
        createdAt: updatedAt,
        updatedAt
      }
    ]);
    const skill = createModelMock([]);
    const service = createModelMock([]);
    const industry = createModelMock([]);
    const timelineEntry = createModelMock([]);
    const prisma = { project, skill, service, industry, timelineEntry } as unknown as PrismaClient;

    const repository = new PrismaResumeRepository(prisma);
    const result = await repository.getResume('en');

    expect(project.findMany).toHaveBeenCalledWith({
      where: { locale: 'en', published: true },
      orderBy: { sortOrder: 'asc' }
    });
    expect(skill.findMany).toHaveBeenCalledWith({
      where: { locale: 'en', published: true },
      orderBy: { sortOrder: 'asc' }
    });
    expect(result.projects).toEqual([
      {
        id: 'project-1',
        period: '2026',
        start: 2026,
        end: 2026,
        title: 'Project',
        description: 'Description',
        tags: ['Vue'],
        sortOrder: 0
      }
    ]);
    expect(result.updatedAt).toBe('2026-04-15T00:00:00.000Z');
  });
});
