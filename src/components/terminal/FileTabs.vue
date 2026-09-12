<template>
  <nav class="term-tabs">
    <a
      v-for="file in files"
      :key="file.id"
      class="term-tab"
      :class="{ 'is-active': file.id === active }"
      :href="`#${file.id}`"
      @click.prevent="$emit('navigate', file.id)"
    >
      <span :style="{ color: file.color }">{{ file.icon }}</span
      >{{ file.file }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import type { TerminalFile } from '../../data/terminalFiles';

defineProps<{
  files: TerminalFile[];
  active: string;
}>();

defineEmits<{
  (_e: 'navigate', _id: string): void;
}>();
</script>
