<template>
  <div v-if="open" class="palette-backdrop" @click.self="$emit('close')">
    <div class="palette">
      <div class="palette-head">
        <span class="prompt">&gt;</span>
        <input
          ref="input"
          :value="query"
          :placeholder="rd.paletteTitle"
          @input="$emit('update:query', ($event.target as HTMLInputElement).value)"
        />
        <span class="esc">ESC</span>
      </div>

      <div class="palette-list">
        <button
          v-for="item in items"
          :key="item.key"
          class="palette-item"
          type="button"
          @click="$emit('run', item)"
        >
          <span>{{ item.label }}</span
          ><span class="type">{{ item.type }}</span>
        </button>
        <p v-if="!items.length" class="palette-empty">{{ rd.paletteEmpty }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

export type PaletteItem = {
  key: string;
  label: string;
  type: string;
  run: () => void;
};

const props = defineProps<{
  open: boolean;
  query: string;
  items: PaletteItem[];
  rd: Record<string, string>;
}>();

defineEmits<{
  (_e: 'close'): void;
  (_e: 'run', _item: PaletteItem): void;
  (_e: 'update:query', _value: string): void;
}>();

const input = ref<HTMLInputElement | null>(null);

watch(
  () => props.open,
  (open) => {
    if (!open) return;
    nextTick(() => input.value?.focus());
  }
);
</script>
