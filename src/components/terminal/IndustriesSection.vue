<template>
  <section id="branchen" class="term-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / branchen.txt</span>
    </div>
    <h2 class="term-h2">{{ rd.industriesTitle }}</h2>
    <p class="term-intro">{{ rd.industriesIntro }}</p>

    <div class="industries-grid">
      <div v-for="(industry, index) in industries" :key="industry" class="industry-row">
        <span class="no">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="name">{{ industry }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  rd: Record<string, string>;
  industries: string[];
}>();
</script>
