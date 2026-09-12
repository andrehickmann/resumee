<template>
  <div class="term-titlebar">
    <span class="term-dots"><i></i><i></i><i></i></span>
    <span class="term-path">andre@berlin: ~/portfolio/{{ activeFile }} — {{ activeFilter }}</span>
    <button class="term-kbd" type="button" @click="$emit('open-palette')">⌘K</button>
    <span class="term-lang">
      <button
        v-for="option in ['de', 'en']"
        :key="option"
        :class="{ 'is-active': option === lang }"
        :disabled="option === lang"
        type="button"
        @click="$emit('set-lang', option as 'de' | 'en')"
      >
        {{ option.toUpperCase() }}
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeFile: string;
  activeFilter: string;
  lang: string;
}>();

defineEmits<{
  (_e: 'open-palette'): void;
  (_e: 'set-lang', _lang: 'de' | 'en'): void;
}>();
</script>
