<template>
  <section class="section" id="lebenslauf">
    <div class="section-header">
      <h2>{{ copy.timelineTitle }}</h2>
      <p>{{ copy.timelineIntro }}</p>
    </div>
    <div class="cv">
      <a href="/Lebenslauf.pdf" target="_blank" rel="noreferrer" download="Lebenslauf-Andre-Hickmann.pdf">
        {{ copy.cvButton }}
      </a>
    </div>
    <div class="timeline">
      <p class="education-note">{{ copy.educationNote }}</p>
      <div v-for="item in copy.careerTimeline" :key="item.period" class="timeline-item reveal" :class="{ current: item.period.includes('heute') || item.period.includes('present') }">
        <span>{{ item.period }}</span>
        <h3>{{ item.role }}</h3>
        <p>{{ item.summary }}</p>
      </div>
      <div class="timeline-item timeline-next reveal">
        <span>{{ copy.nextUpLabel }}</span>
        <p>{{ copy.nextUpText }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  copy: Record<string, unknown>;
}>();
</script>
