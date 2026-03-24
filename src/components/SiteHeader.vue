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
        <svg
          v-if="isDark"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg
          v-else
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
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
