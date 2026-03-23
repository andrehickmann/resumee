<template>
  <section id="branchen" class="section">
    <div class="section-header">
      <h2>{{ copy.industriesTitle }}</h2>
      <p>{{ copy.industriesIntro }}</p>
      <span class="count-pill">{{ industryCount }} {{ copy.industriesCountLabel }}</span>
    </div>
    <div class="tag-cloud">
      <span v-for="industry in copy.industries" :key="industry" class="tag reveal">
        {{ industry }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  copy: Record<string, unknown>;
  industryCount: number;
}>();
</script>
