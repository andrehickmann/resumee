<template>
  <div class="modal" :class="{ open: open }">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal-panel" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>{{ copy.modalTitle }}</h3>
        <button class="modal-close" @click="$emit('close')" aria-label="Schließen">×</button>
      </div>
      <form class="contact-form" @submit.prevent="$emit('submit')">
        <input type="text" v-model="model.name" :placeholder="copy.formName" required />
        <input type="email" v-model="model.email" :placeholder="copy.formEmail" required />
        <input type="text" v-model="model.role" :placeholder="copy.formRole" />
        <textarea v-model="model.message" :placeholder="copy.formMessage" rows="4" required></textarea>
        <button class="primary" data-magnet type="submit">
          {{ copy.contactButton }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
type ContactForm = { name: string; email: string; role: string; message: string };

defineProps<{
  copy: Record<string, unknown>;
  open: boolean;
  model: ContactForm;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'submit'): void;
}>();
</script>
