<template>
  <section id="leistungen" class="section">
    <div class="section-header">
      <h2>{{ copy.servicesTitle }}</h2>
      <p>{{ copy.servicesIntro }}</p>
    </div>
    <div class="services-slider-wrapper">
      <button
        class="slider-btn"
        @click="$emit('scroll', -1)"
        aria-label="Zurück"
        :disabled="!showArrows"
      >
        ‹
      </button>
      <div class="services-track" ref="track" @scroll="$emit('update-controls')">
        <article v-for="(item, index) in copy.services" :key="item.title" class="service-card reveal">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
      <button
        class="slider-btn"
        @click="$emit('scroll', 1)"
        aria-label="Weiter"
        :disabled="!showArrows"
      >
        ›
      </button>
    </div>
    <div class="slider-dots">
      <button
        v-for="(item, index) in copy.services"
        :key="`dot-${index}`"
        class="slider-dot"
        :class="{ active: currentIndex === index }"
        @click="$emit('goto', index)"
        :aria-label="`Zu Slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
  copy: Record<string, unknown>;
  showArrows: boolean;
  currentIndex: number;
}>();

const emit = defineEmits<{
  (e: 'scroll', dir: number): void;
  (e: 'update-controls'): void;
  (e: 'track-ready', el: HTMLElement): void;
  (e: 'goto', index: number): void;
}>();

const track = ref<HTMLElement | null>(null);

onMounted(() => {
  if (track.value) {
    emit('track-ready', track.value);
  }
});
</script>
