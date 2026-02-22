<template>
  <section class="section" id="lebenslauf">
    <div class="section-header">
      <h2>{{ copy.timelineTitle }}</h2>
      <p>{{ copy.timelineIntro }}</p>
    </div>
    <div class="cv">
      <h3>{{ copy.cvLabel }}</h3>
      <a class="primary" href="/Lebenslauf.pdf" target="_blank" rel="noreferrer" data-magnet>
        {{ copy.cvButton }}
      </a>
    </div>
    <p class="education-note">{{ copy.educationNote }}</p>
    <div class="timeline">
      <div v-for="item in copy.careerTimeline" :key="item.period" class="timeline-item reveal">
        <span>{{ item.period }}</span>
        <h3>{{ item.role }}</h3>
        <p>{{ item.summary }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  copy: Record<string, unknown>;
}>();
</script>
