<template>
  <div v-if="open" class="palette" :class="{ open: open }">
    <div class="palette-backdrop" @click="$emit('close')"></div>
    <div class="palette-panel" role="dialog" aria-modal="true" aria-labelledby="palette-title">
      <div class="palette-header">
        <span id="palette-title">Command Palette</span>
        <kbd>ESC</kbd>
      </div>
      <input
        ref="inputRef"
        class="palette-input"
        :value="query"
        type="text"
        placeholder="Search sections or filters..."
        @input="emit('update:query', $event.target.value)"
      />
      <div class="palette-list">
        <button
          v-for="item in items"
          :key="item.key"
          class="palette-item"
          @click="$emit('run', item)"
        >
          <span>{{ item.label }}</span>
          <small>{{ item.type }}</small>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

type PaletteItem = { key: string; label: string; type: string };

const props = defineProps<{
  open: boolean;
  query: string;
  items: PaletteItem[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'run', item: PaletteItem): void;
  (e: 'update:query', value: string): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.open,
  (value) => {
    if (value) {
      requestAnimationFrame(() => inputRef.value?.focus());
    }
  }
);

// input event handles updates
</script>
