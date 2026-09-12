import { computed, ref } from 'vue';
import {
  commitHash,
  countedTags,
  useTerminalProjects,
  type ProjectItem
} from '../useTerminalProjects';

function project(overrides: Partial<ProjectItem>): ProjectItem {
  return {
    period: '2024',
    start: 2024,
    end: 2024,
    title: 'Project',
    description: 'Description',
    tags: ['Vue'],
    ...overrides
  };
}

const sample = [
  project({ title: 'Placeholder', start: 2026, end: 2026, placeholder: true, tags: ['Next'] }),
  project({ title: 'Newest', start: 2025, end: 2026, tags: ['Vue', 'Scala'] }),
  project({ title: 'Older', start: 2019, end: 2020, tags: ['Vue'] }),
  project({ title: 'Oldest', start: 2010, end: 2012, tags: ['PHP'] })
];

function setup(projects = sample) {
  const copy = computed(() => ({ projects, rd: { all: 'Alle' } }));
  return useTerminalProjects(copy);
}

describe('commitHash', () => {
  it('returns seven stable hex characters', () => {
    expect(commitHash('Ticketing Plattform')).toHaveLength(7);
    expect(commitHash('Ticketing Plattform')).toBe(commitHash('Ticketing Plattform'));
    expect(commitHash('a')).toMatch(/^[0-9a-f]{7}$/);
  });

  it('separates different titles', () => {
    expect(commitHash('one')).not.toBe(commitHash('two'));
  });
});

describe('countedTags', () => {
  it('orders tags by how often they appear, keeping the original order on ties', () => {
    expect(countedTags(sample)).toEqual(['Vue', 'Next', 'Scala', 'PHP']);
  });
});

describe('useTerminalProjects', () => {
  it('leaves the placeholder project out of the log', () => {
    const { allProjects } = setup();
    expect(allProjects.value.map((entry) => entry.title)).toEqual(['Newest', 'Older', 'Oldest']);
  });

  it('sorts by end year, then by start year', () => {
    const { filteredProjects } = setup();
    expect(filteredProjects.value.map((entry) => entry.title)).toEqual([
      'Newest',
      'Older',
      'Oldest'
    ]);
  });

  it('filters by tag and reports "Alle" as active while nothing is selected', () => {
    const { tagFilters, toggleTag, filteredProjects, activeTagText } = setup();
    expect(tagFilters.value[0]).toEqual({ label: 'Alle', active: true });

    toggleTag('PHP');
    expect(filteredProjects.value.map((entry) => entry.title)).toEqual(['Oldest']);
    expect(activeTagText.value).toBe('PHP');

    toggleTag('PHP');
    expect(filteredProjects.value).toHaveLength(3);
    expect(activeTagText.value).toBe('Alle');
  });

  it('clears the selection when "Alle" is picked', () => {
    const { toggleTag, selectedTags } = setup();
    toggleTag('Vue');
    toggleTag('Alle');
    expect(selectedTags.value).toEqual([]);
  });

  it('collapses the list again when a filter changes', () => {
    const { toggleShowAll, toggleTag, showAll } = setup();
    toggleShowAll();
    expect(showAll.value).toBe(true);
    toggleTag('Vue');
    expect(showAll.value).toBe(false);
  });

  it('caps the visible rows and reports the remainder', () => {
    const many = Array.from({ length: 20 }, (_, index) =>
      project({ title: `Project ${index}`, start: 2000 + index, end: 2000 + index })
    );
    const { visibleProjects, hiddenCount, toggleShowAll } = setup(many);
    expect(visibleProjects.value).toHaveLength(12);
    expect(hiddenCount.value).toBe(8);

    toggleShowAll();
    expect(visibleProjects.value).toHaveLength(20);
    expect(hiddenCount.value).toBe(0);
  });

  it('decorates visible rows with a hash and a joined tag list', () => {
    const { visibleProjects } = setup();
    expect(visibleProjects.value[0].hash).toBe(commitHash('Newest'));
    expect(visibleProjects.value[0].tagText).toBe('Vue · Scala');
  });

  it('selectOnlyTag replaces the whole selection', () => {
    const { toggleTag, selectOnlyTag, selectedTags } = setup();
    toggleTag('Vue');
    toggleTag('Scala');
    selectOnlyTag('PHP');
    expect(selectedTags.value).toEqual(['PHP']);
  });

  it('keeps working when the copy behind it swaps language', () => {
    const projects = ref(sample);
    const copy = computed(() => ({ projects: projects.value, rd: { all: 'All' } }));
    const { tagFilters } = useTerminalProjects(copy);
    expect(tagFilters.value[0].label).toBe('All');
  });
});
