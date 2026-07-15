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
        v-for="(project, index) in displayedProjects"
        :key="project.id || project.title"
        class="project-card reveal tilt"
        :class="{
          'project-cta': project.tags && project.tags.includes('Opportunity'),
          visible: index >= MOBILE_LIMIT && showAll
        }"
        role="button"
        tabindex="0"
        @click="$emit('open-project', project)"
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
    <div v-if="showLoadMore" class="load-more-wrapper">
      <button class="load-more-btn" @click="showAllProjects">
        {{ copy.loadMoreLabel || 'Mehr Projekte laden' }} ({{ remainingCount }})
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

type Project = import('../composables/useProjectFilters').ProjectItem;

const props = defineProps<{
  copy: Record<string, unknown>;
  filteredCount: number;
  activeFiltersCount: number;
  projectTags: string[];
  projectYears: number[];
  filteredProjects: Project[];
  isTagActive: (_tag: string) => boolean;
  isYearActive: (_year: number) => boolean;
}>();

defineEmits<{
  (_e: 'toggle-filter', _tag: string): void;
  (_e: 'toggle-year', _year: number): void;
  (_e: 'reset-filters'): void;
  (_e: 'open-project', _project: Project): void;
}>();

const showAll = ref(false);
const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth <= 700 : false);
const MOBILE_LIMIT = 9;

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 700;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const displayedProjects = computed(() => {
  if (!isMobile.value || showAll.value) {
    return props.filteredProjects;
  }
  return props.filteredProjects.slice(0, MOBILE_LIMIT);
});

const showLoadMore = computed(() => {
  return isMobile.value && !showAll.value && props.filteredProjects.length > MOBILE_LIMIT;
});

const remainingCount = computed(() => {
  return props.filteredProjects.length - MOBILE_LIMIT;
});

const showAllProjects = () => {
  showAll.value = true;
};

// Reset showAll when filters change
watch(
  () => props.filteredProjects.length,
  () => {
    if (showAll.value && props.filteredProjects.length <= MOBILE_LIMIT) {
      showAll.value = false;
    }
  }
);
</script>
