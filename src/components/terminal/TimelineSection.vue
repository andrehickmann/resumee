<template>
  <section id="lebenslauf" class="term-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / lebenslauf.yml</span>
      <a :href="cvHref" target="_blank" rel="noreferrer">$ curl -O {{ rd.cvButton }} ↗</a>
    </div>
    <h2 class="term-h2">{{ rd.timelineTitle }}</h2>
    <p class="term-intro">{{ rd.timelineIntro }}</p>

    <div class="yaml-block">
      <div v-for="entry in timeline" :key="entry.period" class="yaml-entry">
        <span class="marker">-</span>
        <div class="yaml-fields">
          <div>
            <span class="yaml-key">period:</span>
            <span class="yaml-period">{{ entry.period }}</span>
          </div>
          <div>
            <span class="yaml-key">role:</span> <span class="yaml-role">{{ entry.role }}</span>
          </div>
          <div class="yaml-summary">
            <span class="yaml-key">summary:</span>
            <span class="text">{{ entry.summary }}</span>
          </div>
        </div>
      </div>

      <div class="yaml-comment">
        <span>#</span><span class="text">{{ educationNote }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  rd: Record<string, string>;
  timeline: { period: string; role: string; summary: string }[];
  educationNote: string;
  cvHref: string;
}>();
</script>
