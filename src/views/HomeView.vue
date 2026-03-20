<template>
  <a class="skip-link" href="#profil">Zum Inhalt springen</a>
  <div>
    <div class="bg-blur"></div>

    <SiteHeader :copy="copy" :current-lang="locale" @set-lang="setLang" />

    <main id="main">
      <HeroSection :copy="copy" :stats-display="statsDisplay" />

      <ServicesSection
        :copy="copy"
        :show-arrows="showServiceArrows"
        :current-index="currentServiceIndex"
        @scroll="scrollServices"
        @update-controls="updateServiceControls"
        @track-ready="initServiceSlider"
        @goto="gotoService"
      />

      <StackSection :copy="copy" />

      <!--<TerminalWidget :copy="copy" :project-count="projectCount" :industry-count="industryCount" />-->

      <!--<BugFixSprint :copy="copy" />-->

      <IndustriesSection :copy="copy" :industry-count="industryCount" />

      <ProjectsSection
        :copy="copy"
        :filtered-count="filteredCount"
        :active-filters-count="activeFiltersCount"
        :project-tags="projectTags"
        :project-years="projectYears"
        :filtered-projects="filteredProjects"
        :is-tag-active="isTagActive"
        :is-year-active="isYearActive"
        @toggle-filter="toggleFilter"
        @toggle-year="toggleYear"
        @reset-filters="resetFilters"
        @open-project="openProject"
      />

      <TimelineSection :copy="copy" />

      <ContactSection :copy="copy" @open-contact="openContactModal" />
    </main>

    <SiteFooter :copy="copy" />

    <ContactModal
      :copy="copy"
      :open="contactModalOpen"
      :model="contactForm"
      @close="closeContactModal"
      @submit="submitContact"
    />

    <ProjectModal
      :open="projectModalOpen"
      :project="activeProject"
      @close="closeProjectModal"
    />

    <CommandPalette
      :open="paletteOpen"
      :query="paletteQuery"
      :items="paletteItems"
      @close="closePalette"
      @run="runPalette"
      @update:query="(value) => (paletteQuery = value)"
    />

    <KonamiOverlay
      :open="konamiOpen"
      :facts="konamiFacts"
      :copy="copy"
      @close="konamiOpen = false"
      @refresh="pickFacts"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { type ProjectItem, type ContentShape, useProjectFilters } from '../composables/useProjectFilters';
import { useServicesSlider } from '../composables/useServicesSlider';
import { useUiEffects } from '../composables/useUiEffects';

import SiteHeader from '../components/SiteHeader.vue';
import HeroSection from '../components/HeroSection.vue';
import ServicesSection from '../components/ServicesSection.vue';
import StackSection from '../components/StackSection.vue';
import IndustriesSection from '../components/IndustriesSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import TimelineSection from '../components/TimelineSection.vue';
import ContactSection from '../components/ContactSection.vue';
import SiteFooter from '../components/SiteFooter.vue';
import ContactModal from '../components/ContactModal.vue';
import ProjectModal from '../components/ProjectModal.vue';
import CommandPalette from '../components/CommandPalette.vue';
import KonamiOverlay from '../components/KonamiOverlay.vue';
import { techFacts } from '../data/techFacts';

const { locale, tm } = useI18n({ useScope: 'global' });
const paletteOpen = ref(false);
const paletteQuery = ref('');
const contactModalOpen = ref(false);
const projectModalOpen = ref(false);
const activeProject = ref<ProjectItem | null>(null);
const contactForm = ref({
  name: '',
  email: '',
  role: '',
  message: ''
});
const konamiOpen = ref(false);
const konamiFacts = ref<string[]>([]);

const copy = computed<ContentShape>(() => tm('app') as ContentShape);
const industryCount = computed(() => copy.value.industries.length);
const projectCount = computed(() => copy.value.projects.length);
const statsDisplay = computed(() =>
  copy.value.stats.map((stat) => {
    if (stat.key === 'industries') {
      return { ...stat, value: String(industryCount.value) };
    }
    if (stat.key === 'projects') {
      return { ...stat, value: String(projectCount.value) };
    }
    return stat;
  })
);

const {
  projectTags,
  projectYears,
  filteredProjects,
  filteredCount,
  activeFiltersCount,
  toggleFilter,
  toggleYear,
  resetFilters,
  isTagActive,
  isYearActive,
  resetOnLangChange
} = useProjectFilters(copy);

const {
  showServiceArrows,
  currentServiceIndex,
  updateServiceControls,
  scrollServices,
  gotoService,
  initServiceSlider
} = useServicesSlider();

const {
  initScroll,
  initNavHighlight,
  initReveal,
  initScrollEffects,
  initCounters,
  initMagnet,
  initTilt
} = useUiEffects();

const paletteItems = computed(() => {
  const term = paletteQuery.value.trim().toLowerCase();
  const sectionItems = copy.value.nav.map((item) => ({
    key: `section-${item.id}`,
    label: item.label,
    type: 'Section',
    action: () => scrollTo(`#${item.id}`)
  }));
  const filterItems = projectTags.value.map((tag) => ({
    key: `filter-${tag}`,
    label: tag,
    type: 'Filter',
    action: () => toggleFilter(tag)
  }));
  const yearItems = projectYears.value.map((year) => ({
    key: `year-${year}`,
    label: String(year),
    type: 'Year',
    action: () => toggleYear(year)
  }));
  const items = [...sectionItems, ...filterItems, ...yearItems];
  if (!term) return items;
  return items.filter((item) => item.label.toLowerCase().includes(term));
});

watch(locale, () => {
  resetOnLangChange();
  document.documentElement.lang = locale.value;
  document.title = copy.value.pageTitle;
  nextTick(() => {
    initReveal();
    initScrollEffects();
    initCounters();
    updateServiceControls();
  });
});

watch(filteredProjects, () => {
  nextTick(() => {
    initReveal();
    initTilt();
  });
});

function setLang(lang: 'de' | 'en') {
  locale.value = lang;
}

function scrollTo(selector: string) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

function openContactModal() {
  contactModalOpen.value = true;
}

function closeContactModal() {
  contactModalOpen.value = false;
}

function openProject(project: ProjectItem) {
  activeProject.value = project;
  projectModalOpen.value = true;
}

function closeProjectModal() {
  projectModalOpen.value = false;
  activeProject.value = null;
}

function submitContact() {
  const { name, email, role, message } = contactForm.value;
  const subject = encodeURIComponent('Festanstellung · Kontaktaufnahme');
  const body = encodeURIComponent(
    `Name: ${name}\nE-Mail: ${email}\nRolle: ${role}\n\nNachricht:\n${message}`
  );
  window.location.href = `mailto:andre@hickmann-kuschnereit.de?subject=${subject}&body=${body}`;
}

function openPalette() {
  paletteOpen.value = true;
  paletteQuery.value = '';
}

function closePalette() {
  paletteOpen.value = false;
}

function runPalette(item: { action: () => void }) {
  item.action();
  closePalette();
}

function handleKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openPalette();
  }
  if (event.key === 'Escape') {
    if (contactModalOpen.value) closeContactModal();
    if (projectModalOpen.value) closeProjectModal();
    if (paletteOpen.value) closePalette();
    if (konamiOpen.value) konamiOpen.value = false;
  }
}

const konamiSequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];
let konamiIndex = 0;

function pickFacts() {
  const shuffled = [...techFacts].sort(() => Math.random() - 0.5);
  konamiFacts.value = shuffled.slice(0, 4);
}

function handleKonami(event: KeyboardEvent) {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const target = konamiSequence[konamiIndex];
  if (key === target || event.key === target) {
    konamiIndex += 1;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      pickFacts();
      konamiOpen.value = true;
    }
  } else {
    konamiIndex = 0;
  }
}

onMounted(() => {
  document.documentElement.lang = locale.value;
  document.title = copy.value.pageTitle;
  initScroll();
  initNavHighlight();
  initReveal();
  initScrollEffects();
  initCounters();
  initMagnet();
  initTilt();
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keydown', handleKonami);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keydown', handleKonami);
});
</script>
