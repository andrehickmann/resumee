<template>
  <section id="stack" class="term-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / stack.json</span>
    </div>
    <h2 class="term-h2">{{ rd.stackTitle }}</h2>
    <p class="term-intro">{{ rd.stackIntro }}</p>

    <div class="stack-grid">
      <div v-for="item in groups" :key="item.title" class="stack-card">
        <div>
          <span class="key">"{{ item.title }}"</span><span class="punct">: [</span>
        </div>
        <div class="stack-tools">
          <span v-for="tool in item.tools" :key="tool" class="code-string">
            "{{ tool }}"<span class="punct">,</span>
          </span>
        </div>
        <div class="punct">],</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  rd: Record<string, string>;
  stackItems: { title: string; tools: string }[];
}>();

const groups = computed(() =>
  props.stackItems.map((item) => ({
    title: item.title,
    tools: item.tools.split(',').map((tool) => tool.trim())
  }))
);
</script>
