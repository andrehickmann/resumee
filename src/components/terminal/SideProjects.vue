<template>
  <section id="side" class="term-section side-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / {{ rd.files.side }}</span>
    </div>
    <h2 class="term-h2">{{ rd.sideTitle }}</h2>
    <p class="term-intro">{{ rd.sideIntro }}</p>
    <div class="term-command">{{ rd.sideCommand }}</div>

    <div class="side-list">
      <article v-for="project in cards" :key="project.slug" class="side-card">
        <div class="side-body">
          <div class="side-meta">
            <span
              >drwxr-xr-x andre {{ project.year }}
              <span class="slug">{{ project.slug }}/</span></span
            >
            <span><span class="online">●</span> {{ project.status }}</span>
          </div>

          <h3 class="side-name">{{ project.name }} <span class="readme">/ README.md</span></h3>
          <p class="side-tagline">{{ project.tagline }}</p>
          <p class="side-desc">{{ project.description }}</p>

          <div class="side-stack">
            <span v-for="tool in project.stack" :key="tool">{{ tool }}</span>
          </div>

          <div v-if="project.links.code || project.links.live" class="side-links">
            <a
              v-if="project.links.code"
              :href="project.links.code"
              target="_blank"
              rel="noreferrer"
            >
              $ gh repo view {{ project.slug }} ↗
            </a>
            <a
              v-if="project.links.live"
              class="live"
              :href="project.links.live"
              target="_blank"
              rel="noreferrer"
            >
              $ open {{ rd.sideLiveLabel }} ↗
            </a>
          </div>
        </div>

        <div v-if="project.shots.length" class="side-shot">
          <button
            class="shot-frame"
            type="button"
            :aria-label="`${project.name} — ${project.current.label} vergrößern`"
            @click="openLightbox(project.slug)"
          >
            <div class="shot-chrome">
              <i></i><i></i><i></i>
              <span class="url">
                {{ project.slug }}.hickmann-kuschnereit.de — {{ project.current.label }}
              </span>
              <span class="shot-zoom">⤢</span>
            </div>
            <img
              :src="project.current.src"
              :alt="`${project.name} — ${project.current.label}`"
              loading="lazy"
            />
          </button>

          <div v-if="project.shots.length > 1" class="shot-tabs">
            <button
              v-for="(shot, index) in project.shots"
              :key="shot.src"
              class="shot-tab"
              :class="{ 'is-active': index === project.activeIndex }"
              type="button"
              @click="selectShot(project.slug, index)"
            >
              {{ shot.label }}
            </button>
          </div>
        </div>
      </article>
    </div>

    <ShotLightbox
      :open="!!lightbox"
      :shots="lightbox ? lightbox.shots : []"
      :index="lightbox ? lightbox.index : 0"
      :title="lightbox ? lightbox.name : ''"
      :hint="rd.lightboxHint"
      @close="lightboxSlug = null"
      @select="selectLightboxShot"
    />
  </section>
</template>

<script setup lang="ts">
import type { TerminalCopy } from '../../data/terminalFiles';
import { computed, ref, watch } from 'vue';
import ShotLightbox from './ShotLightbox.vue';

type Shot = { src: string; label: string };

export type SideProject = {
  name: string;
  year: string;
  status: string;
  tagline: string;
  description: string;
  stack: string[];
  shots: Shot[];
  links: { code: string; live: string };
};

const props = defineProps<{
  rd: TerminalCopy;
  projects: SideProject[];
}>();

const activeShot = ref<Record<string, number>>({});
const lightboxSlug = ref<string | null>(null);

const cards = computed(() =>
  props.projects.map((project) => {
    const slug = toSlug(project.name);
    const shots = project.shots ?? [];
    const activeIndex = activeShot.value[slug] ?? 0;
    return {
      ...project,
      slug,
      shots,
      activeIndex,
      current: shots[activeIndex] ?? shots[0] ?? { src: '', label: '' }
    };
  })
);

const lightbox = computed(() => {
  if (!lightboxSlug.value) return null;
  const card = cards.value.find((entry) => entry.slug === lightboxSlug.value);
  return card ? { name: card.name, shots: card.shots, index: card.activeIndex } : null;
});

// Switching the language swaps the shot labels; keeping an index from the old list
// would point at a screenshot the reader did not pick.
watch(
  () => props.projects,
  () => {
    activeShot.value = {};
    lightboxSlug.value = null;
  }
);

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function selectShot(slug: string, index: number) {
  activeShot.value = { ...activeShot.value, [slug]: index };
}

function openLightbox(slug: string) {
  lightboxSlug.value = slug;
}

function selectLightboxShot(index: number) {
  if (!lightboxSlug.value) return;
  selectShot(lightboxSlug.value, index);
}
</script>
