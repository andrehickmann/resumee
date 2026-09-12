import { computed, ref, type ComputedRef } from 'vue';

export type ProjectItem = {
  period: string;
  start: number;
  end: number;
  title: string;
  description: string;
  tags: string[];
  /** The "your project could be here" entry: shown as a pitch, not as a commit. */
  placeholder?: boolean;
};

export type ProjectsCopy = {
  projects: ProjectItem[];
  rd: { all: string };
};

/** Number of log lines shown before the reader has to expand. */
const VISIBLE_LIMIT = 12;

/** Number of tag chips offered as filters, most frequent first. */
const TAG_LIMIT = 8;

/**
 * djb2 hash, rendered like an abbreviated git object name. Stable across reloads and
 * languages is not a goal - the titles differ per locale, the hashes may too.
 */
export function commitHash(value: string) {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).slice(0, 7).padStart(7, '0');
}

export function countedTags(projects: ProjectItem[]) {
  const counts = new Map<string, number>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
}

export function useTerminalProjects(copy: ComputedRef<ProjectsCopy>) {
  const selectedTags = ref<string[]>([]);
  const showAll = ref(false);

  const allProjects = computed(() => copy.value.projects.filter((project) => !project.placeholder));

  const topTags = computed(() => countedTags(allProjects.value).slice(0, TAG_LIMIT));

  const filteredProjects = computed(() => {
    const tags = selectedTags.value;
    const list = tags.length
      ? allProjects.value.filter((project) => tags.some((tag) => project.tags.includes(tag)))
      : allProjects.value;
    return [...list].sort((a, b) => b.end - a.end || b.start - a.start);
  });

  const visibleProjects = computed(() => {
    const list = showAll.value
      ? filteredProjects.value
      : filteredProjects.value.slice(0, VISIBLE_LIMIT);
    return list.map((project) => ({
      ...project,
      hash: commitHash(project.title),
      tagText: project.tags.join(' · ')
    }));
  });

  const hiddenCount = computed(() => filteredProjects.value.length - visibleProjects.value.length);

  const tagFilters = computed(() =>
    [copy.value.rd.all, ...topTags.value].map((label) => ({
      label,
      active:
        label === copy.value.rd.all
          ? selectedTags.value.length === 0
          : selectedTags.value.includes(label)
    }))
  );

  const activeTagText = computed(() =>
    selectedTags.value.length ? selectedTags.value.join(', ') : copy.value.rd.all
  );

  function toggleTag(label: string) {
    showAll.value = false;
    if (label === copy.value.rd.all) {
      selectedTags.value = [];
      return;
    }
    selectedTags.value = selectedTags.value.includes(label)
      ? selectedTags.value.filter((tag) => tag !== label)
      : [...selectedTags.value, label];
  }

  function selectOnlyTag(label: string) {
    showAll.value = false;
    selectedTags.value = [label];
  }

  function toggleShowAll() {
    showAll.value = !showAll.value;
  }

  function resetFilters() {
    selectedTags.value = [];
    showAll.value = false;
  }

  return {
    selectedTags,
    showAll,
    allProjects,
    topTags,
    tagFilters,
    activeTagText,
    filteredProjects,
    visibleProjects,
    hiddenCount,
    toggleTag,
    selectOnlyTag,
    toggleShowAll,
    resetFilters
  };
}
