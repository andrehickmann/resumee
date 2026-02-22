<template>
  <section id="stack" class="section">
    <div class="section-header">
      <h2>{{ copy.stackTitle }}</h2>
      <p>{{ copy.stackIntro }}</p>
    </div>
    <div class="stack-grid">
      <article v-for="item in copy.stackItems" :key="item.title" class="stack-card reveal">
        <h3>{{ item.title }}</h3>
        <span>{{ item.tools }}</span>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  copy: Record<string, unknown>;
}>();
</script>
