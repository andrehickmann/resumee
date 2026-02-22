<template>
  <header class="site-header">
    <div class="brand">{{ copy.brand }}</div>
    <nav class="nav">
      <a v-for="item in copy.nav" :key="item.id" :href="`#${item.id}`">
        {{ item.label }}
      </a>
    </nav>
    <div class="header-actions">
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
defineProps<{
  copy: Record<string, unknown>;
  currentLang: string;
}>();
</script>
