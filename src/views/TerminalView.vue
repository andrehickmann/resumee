<template>
  <div class="term">
    <div class="term-atmosphere"></div>

    <header class="term-head">
      <TitleBar
        :active-file="activeFile"
        :active-filter="activeTagText"
        :lang="locale"
        @open-palette="openPalette"
        @set-lang="setLang"
      />
      <FileTabs :files="files" :active="active" @navigate="goTo" />
    </header>

    <div class="term-body">
      <Explorer
        :files="files"
        :active="active"
        :side-projects="sideSlugs"
        :stats="stats"
        :eyebrow="rd.eyebrow"
        :cv-href="copy.cvFile"
        :cv-label="rd.cvButton"
        @navigate="goTo"
      />

      <main id="main" class="term-main">
        <HeroSection
          :rd="rd"
          :stats="stats"
          :brand="copy.brand"
          :portrait-alt="copy.heroImageAlt"
          @navigate="goTo"
        />
        <ServicesSection :rd="rd" :services="copy.services" />
        <StackSection :rd="rd" :stack-items="copy.stackItems" />
        <IndustriesSection :rd="rd" :industries="copy.industries" />
        <ProjectsLog
          :rd="rd"
          :tag-filters="tagFilters"
          :projects="visibleProjects"
          :filtered-count="filteredProjects.length"
          :total-count="allProjects.length"
          :hidden-count="hiddenCount"
          :show-all="showAll"
          @toggle-tag="toggleTag"
          @toggle-all="toggleShowAll"
        />
        <SideProjects :rd="rd" :projects="copy.side" />
        <TimelineSection
          :rd="rd"
          :timeline="copy.careerTimeline"
          :education-note="copy.educationNote"
          :cv-href="copy.cvFile"
        />
        <ContactSection
          :rd="rd"
          :model="form"
          :submitting="submitting"
          :error="error"
          :sent="sent"
          @submit="submit"
        />
      </main>
    </div>

    <StatusBar :rd="rd" />

    <CommandPalette
      :open="paletteOpen"
      :query="paletteQuery"
      :items="paletteItems"
      :rd="rd"
      @close="closePalette"
      @run="runPaletteItem"
      @update:query="(value) => (paletteQuery = value)"
    />

    <KonamiOverlay :open="konamiOpen" :facts="konamiFacts" :rd="rd" @close="konamiOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { scrollSpyAlias, scrollSpyIds, terminalFiles } from '../data/terminalFiles';
import { useContactForm } from '../composables/useContactForm';
import { pickFacts, useKonami } from '../composables/useKonami';
import { scrollToSection, useScrollSpy } from '../composables/useScrollSpy';
import { useTerminalProjects } from '../composables/useTerminalProjects';

import TitleBar from '../components/terminal/TitleBar.vue';
import FileTabs from '../components/terminal/FileTabs.vue';
import Explorer from '../components/terminal/Explorer.vue';
import HeroSection from '../components/terminal/HeroSection.vue';
import ServicesSection from '../components/terminal/ServicesSection.vue';
import StackSection from '../components/terminal/StackSection.vue';
import IndustriesSection from '../components/terminal/IndustriesSection.vue';
import ProjectsLog from '../components/terminal/ProjectsLog.vue';
import SideProjects from '../components/terminal/SideProjects.vue';
import TimelineSection from '../components/terminal/TimelineSection.vue';
import ContactSection from '../components/terminal/ContactSection.vue';
import StatusBar from '../components/terminal/StatusBar.vue';
import CommandPalette, { type PaletteItem } from '../components/terminal/CommandPalette.vue';
import KonamiOverlay from '../components/terminal/KonamiOverlay.vue';

import '../terminal.css';

const BASE_URL = 'https://hickmann-kuschnereit.de';

const pageDescriptions = {
  de: 'Senior Fullstack Engineer aus Berlin, 23 Jahre Praxis: Anforderungen, Code, Cloud und Betrieb. Offen für eine Festanstellung in Berlin oder remote.',
  en: 'Senior full-stack engineer based in Berlin, 23 years of practice: requirements, code, cloud and operations. Open to a permanent role in Berlin or remote.'
} as const;

const { locale, tm } = useI18n({ useScope: 'global' });

// vue-i18n returns the whole message tree untyped; the shape lives in content.de.js.
const copy = computed(() => tm('app') as Record<string, any>);
const rd = computed(() => copy.value.rd);

const {
  tagFilters,
  activeTagText,
  allProjects,
  filteredProjects,
  visibleProjects,
  hiddenCount,
  showAll,
  topTags,
  toggleTag,
  selectOnlyTag,
  toggleShowAll,
  resetFilters
} = useTerminalProjects(copy);

const { form, submitting, error, sent, submit } = useContactForm(() => ({
  captchaMissing: rd.value.captchaMissing,
  submitError: rd.value.submitError
}));

const { active } = useScrollSpy(scrollSpyIds, { bottom: 'kontakt', alias: scrollSpyAlias });

const files = computed(() =>
  rd.value.nav.map((entry: { id: string; label: string }) => ({
    id: entry.id,
    ...terminalFiles[entry.id]
  }))
);

const activeFile = computed(() => terminalFiles[active.value]?.file ?? terminalFiles.profil.file);

const sideSlugs = computed(() =>
  copy.value.side.map((project: { name: string }) => ({
    slug: project.name.toLowerCase().replace(/\s+/g, '-')
  }))
);

const stats = computed(() => {
  const counts: Record<string, number> = {
    projects: allProjects.value.length,
    industries: copy.value.industries.length
  };
  return copy.value.stats.map((stat: { key: string; value: string }, index: number) => ({
    label: rd.value.statsLabels[index],
    value: counts[stat.key] ?? Number(stat.value)
  }));
});

const paletteOpen = ref(false);
const paletteQuery = ref('');
const konamiOpen = ref(false);
const konamiFacts = ref<string[]>([]);

const paletteItems = computed<PaletteItem[]>(() => {
  const items: PaletteItem[] = [
    ...rd.value.nav.map((entry: { id: string; label: string }) => ({
      key: `section-${entry.id}`,
      label: entry.label,
      type: rd.value.paletteSectionType,
      run: () => goTo(entry.id)
    })),
    ...topTags.value.map((tag) => ({
      key: `tag-${tag}`,
      label: tag,
      type: rd.value.paletteFilterType,
      run: () => {
        selectOnlyTag(tag);
        goTo('projekte');
      }
    })),
    ...copy.value.side.map((project: { name: string }) => ({
      key: `side-${project.name}`,
      label: project.name,
      type: rd.value.paletteSideType,
      run: () => goTo('side')
    }))
  ];
  const term = paletteQuery.value.trim().toLowerCase();
  if (!term) return items;
  return items.filter((item) => item.label.toLowerCase().includes(term));
});

useKonami(() => {
  konamiFacts.value = pickFacts(rd.value.facts);
  konamiOpen.value = true;
});

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: copy.value.pageTitle,
  link: [{ rel: 'canonical', href: `${BASE_URL}/` }],
  meta: [
    {
      name: 'description',
      content:
        pageDescriptions[locale.value as keyof typeof pageDescriptions] ?? pageDescriptions.de
    },
    { property: 'og:url', content: `${BASE_URL}/` },
    { property: 'twitter:url', content: `${BASE_URL}/` }
  ]
}));

watch(locale, () => {
  resetFilters();
  closePalette();
});

function goTo(id: string) {
  closePalette();
  scrollToSection(id);
}

function setLang(lang: 'de' | 'en') {
  locale.value = lang;
}

function openPalette() {
  paletteQuery.value = '';
  paletteOpen.value = true;
}

function closePalette() {
  paletteOpen.value = false;
}

function runPaletteItem(item: PaletteItem) {
  item.run();
  closePalette();
}

function handleKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (paletteOpen.value) closePalette();
    else openPalette();
    return;
  }
  if (event.key === 'Escape') {
    closePalette();
    konamiOpen.value = false;
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>
