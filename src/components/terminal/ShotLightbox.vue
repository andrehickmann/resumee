<template>
  <div
    v-if="open"
    class="lightbox"
    role="dialog"
    aria-modal="true"
    :aria-label="caption"
    @click.self="$emit('close')"
  >
    <div class="lightbox-frame">
      <div class="shot-chrome">
        <i></i><i></i><i></i>
        <span class="url">{{ caption }}</span>
        <button ref="closeButton" class="lightbox-close" type="button" @click="$emit('close')">
          ESC
        </button>
      </div>

      <div class="lightbox-canvas">
        <img :src="shot.src" :alt="caption" />
      </div>

      <p class="lightbox-hint">{{ hint }}</p>

      <div v-if="shots.length > 1" class="lightbox-tabs">
        <button
          v-for="(entry, entryIndex) in shots"
          :key="entry.src"
          class="shot-tab"
          :class="{ 'is-active': entryIndex === index }"
          type="button"
          @click="$emit('select', entryIndex)"
        >
          {{ entry.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';

type Shot = { src: string; label: string };

const props = defineProps<{
  open: boolean;
  shots: Shot[];
  index: number;
  title: string;
  hint: string;
}>();

const emit = defineEmits<{
  (_e: 'close'): void;
  (_e: 'select', _index: number): void;
}>();

const closeButton = ref<HTMLElement | null>(null);

const shot = computed(() => props.shots[props.index] ?? props.shots[0] ?? { src: '', label: '' });

const caption = computed(() => `${props.title} — ${shot.value.label}`);

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close');
    return;
  }
  if (props.shots.length < 2) return;
  if (event.key === 'ArrowRight') {
    emit('select', (props.index + 1) % props.shots.length);
  }
  if (event.key === 'ArrowLeft') {
    emit('select', (props.index - 1 + props.shots.length) % props.shots.length);
  }
}

/**
 * `immediate` matters: without it a lightbox that is already open on its first render
 * never gets the listener. That in turn makes the guard necessary - an immediate
 * watcher runs during setup, and setup also runs while vite-ssg prerenders the page,
 * where there is no `window`.
 */
watch(
  () => props.open,
  (open) => {
    if (typeof window === 'undefined') return;
    if (open) {
      window.addEventListener('keydown', handleKeydown);
      // Without the focus move the arrow keys would scroll the page behind the overlay.
      nextTick(() => closeButton.value?.focus());
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }
  },
  { immediate: true }
);

onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>
