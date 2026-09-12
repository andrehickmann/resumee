<template>
  <footer class="term-status">
    <span class="branch">⎇ {{ rd.branch }}</span>
    <span class="term-status-desktop">{{ rd.footer }}</span>
    <span class="term-status-right">
      <RouterLink to="/legal#impressum">{{ rd.footerImprint }}</RouterLink>
      <RouterLink to="/legal#datenschutz">{{ rd.footerPrivacy }}</RouterLink>
      <span class="term-status-desktop">UTF-8</span>
      <span class="term-status-desktop">⌘K</span>
      <span class="term-status-desktop" title="Konami">{{ rd.konamiHint }}</span>
    </span>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  rd: Record<string, string>;
}>();
</script>
