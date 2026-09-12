<template>
  <section id="projekte" class="term-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / projekte.log</span>
    </div>
    <h2 class="term-h2">{{ rd.projectsTitle }}</h2>
    <p class="term-intro">{{ rd.projectsIntro }}</p>

    <div class="log-filters">
      <span class="term-command">{{ rd.projectsCommand }}</span>
      <button
        v-for="filter in tagFilters"
        :key="filter.label"
        class="log-chip"
        :class="{ 'is-active': filter.active }"
        type="button"
        @click="$emit('toggle-tag', filter.label)"
      >
        --grep={{ filter.label }}
      </button>
      <span class="log-count"
        >{{ filteredCount }}/{{ totalCount }} {{ rd.projectsCountLabel }}</span
      >
    </div>

    <div class="log">
      <div v-for="project in projects" :key="project.title" class="log-row">
        <div class="log-ref">
          <span class="hash">{{ project.hash }}</span>
          <span class="period">{{ project.period }}</span>
        </div>
        <div class="log-subject">
          <span class="title">{{ project.title }}</span>
          <span class="desc">— {{ project.description }}</span>
          <span class="tags">({{ project.tagText }})</span>
        </div>
      </div>

      <button v-if="hiddenCount > 0" class="log-toggle" type="button" @click="$emit('toggle-all')">
        : + {{ hiddenCount }} {{ rd.more }} — {{ rd.moreHint }}
      </button>
      <button
        v-else-if="showAll"
        class="log-toggle is-end"
        type="button"
        @click="$emit('toggle-all')"
      >
        (END) — {{ rd.less }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  rd: Record<string, string>;
  tagFilters: { label: string; active: boolean }[];
  projects: { title: string; period: string; description: string; hash: string; tagText: string }[];
  filteredCount: number;
  totalCount: number;
  hiddenCount: number;
  showAll: boolean;
}>();

defineEmits<{
  (_e: 'toggle-tag', _label: string): void;
  (_e: 'toggle-all'): void;
}>();
</script>
