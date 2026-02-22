<template>
  <div class="modal" :class="{ open: open }">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal-panel" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>{{ project?.title }}</h3>
        <button class="modal-close" @click="$emit('close')" aria-label="Schließen">×</button>
      </div>
      <p class="modal-period">{{ project?.period }}</p>
      <p>{{ project?.description }}</p>
      <div class="project-meta" v-if="project">
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
