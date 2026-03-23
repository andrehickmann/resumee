<template>
  <div class="construction-page">
    <div class="bg-blur"></div>
    
    <header class="site-header">
      <div class="brand">{{ copy.brand }}</div>
    </header>

    <main class="construction-main">
      <div class="construction-container">
        <div class="construction-badge">{{ copy.construction.title }}</div>
        <h1 class="construction-title">{{ copy.construction.message }}</h1>
        <p class="construction-contact">{{ copy.construction.contact }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { contentDe } from '../content.de.js';
import { contentEn } from '../content.en.js';

const { locale } = useI18n();
const copy = computed(() => locale.value === 'en' ? contentEn : contentDe);
</script>

<style scoped>
.construction-page {
  min-height: 100vh;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  background: linear-gradient(135deg, #f6f4f0 0%, #f2ede3 45%, #efe7d8 100%);
  color: #1f1f1f;
  line-height: 1.6;
}

.bg-blur {
  position: fixed;
  inset: -30% 10% auto auto;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at top, rgba(255, 107, 61, 0.4), transparent 70%);
  filter: blur(40px);
  z-index: -1;
  opacity: 0.8;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 1.6rem 6vw 1.2rem;
  background: rgba(246, 244, 240, 0.85);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(31, 31, 31, 0.08);
  z-index: 10;
}

.brand {
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
}

.construction-main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7.5rem 6vw 4rem;
}

.construction-container {
  max-width: 700px;
  text-align: center;
}

.construction-badge {
  display: inline-block;
  background: #1f1f1f;
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.construction-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 2rem;
  color: #1f1f1f;
}

.construction-contact {
  font-size: 1.1rem;
  color: #5c5a54;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(31, 31, 31, 0.1);
}

@media (max-width: 768px) {
  .construction-main {
    padding: 5rem 5vw 3rem;
  }
  
  .site-header {
    padding: 1.2rem 5vw 1rem;
  }
  
  .construction-badge {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }
  
  .construction-title {
    font-size: 1.75rem;
  }
  
  .construction-contact {
    font-size: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
}
</style>
