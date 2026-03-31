<template>
  <section id="kontakt" class="section contact">
    <div class="section-header">
      <h2>{{ copy.contactTitle }}</h2>
      <p>{{ copy.contactIntro }}</p>
    </div>
    <div class="contact-card">
      <div>
        <p>{{ copy.contactCardCopy }}</p>
        <div class="contact-details">
          <a class="contact-link" href="mailto:andre@hickmann-kuschnereit.de">
            {{ copy.contactEmail }}
          </a>
          <span>{{ copy.contactLocation }}</span>
          <div class="contact-links">
            <a
              class="contact-link"
              href="https://www.linkedin.com/in/andr%C3%A9-hickmann-425b97182/"
              target="_blank"
              rel="noreferrer"
            >
              {{ copy.contactLinkedIn }}
            </a>
            <a
              class="contact-link"
              href="https://github.com/andrehickmann"
              target="_blank"
              rel="noreferrer"
            >
              {{ copy.contactGithub }}
            </a>
          </div>
        </div>
      </div>
      <button class="primary" data-magnet @click="$emit('open-contact')">
        {{ copy.contactButton }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  copy: Record<string, unknown>;
}>();

defineEmits<{
  (_e: 'open-contact'): void;
}>();
</script>
