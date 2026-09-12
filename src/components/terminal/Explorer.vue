<template>
  <aside class="term-explorer">
    <div class="term-explorer-label">Explorer</div>
    <div class="term-explorer-root">▾ portfolio/</div>

    <a
      v-for="file in files"
      :key="file.id"
      class="term-explorer-file"
      :class="{ 'is-active': file.id === active }"
      :href="`#${file.id}`"
      @click.prevent="$emit('navigate', file.id)"
    >
      <span :style="{ color: file.color }">{{ file.icon }}</span
      >{{ file.file }}
    </a>

    <div class="term-explorer-folder">▾ side-projects/</div>
    <a
      v-for="project in sideProjects"
      :key="project.slug"
      class="term-explorer-child"
      href="#side"
      @click.prevent="$emit('navigate', 'side')"
    >
      <span class="marker">▸</span>{{ project.slug }}/
    </a>

    <div class="term-explorer-label" style="padding-top: 1.4rem">Outline</div>
    <div v-for="stat in stats" :key="stat.label" class="term-explorer-stat">
      <span>{{ stat.label }}</span
      ><span class="value">{{ stat.value }}+</span>
    </div>

    <div class="term-explorer-foot">
      <div><span class="online">●</span> {{ eyebrow }}</div>
      <div style="margin-top: 0.4rem">
        <a :href="cvHref" target="_blank" rel="noreferrer">↓ {{ cvLabel }}</a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { TerminalFile } from '../../data/terminalFiles';

defineProps<{
  files: TerminalFile[];
  active: string;
  sideProjects: { slug: string }[];
  stats: { label: string; value: number }[];
  eyebrow: string;
  cvHref: string;
  cvLabel: string;
}>();

defineEmits<{
  (_e: 'navigate', _id: string): void;
}>();
</script>
