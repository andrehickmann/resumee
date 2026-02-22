<template>
  <footer class="site-footer">
    <span>{{ copy.footer }}</span>
    <span class="footer-links">
      <RouterLink to="/legal#impressum">{{ copy.footerImprint }}</RouterLink>
      <RouterLink to="/legal#datenschutz">{{ copy.footerPrivacy }}</RouterLink>
    </span>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  copy: Record<string, unknown>;
}>();
</script>
