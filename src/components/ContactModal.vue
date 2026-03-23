<template>
  <div class="modal" :class="{ open: open }">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div class="modal-header">
        <h3 id="contact-modal-title">{{ copy.modalTitle }}</h3>
        <button class="modal-close" aria-label="Schließen" @click="$emit('close')">×</button>
      </div>

      <div v-if="success" class="success-message">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4caf50"
          stroke-width="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <p>{{ successMessage }}</p>
      </div>

      <form v-else class="contact-form" @submit.prevent="$emit('submit')">
        <!-- Honeypot field - hidden from users, catches bots -->
        <input
          v-model="model.honeypot"
          type="text"
          style="position: absolute; left: -9999px; width: 1px; height: 1px"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />

        <input
          v-model="model.name"
          type="text"
          :placeholder="copy.formName"
          required
          :disabled="submitting"
        />
        <input
          v-model="model.email"
          type="email"
          :placeholder="copy.formEmail"
          required
          :disabled="submitting"
        />
        <input
          v-model="model.role"
          type="text"
          :placeholder="copy.formRole"
          :disabled="submitting"
        />
        <textarea
          v-model="model.message"
          :placeholder="copy.formMessage"
          rows="4"
          required
          :disabled="submitting"
        ></textarea>

        <!-- hCaptcha Widget -->
        <div
          class="h-captcha"
          data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          :data-theme="captchaTheme"
        ></div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button class="primary" data-magnet type="submit" :disabled="submitting">
          {{ submitting ? 'Wird gesendet...' : copy.contactButton }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ContactForm = {
  name: string;
  email: string;
  role: string;
  message: string;
  honeypot?: string;
};

defineProps<{
  copy: Record<string, unknown>;
  open: boolean;
  model: ContactForm;
  submitting?: boolean;
  error?: string;
  success?: boolean;
  successMessage?: string;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'submit'): void;
}>();

// Auto detect theme based on system preference
const captchaTheme = computed(() => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
});
</script>

<style scoped>
.success-message {
  text-align: center;
  padding: 2rem;
}

.success-message svg {
  margin: 0 auto 1rem;
  display: block;
  animation: checkmark 0.5s ease-out;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-message p {
  color: #4caf50;
  font-size: 1.1rem;
  font-weight: 500;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.h-captcha {
  margin: 1rem 0;
}
</style>
