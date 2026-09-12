<template>
  <section id="profil" class="term-section">
    <div class="term-crumb hero-crumb">
      <span><span class="path">~/portfolio</span> / profil.md</span>
      <span>{{ rd.eyebrow }}</span>
    </div>

    <div class="hero-prompt">
      $ <span class="cmd">{{ rd.heroPrompt }}</span> {{ rd.heroPromptFlag }}
    </div>

    <h1 class="hero-title">
      <span class="hash">#</span> {{ rd.heroTitle }}<span class="hero-cursor"></span>
    </h1>

    <div class="hero-grid">
      <div>
        <p class="hero-lead">{{ rd.heroLead }}</p>

        <div class="hero-actions">
          <a
            class="term-btn-primary"
            href="#projekte"
            @click.prevent="$emit('navigate', 'projekte')"
          >
            {{ rd.heroPrimary }}
          </a>
          <a class="term-btn-ghost" href="#side" @click.prevent="$emit('navigate', 'side')">
            {{ rd.heroGhost }}
          </a>
        </div>

        <div class="hero-stats">
          <div class="hero-stats-head">{{ rd.statsCommand }}</div>
          <div v-for="(stat, index) in stats" :key="stat.label" class="hero-stat">
            <span class="no">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="label">{{ stat.label }}</span>
            <span class="value">{{ stat.value }}+</span>
          </div>
        </div>
      </div>

      <figure class="hero-portrait">
        <div class="hero-portrait-head">
          <span>portrait.jpg</span><span>{{ rd.portraitMeta }}</span>
        </div>
        <img src="/portrait.jpg" :alt="portraitAlt" width="640" height="640" />
        <figcaption>
          <span>{{ brand }}</span
          ><span class="online">● {{ rd.availability }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  rd: Record<string, string>;
  stats: { label: string; value: number }[];
  brand: string;
  portraitAlt: string;
}>();

defineEmits<{
  (_e: 'navigate', _id: string): void;
}>();
</script>
