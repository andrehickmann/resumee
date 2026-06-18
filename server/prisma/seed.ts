import { createHash } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
// @ts-expect-error Existing frontend content is authored as JavaScript.
import { contentDe } from '../../src/content.de.js';
// @ts-expect-error Existing frontend content is authored as JavaScript.
import { contentEn } from '../../src/content.en.js';
import type { SupportedLocale } from '../src/config.js';

type ProjectSeed = {
  period: string;
  start: number;
  end: number;
  title: string;
  description: string;
  tags: string[];
};

type SkillSeed = {
  title: string;
  tools: string;
};

type ServiceSeed = {
  title: string;
  description: string;
};

type TimelineSeed = {
  period: string;
  role: string;
  summary: string;
};

type Content = {
  projects: ProjectSeed[];
  stackItems: SkillSeed[];
  services: ServiceSeed[];
  industries: string[];
  careerTimeline: TimelineSeed[];
};

const prisma = new PrismaClient();
const contentByLocale: Record<SupportedLocale, Content> = {
  de: contentDe as Content,
  en: contentEn as Content
};

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_PRODUCTION_SEED !== 'true') {
  console.error('Refusing to seed production without ALLOW_PRODUCTION_SEED=true.');
  process.exit(1);
}

function stableUuid(input: string) {
  const hex = createHash('sha256').update(input).digest('hex').slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-${(
    (Number.parseInt(hex.slice(16, 18), 16) & 0x3f) |
    0x80
  )
    .toString(16)
    .padStart(2, '0')}${hex.slice(18, 20)}-${hex.slice(20, 32)}`;
}

async function seedLocale(locale: SupportedLocale, content: Content) {
  await prisma.project.deleteMany({ where: { locale } });
  await prisma.skill.deleteMany({ where: { locale } });
  await prisma.service.deleteMany({ where: { locale } });
  await prisma.industry.deleteMany({ where: { locale } });
  await prisma.timelineEntry.deleteMany({ where: { locale } });

  await prisma.project.createMany({
    data: content.projects.map((project, index) => ({
      id: stableUuid(`${locale}:project:${project.title}:${project.period}`),
      locale,
      period: project.period,
      start: project.start,
      end: project.end,
      title: project.title,
      description: project.description,
      tags: project.tags,
      sortOrder: index,
      published: true
    }))
  });

  await prisma.skill.createMany({
    data: content.stackItems.map((skill, index) => ({
      id: stableUuid(`${locale}:skill:${skill.title}`),
      locale,
      title: skill.title,
      tools: skill.tools,
      sortOrder: index,
      published: true
    }))
  });

  await prisma.service.createMany({
    data: content.services.map((service, index) => ({
      id: stableUuid(`${locale}:service:${service.title}`),
      locale,
      title: service.title,
      description: service.description,
      sortOrder: index,
      published: true
    }))
  });

  await prisma.industry.createMany({
    data: content.industries.map((industry, index) => ({
      id: stableUuid(`${locale}:industry:${industry}`),
      locale,
      name: industry,
      sortOrder: index,
      published: true
    }))
  });

  await prisma.timelineEntry.createMany({
    data: content.careerTimeline.map((entry, index) => ({
      id: stableUuid(`${locale}:timeline:${entry.period}:${entry.role}`),
      locale,
      period: entry.period,
      role: entry.role,
      summary: entry.summary,
      sortOrder: index,
      published: true
    }))
  });
}

for (const [locale, content] of Object.entries(contentByLocale) as Array<
  [SupportedLocale, Content]
>) {
  await seedLocale(locale, content);
}

await prisma.$disconnect();
