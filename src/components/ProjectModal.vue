<template>
  <div class="modal" :class="{ open: open }">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div class="modal-header">
        <h3 id="project-modal-title">{{ project?.title }}</h3>
        <button class="modal-close" aria-label="Schließen" @click="$emit('close')">×</button>
      </div>
      <p class="modal-period">{{ project?.period }}</p>
      <p>{{ project?.description }}</p>
      <div v-if="project" class="project-meta">
        <span v-for="tag in project.tags" :key="tag">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Project = import('../composables/useProjectFilters').ProjectItem;

defineProps<{
  open: boolean;
  project: Project | null;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>
