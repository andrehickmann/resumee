<template>
  <div v-if="open" class="konami" @click="$emit('close')">
    <div class="konami-body">
      <span class="cmd">{{ rd.konamiCommand }}</span>
      <p v-for="fact in facts" :key="fact">&gt; {{ fact }}</p>
      <span class="esc">ESC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TerminalCopy } from '../../data/terminalFiles';
defineProps<{
  open: boolean;
  facts: string[];
  rd: TerminalCopy;
}>();

defineEmits<{
  (_e: 'close'): void;
}>();
</script>
