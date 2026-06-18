import { computed, ref, type ComputedRef } from 'vue';

export type ProjectItem = {
  id?: string;
  period: string;
  start: number;
  end: number;
  title: string;
  description: string;
  tags: string[];
  sortOrder?: number;
};

export type ContentShape = {
  [key: string]: unknown;
  pageTitle: string;
  contactSuccessMessage?: string;
  filtersAll: string;
  stats: { key: string; value: string; label: string }[];
  nav: { id: string; label: string }[];
  industries: string[];
  projects: ProjectItem[];
};

export function useProjectFilters(copy: ComputedRef<ContentShape>) {
  const selectedTags = ref<string[]>([]);
  const selectedYears = ref<number[]>([]);

  const projectTags = computed(() => {
    const tags = new Set(copy.value.projects.flatMap((item) => item.tags));
    return [copy.value.filtersAll, ...tags];
  });

  const projectYears = computed(() => {
    const years = new Set<number>();
    copy.value.projects.forEach((project) => {
      const start = project.start ?? project.end;
      const end = project.end ?? project.start;
      if (!start || !end) return;
      for (let year = start; year <= end; year += 1) {
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  });

  const filteredProjects = computed(() => {
    const list =
      selectedTags.value.length === 0
        ? copy.value.projects
        : copy.value.projects.filter((project) =>
            selectedTags.value.some((tag) => project.tags.includes(tag))
          );
    const yearFiltered =
      selectedYears.value.length === 0
        ? list
        : list.filter((project) => {
            const start = project.start ?? project.end;
            const end = project.end ?? project.start;
            return selectedYears.value.some((year) => year >= start && year <= end);
          });
    return [...yearFiltered].sort((a, b) => {
      const endDiff = (b.end ?? b.start) - (a.end ?? a.start);
      if (endDiff !== 0) return endDiff;
      return (b.start ?? 0) - (a.start ?? 0);
    });
  });

  const activeFiltersCount = computed(() => selectedTags.value.length + selectedYears.value.length);

  const filteredCount = computed(() => filteredProjects.value.length);

  function toggleFilter(tag: string) {
    if (tag === copy.value.filtersAll) {
      selectedTags.value = [];
      return;
    }
    if (selectedTags.value.includes(tag)) {
      selectedTags.value = selectedTags.value.filter((item) => item !== tag);
    } else {
      selectedTags.value = [...selectedTags.value, tag];
    }
  }

  function toggleYear(year: number) {
    if (selectedYears.value.includes(year)) {
      selectedYears.value = selectedYears.value.filter((item) => item !== year);
    } else {
      selectedYears.value = [...selectedYears.value, year];
    }
  }

  function resetFilters() {
    selectedTags.value = [];
    selectedYears.value = [];
  }

  function isTagActive(tag: string) {
    if (tag === copy.value.filtersAll) {
      return selectedTags.value.length === 0;
    }
    return selectedTags.value.includes(tag);
  }

  function isYearActive(year: number) {
    return selectedYears.value.includes(year);
  }

  function resetOnLangChange() {
    selectedTags.value = [];
    selectedYears.value = [];
  }

  return {
    selectedTags,
    selectedYears,
    projectTags,
    projectYears,
    filteredProjects,
    filteredCount,
    activeFiltersCount,
    toggleFilter,
    toggleYear,
    resetFilters,
    isTagActive,
    isYearActive,
    resetOnLangChange
  };
}
