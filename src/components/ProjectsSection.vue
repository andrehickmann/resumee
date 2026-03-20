<template>
  <section id="projekte" class="section">
    <div class="section-header">
      <h2>{{ copy.projectsTitle }}</h2>
      <p>{{ copy.projectsIntro }}</p>
      <span class="count-pill">{{ filteredCount }} {{ copy.projectsCountLabel }}</span>
    </div>
    <details class="filters-panel">
      <summary class="filters-summary">
        {{ copy.filterToggleLabel }}
        <span class="filter-count">{{ activeFiltersCount }}</span>
      </summary>
      <div class="filters-block">
        <div class="filters">
          <span class="filter-label">{{ copy.filterTechLabel }}</span>
          <button
            v-for="tag in projectTags"
            :key="tag"
            class="filter"
            :class="{ active: isTagActive(tag) }"
            @click="$emit('toggle-filter', tag)"
          >
            {{ tag }}
          </button>
        </div>
        <div class="filters">
          <span class="filter-label">{{ copy.filterYearLabel }}</span>
          <button
            v-for="year in projectYears"
            :key="year"
            class="filter"
            :class="{ active: isYearActive(year) }"
            @click="$emit('toggle-year', year)"
          >
            {{ year }}
          </button>
        </div>
        <button class="filter reset" @click="$emit('reset-filters')">
          {{ copy.filterResetLabel }}
        </button>
      </div>
    </details>
    <div class="project-grid">
      <article
        v-for="project in filteredProjects"
        :key="project.title"
        class="project-card reveal tilt"
        :class="{ 'project-cta': project.tags && project.tags.includes('Opportunity') }"
        @click="$emit('open-project', project)"
        role="button"
        tabindex="0"
        @keydown.enter="$emit('open-project', project)"
        @keydown.space.prevent="$emit('open-project', project)"
      >
        <span class="project-year">{{ project.period }}</span>
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-meta">
          <span v-for="tag in project.tags" :key="tag">#{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Project = import('../composables/useProjectFilters').ProjectItem;

defineProps<{
  copy: Record<string, unknown>;
  filteredCount: number;
  activeFiltersCount: number;
  projectTags: string[];
  projectYears: number[];
  filteredProjects: Project[];
  isTagActive: (tag: string) => boolean;
  isYearActive: (year: number) => boolean;
}>();

defineEmits<{
  (e: 'toggle-filter', tag: string): void;
  (e: 'toggle-year', year: number): void;
  (e: 'reset-filters'): void;
  (e: 'open-project', project: Project): void;
}>();
</script>
