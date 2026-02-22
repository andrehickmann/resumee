<template>
  <section id="profil" class="hero">
    <div class="hero-text">
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h1>{{ copy.heroTitle }}</h1>
      <p class="lead">{{ copy.heroLead }}</p>
      <div class="hero-actions">
        <button class="primary" data-scroll="#projekte" data-magnet>
          {{ copy.heroPrimary }}
        </button>
        <button class="ghost" data-scroll="#stack" data-magnet>
          {{ copy.heroGhost }}
        </button>
      </div>
      <div class="stats-row">
        <div class="stats">
          <div v-for="stat in statsDisplay" :key="stat.label">
            <span class="stat-number" :data-count="stat.value">0</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
        <div class="radar compact">
          <div class="radar-chart" aria-hidden="true"></div>
          <div class="radar-labels">
            <span v-for="item in copy.radar" :key="item.label">
              <i class="radar-dot" :class="item.tone" aria-hidden="true"></i>
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-media">
      <div class="portrait-wrap">
        <div class="portrait-frame reveal tilt">
          <img
            class="portrait"
            src="/portrait.jpg"
            :alt="copy.heroImageAlt"
            loading="lazy"
            width="640"
            height="640"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  copy: Record<string, unknown>;
  statsDisplay: { label: string; value: string }[];
}>();
</script>
