<template>
  <div class="construction-page" @wheel.prevent @touchmove.prevent @scroll.prevent>
    <div class="bg-blur"></div>
    
    <header class="site-header">
      <div class="brand">{{ copy.brand }}</div>
      <div class="lang-switcher">
        <button 
          @click="setLang('de')" 
          :class="{ active: locale === 'de' }"
          class="lang-btn"
        >
          DE
        </button>
        <button 
          @click="setLang('en')" 
          :class="{ active: locale === 'en' }"
          class="lang-btn"
        >
          EN
        </button>
      </div>
    </header>

    <main class="construction-main">
      <div class="construction-container">
        <div class="construction-badge">{{ copy.construction.title }}</div>
        <h1 class="construction-title">{{ copy.construction.message }}</h1>
        
        <div class="construction-info">
          <p class="construction-contact">{{ copy.construction.contact }}</p>
          
          <div class="social-links">
            <a 
              href="https://www.linkedin.com/in/andr%C3%A9-hickmann-425b97182/" 
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            
            <a 
              href="https://github.com/andrehickmann" 
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer class="construction-footer">
      <router-link to="/legal" class="legal-link">
        {{ locale === 'de' ? 'Impressum & Datenschutz' : 'Legal Notice & Privacy' }}
      </router-link>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { contentDe } from '../content.de.js';
import { contentEn } from '../content.en.js';

const { locale } = useI18n();
const copy = computed(() => locale.value === 'en' ? contentEn : contentDe);

const setLang = (lang: string) => {
  locale.value = lang;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.construction-page {
  min-height: 100vh;
  max-height: 100vh;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  background: linear-gradient(135deg, #f6f4f0 0%, #f2ede3 45%, #efe7d8 100%);
  color: #1f1f1f;
  line-height: 1.6;
  overflow: hidden;
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
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, 20px);
  }
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.lang-switcher {
  display: flex;
  gap: 0.5rem;
  background: transparent;
}

.lang-btn {
  background: #ffffff;
  border: 1px solid rgba(31, 31, 31, 0.2);
  color: #5c5a54;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Space Grotesk', sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.lang-btn:hover {
  background: rgba(31, 31, 31, 0.05);
  border-color: rgba(31, 31, 31, 0.3);
}

.lang-btn.active {
  background: #1f1f1f;
  color: #fff;
  border-color: #1f1f1f;
}


.construction-main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

.construction-container {
  max-width: 700px;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.construction-info {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(31, 31, 31, 0.1);
}

.construction-contact {
  font-size: 1.1rem;
  color: #5c5a54;
  margin-bottom: 2.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #ffffff;
  color: #1f1f1f;
  text-decoration: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(31, 31, 31, 0.08);
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(31, 31, 31, 0.12);
  color: #ff6b3d;
}

.social-link:active {
  transform: translateY(0);
}

.social-link svg {
  flex-shrink: 0;
}

.construction-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 6vw;
  background: rgba(246, 244, 240, 0.85);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba(31, 31, 31, 0.08);
  text-align: center;
  z-index: 10;
}

.legal-link {
  color: #5c5a54;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: #1f1f1f;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .construction-main {
    padding: 0 5vw;
  }
  
  .site-header {
    padding: 1.2rem 5vw 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .lang-switch {
    width: 100%;
    justify-content: flex-start;
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
    margin-bottom: 2rem;
  }

  .construction-info {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
  
  .social-links {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .social-link {
    width: 100%;
    justify-content: center;
  }

  .construction-footer {
    padding: 1.2rem 5vw;
  }
}
</style>
