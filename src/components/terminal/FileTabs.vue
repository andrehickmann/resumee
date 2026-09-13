<template>
  <nav ref="strip" class="term-tabs">
    <a
      v-for="file in files"
      :key="file.id"
      :ref="(el) => setTabRef(file.id, el)"
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
import { onMounted, ref, watch, type ComponentPublicInstance } from 'vue';
import type { TerminalFile } from '../../data/terminalFiles';

/** Breathing room left beside a tab that had to be scrolled into view. */
const EDGE_PADDING = 16;

const props = defineProps<{
  files: TerminalFile[];
  active: string;
}>();

defineEmits<{
  (_e: 'navigate', _id: string): void;
}>();

const strip = ref<HTMLElement | null>(null);
const tabs = new Map<string, HTMLElement>();

function setTabRef(id: string, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) tabs.set(id, el);
  else tabs.delete(id);
}

/**
 * Below 1080px the tab strip is the only place the reader can see which section they
 * are in - the explorer is gone. The strip scrolls sideways, so the active tab has to
 * be brought along; otherwise the scroll spy marks a tab that sits off-screen.
 *
 * `scrollIntoView` is deliberately not used: it walks every scrollable ancestor and
 * would drag the page itself around.
 */
function revealActive() {
  const container = strip.value;
  const tab = tabs.get(props.active);
  if (!container || !tab) return;

  const left = tab.offsetLeft;
  const right = left + tab.offsetWidth;
  const viewLeft = container.scrollLeft;
  const viewRight = viewLeft + container.clientWidth;
  if (left >= viewLeft && right <= viewRight) return;

  const target =
    left < viewLeft ? left - EDGE_PADDING : right - container.clientWidth + EDGE_PADDING;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  container.scrollTo({
    left: Math.max(0, target),
    behavior: reduceMotion ? 'auto' : 'smooth'
  });
}

watch(() => props.active, revealActive);
onMounted(revealActive);
</script>
