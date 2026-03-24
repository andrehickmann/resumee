<template>
  <section id="stack" class="section">
    <div class="section-header">
      <h2>{{ copy.stackTitle }}</h2>
      <p>{{ copy.stackIntro }}</p>
    </div>
    <div class="stack-slider-wrapper">
      <div ref="stackTrack" class="stack-track" @scroll="updateCurrentIndex">
        <article 
          v-for="(item, index) in copy.stackItems" 
          :key="item.title" 
          class="stack-card reveal"
          :data-index="index"
        >
          <h3>{{ item.title }}</h3>
          <span>{{ item.tools }}</span>
        </article>
      </div>
    </div>
    <div class="slider-dots">
      <button
        v-for="(item, index) in copy.stackItems"
        :key="`dot-${index}`"
        class="slider-dot"
        :class="{ active: currentIndex === index }"
        :aria-label="`Zu Slide ${index + 1}`"
        @click="scrollToIndex(index)"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  copy: Record<string, unknown>;
}>();

const stackTrack = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
let autoTimer: ReturnType<typeof setInterval> | null = null;

const updateCurrentIndex = () => {
  if (!stackTrack.value) return;
  const scrollLeft = stackTrack.value.scrollLeft;
  const cardWidth = stackTrack.value.offsetWidth;
  const index = Math.round(scrollLeft / cardWidth);
  currentIndex.value = index;
};

const scrollToIndex = (index: number) => {
  if (!stackTrack.value) return;
  const cardWidth = stackTrack.value.offsetWidth;
  stackTrack.value.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
};

const startAuto = () => {
  // Only auto-rotate on mobile (≤700px)
  if (window.innerWidth > 700) return;
  if (autoTimer) return;
  const track = stackTrack.value;
  if (!track) return;
  
  autoTimer = setInterval(() => {
    const cards = track.querySelectorAll('.stack-card');
    if (cards.length === 0) return;
    
    const maxIndex = cards.length - 1;
    const nextIndex = currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1;
    scrollToIndex(nextIndex);
  }, 3000); // Auto-rotate every 3 seconds
};

const stopAuto = () => {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
};

onMounted(() => {
  if (stackTrack.value) {
    stackTrack.value.addEventListener('scroll', updateCurrentIndex);
    stackTrack.value.addEventListener('touchstart', stopAuto, { passive: true });
    stackTrack.value.addEventListener('touchend', startAuto, { passive: true });
    stackTrack.value.addEventListener('mouseenter', stopAuto);
    stackTrack.value.addEventListener('mouseleave', startAuto);
    
    // Start auto-rotation after mount
    setTimeout(startAuto, 500);
  }
});

onUnmounted(() => {
  if (stackTrack.value) {
    stackTrack.value.removeEventListener('scroll', updateCurrentIndex);
    stackTrack.value.removeEventListener('touchstart', stopAuto);
    stackTrack.value.removeEventListener('touchend', startAuto);
    stackTrack.value.removeEventListener('mouseenter', stopAuto);
    stackTrack.value.removeEventListener('mouseleave', startAuto);
  }
  stopAuto();
});
</script>
