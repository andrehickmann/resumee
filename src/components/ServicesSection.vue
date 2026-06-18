<template>
  <section id="leistungen" class="section">
    <div class="section-header">
      <h2>{{ copy.servicesTitle }}</h2>
      <p>{{ copy.servicesIntro }}</p>
    </div>
    <div class="services-slider-wrapper">
      <button
        class="slider-btn"
        aria-label="Zurück"
        :disabled="!showArrows"
        @click="$emit('scroll', -1)"
      >
        ‹
      </button>
      <div ref="track" class="services-track" @scroll="$emit('update-controls')">
        <article
          v-for="item in copy.services"
          :key="item.id || item.title"
          class="service-card reveal"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
      <button
        class="slider-btn"
        aria-label="Weiter"
        :disabled="!showArrows"
        @click="$emit('scroll', 1)"
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
        :aria-label="`Zu Slide ${index + 1}`"
        @click="$emit('goto', index)"
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
  (_e: 'scroll', _dir: number): void;
  (_e: 'update-controls'): void;
  (_e: 'track-ready', _el: HTMLElement): void;
  (_e: 'goto', _index: number): void;
}>();

const track = ref<HTMLElement | null>(null);

onMounted(() => {
  if (track.value) {
    emit('track-ready', track.value);
  }
});
</script>
