import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';
import type { ResumePayload, ResumeRepository } from '../src/repository.js';

function makePayload(locale: 'de' | 'en'): ResumePayload {
  return {
    locale,
    updatedAt: '2026-04-15T00:00:00.000Z',
    projects: [
      {
        id: 'project-1',
        period: '2026',
        start: 2026,
        end: 2026,
        title: locale === 'de' ? 'Deutsches Projekt' : 'English project',
        description: 'Description',
        tags: ['Vue'],
        sortOrder: 0
      }
    ],
    skills: [{ id: 'skill-1', title: 'Frontend', tools: 'Vue', sortOrder: 0 }],
    services: [{ id: 'service-1', title: 'Delivery', description: 'Build', sortOrder: 0 }],
    industries: [{ id: 'industry-1', name: 'SaaS', sortOrder: 0 }],
    timeline: [
      { id: 'timeline-1', period: '2026', role: 'Engineer', summary: 'Work', sortOrder: 0 }
    ]
  };
}

const repository: ResumeRepository = {
  async getResume(locale) {
    return makePayload(locale);
  }
};

describe('resume API', () => {
  it('returns health status', async () => {
    const app = buildApp(repository);
    const response = await app.inject({ method: 'GET', url: '/health' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ status: 'ok', service: 'resumee-api' });
  });

  it('returns German resume data', async () => {
    const app = buildApp(repository);
    const response = await app.inject({ method: 'GET', url: '/v1/resume?locale=de' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      locale: 'de',
      projects: [{ title: 'Deutsches Projekt', sortOrder: 0 }]
    });
  });

  it('returns English resume data', async () => {
    const app = buildApp(repository);
    const response = await app.inject({ method: 'GET', url: '/v1/resume?locale=en' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      locale: 'en',
      projects: [{ title: 'English project', sortOrder: 0 }]
    });
  });

  it('falls back to German for unsupported locales', async () => {
    const app = buildApp(repository);
    const response = await app.inject({ method: 'GET', url: '/v1/resume?locale=fr' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ locale: 'de' });
  });
});
