<template>
  <div class="modal" :class="{ open: open }">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal-panel" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>{{ copy.konamiTitle }}</h3>
        <button class="modal-close" aria-label="Schließen" @click="$emit('close')">×</button>
      </div>
      <p class="modal-period">{{ copy.konamiSubtitle }}</p>
      <ul class="konami-list">
        <li v-for="fact in facts" :key="fact">{{ fact }}</li>
      </ul>
      <button class="ghost" @click="$emit('refresh')">{{ copy.konamiRefresh }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  facts: string[];
  copy: { konamiTitle: string; konamiSubtitle: string; konamiRefresh: string };
}>();

props;

defineEmits<{
  (e: 'close'): void;
  (e: 'refresh'): void;
}>();
</script>
