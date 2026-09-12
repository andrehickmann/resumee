<template>
  <section id="leistungen" class="term-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / leistungen.ts</span>
    </div>
    <h2 class="term-h2">{{ rd.servicesTitle }}</h2>
    <p class="term-intro">{{ rd.servicesIntro }}</p>

    <div class="code-block">
      <div class="fence">
        <span class="code-keyword">export const</span> <span class="code-ident">services</span> = [
      </div>

      <div v-for="(service, index) in services" :key="service.title" class="service-row">
        <span class="no">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="body">
          <span>{ title: </span><span class="code-string">"{{ service.title }}"</span><span>,</span>
          <div class="service-desc">
            <span class="mono">desc: </span>{{ service.description }}
            <span class="mono">},</span>
          </div>
        </div>
      </div>

      <div class="fence">] <span class="code-keyword">as const</span>;</div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  rd: Record<string, string>;
  services: { title: string; description: string }[];
}>();
</script>
