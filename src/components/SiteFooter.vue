<template>
  <footer class="site-footer">
    <span class="footer-left">{{ copy.footer }}</span>
    <span class="footer-note">{{ copy.footerNote }}</span>
    <span class="footer-links">
      <RouterLink to="/legal#impressum">{{ copy.footerImprint }}</RouterLink>
      <RouterLink to="/legal#datenschutz">{{ copy.footerPrivacy }}</RouterLink>
      <a
        href="https://github.com/andrehickmann/resumee/issues/new?template=bug_report.md"
        target="_blank"
        rel="noopener noreferrer"
        title="Report a bug on GitHub"
      >
        {{ copy.footerReportBug }}
      </a>
      <a
        href="https://github.com/andrehickmann/resumee"
        target="_blank"
        rel="noopener noreferrer"
        title="View source code on GitHub"
      >
        {{ copy.footerGitHub }}
      </a>
      <a
        :href="releaseUrl"
        target="_blank"
        rel="noopener noreferrer"
        :title="`${copy.footerVersionLabel} ${appVersion} release`"
      >
        {{ copy.footerVersionLabel }} {{ appVersion }}
      </a>
    </span>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useAppVersion } from '../composables/useAppVersion';

const { appVersion } = useAppVersion();
const releaseUrl = computed(
  () => `https://github.com/andrehickmann/resumee/releases/tag/v${appVersion}`
);

defineProps<{
  copy: {
    footer: string;
    footerNote: string;
    footerVersionLabel: string;
    footerImprint: string;
    footerPrivacy: string;
    footerReportBug: string;
    footerGitHub: string;
  };
}>();
</script>
