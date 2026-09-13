// `?raw` keeps this free of node typings - the repo has no @types/node.
import indexHtml from '../../index.html?raw';
import { contentDe } from '../content.de.js';
import { contentEn } from '../content.en.js';

type SideProject = {
  name: string;
  shots: { src: string; label: string }[];
  links: { code: string; live: string };
};

/**
 * The two content files are edited by hand and drifted apart twice: the team count
 * said 15 in German and 40 in English, and the redesign copy gained keys on one side
 * only. These tests pin the parts that must not differ between languages.
 */
describe('content parity', () => {
  it('exposes the same top-level keys', () => {
    expect(Object.keys(contentEn).sort()).toEqual(Object.keys(contentDe).sort());
  });

  it('exposes the same redesign keys', () => {
    expect(Object.keys(contentEn.rd).sort()).toEqual(Object.keys(contentDe.rd).sort());
  });

  it('names a file for every section, in both languages', () => {
    const sections = [
      'profil',
      'leistungen',
      'stack',
      'branchen',
      'projekte',
      'side',
      'lebenslauf',
      'kontakt'
    ];
    expect(Object.keys(contentDe.rd.files).sort()).toEqual([...sections].sort());
    expect(Object.keys(contentEn.rd.files).sort()).toEqual([...sections].sort());
  });

  it('translates the file names rather than repeating the German ones', () => {
    const translated = ['profil', 'leistungen', 'branchen', 'projekte', 'lebenslauf', 'kontakt'];
    translated.forEach((id) => {
      expect(contentEn.rd.files[id]).not.toBe(contentDe.rd.files[id]);
    });
    // stack.json and side-projects/ are the same word in both languages.
    expect(contentEn.rd.files.stack).toBe(contentDe.rd.files.stack);
  });

  it('states the same numbers in both languages', () => {
    const values = (c: typeof contentDe) =>
      Object.fromEntries(c.stats.map((stat) => [stat.key, stat.value]));
    expect(values(contentEn)).toEqual(values(contentDe));
  });

  it('lists the same projects, with matching periods and tags', () => {
    expect(contentEn.projects).toHaveLength(contentDe.projects.length);
    contentDe.projects.forEach((project, index) => {
      const counterpart = contentEn.projects[index];
      expect(counterpart.start).toBe(project.start);
      expect(counterpart.end).toBe(project.end);
      expect(counterpart.tags).toEqual(project.tags);
      expect(Boolean(counterpart.placeholder)).toBe(Boolean(project.placeholder));
    });
  });

  it('lists the same side projects, in the same order', () => {
    const names = (side: SideProject[]) => side.map((project) => project.name);
    const sources = (project: SideProject) => project.shots.map((shot) => shot.src);

    expect(names(contentEn.side)).toEqual(names(contentDe.side));
    contentDe.side.forEach((project, index) => {
      const counterpart = contentEn.side[index];
      expect(sources(counterpart)).toEqual(sources(project));
      expect(counterpart.links).toEqual(project.links);
    });
  });

  it('offers the same number of stack groups and services', () => {
    expect(contentEn.stackItems).toHaveLength(contentDe.stackItems.length);
    expect(contentEn.services).toHaveLength(contentDe.services.length);
    expect(contentEn.industries).toHaveLength(contentDe.industries.length);
    expect(contentEn.careerTimeline).toHaveLength(contentDe.careerTimeline.length);
  });

  /**
   * index.html repeats the German description for the social preview, because crawlers
   * do not run JavaScript and useHead never reaches the prerendered HTML. That
   * duplication already drifted once - the hero slogan was reworded in the content
   * files while index.html kept the old wording - so it is pinned here.
   */
  it('keeps the social preview text in step with the content files', () => {
    const html = indexHtml;
    const tag = (property: string) =>
      html.match(new RegExp(`property="${property}"\\s+content="([^"]*)"`))?.[1];

    expect(tag('og:description')).toBe(contentDe.rd.pageDescription);
    expect(tag('twitter:description')).toBe(contentDe.rd.pageDescription);
  });

  it('describes the page in both languages', () => {
    expect(contentDe.rd.pageDescription).toBeTruthy();
    expect(contentEn.rd.pageDescription).toBeTruthy();
    expect(contentEn.rd.pageDescription).not.toBe(contentDe.rd.pageDescription);
  });

  it('points each language at its own CV file', () => {
    expect(contentDe.cvFile).toContain('Lebenslauf');
    expect(contentEn.cvFile).toContain('Resume');
  });
});
