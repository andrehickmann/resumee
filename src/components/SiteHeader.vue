<template>
  <header class="site-header">
    <div class="brand">{{ copy.brand }}</div>
    <nav class="nav">
      <a v-for="item in copy.nav" :key="item.id" :href="`#${item.id}`">
        {{ item.label }}
      </a>
    </nav>
    <div class="header-actions">
      <button
        class="theme-toggle"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>
      <button
        class="cv-download"
        :title="currentLang === 'de' ? 'Lebenslauf herunterladen' : 'Download resume'"
        @click="handleDownload"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>{{ currentLang === 'de' ? 'CV' : 'Resume' }}</span>
      </button>
      <div class="lang-switch">
        <button
          class="lang"
          :class="{ active: currentLang === 'de' }"
          @click="$emit('set-lang', 'de')"
        >
          DE
        </button>
        <button
          class="lang"
          :class="{ active: currentLang === 'en' }"
          @click="$emit('set-lang', 'en')"
        >
          EN
        </button>
      </div>
      <button class="cta" data-scroll="#kontakt" data-magnet>
        {{ copy.ctaLabel }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode';

const props = defineProps<{
  copy: Record<string, unknown>;
  currentLang: string;
}>();

const { isDark, toggle } = useDarkMode();

function handleDownload() {
  const pdfUrl =
    props.currentLang === 'de'
      ? '/Lebenslauf - André Hickmann Kuschnereit.pdf'
      : '/Resume - André Hickmann Kuschnereit.pdf';

  window.open(pdfUrl, '_blank');
}

defineEmits<{
  (e: 'set-lang', lang: string): void;
}>();
</script>
