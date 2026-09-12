<template>
  <section id="kontakt" class="term-section">
    <div class="term-crumb">
      <span><span class="path">~/portfolio</span> / kontakt.sh</span>
    </div>

    <div class="contact-grid">
      <div>
        <h2 class="contact-title">{{ rd.contactTitle }}</h2>
        <p class="contact-intro">{{ rd.contactIntro }}</p>

        <div class="contact-facts">
          <div>
            <span class="key">{{ rd.contactMailLabel }}</span>
            <a :href="`mailto:${email}`">{{ email }}</a>
          </div>
          <div>
            <span class="key">{{ rd.contactWhereLabel }}</span>
            <span>{{ rd.contactWhere }}</span>
          </div>
          <div>
            <span class="key">{{ rd.contactLinksLabel }}</span>
            <a :href="linkedInUrl" target="_blank" rel="noreferrer">linkedin ↗</a>
            <a :href="githubUrl" target="_blank" rel="noreferrer" style="margin-left: 0.8rem">
              github ↗
            </a>
          </div>
        </div>
      </div>

      <div v-if="sent" class="contact-sent">
        <span class="exit">✔ exit 0</span> — {{ rd.sentText }}
      </div>

      <form v-else class="contact-form" @submit.prevent="$emit('submit')">
        <div class="contact-form-head">{{ rd.contactCommand }}</div>

        <label class="contact-field">
          <span class="flag">--name</span>
          <input v-model="model.name" :placeholder="rd.formName" required :disabled="submitting" />
        </label>

        <label class="contact-field">
          <span class="flag">--email</span>
          <input
            v-model="model.email"
            type="email"
            :placeholder="rd.formEmail"
            required
            :disabled="submitting"
          />
        </label>

        <label class="contact-field">
          <span class="flag">--role</span>
          <input v-model="model.role" :placeholder="rd.formRole" :disabled="submitting" />
        </label>

        <label class="contact-field is-block">
          <span class="flag">--message</span>
          <textarea
            v-model="model.message"
            rows="4"
            :placeholder="rd.formMessage"
            required
            :disabled="submitting"
          ></textarea>
        </label>

        <!-- Honeypot: hidden from readers, tempting for bots. -->
        <input
          v-model="model.honeypot"
          class="contact-honeypot"
          type="text"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />

        <div class="contact-field is-block is-captcha">
          <span class="flag">{{ rd.formCaptchaLabel }}</span>
          <div
            ref="captcha"
            class="h-captcha"
            :data-sitekey="captchaSiteKey"
            data-theme="dark"
          ></div>
        </div>

        <div v-if="error" class="contact-error">{{ error }}</div>

        <button class="term-btn-primary contact-submit" type="submit" :disabled="submitting">
          ▶ run — {{ rd.contactButton }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const captchaSiteKey = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';
const CAPTCHA_POLL_MS = 200;
const CAPTCHA_POLL_LIMIT = 50;

const email = 'andre@hickmann-kuschnereit.de';
const linkedInUrl = 'https://www.linkedin.com/in/andr%C3%A9-hickmann-425b97182/';
const githubUrl = 'https://github.com/andrehickmann';

defineProps<{
  rd: Record<string, string>;
  model: { name: string; email: string; role: string; message: string; honeypot: string };
  submitting: boolean;
  error: string;
  sent: boolean;
}>();

defineEmits<{
  (_e: 'submit'): void;
}>();

type HCaptcha = { render: (_el: HTMLElement, _options: Record<string, string>) => string };

const captcha = ref<HTMLElement | null>(null);
let poll = 0;

/**
 * The hCaptcha script scans the document once, when it loads. A form that Vue mounts
 * after that is never seen, so the widget has to be asked for explicitly - and the
 * script itself may still be in flight, hence the bounded retry.
 */
function renderCaptcha() {
  const api = (window as unknown as { hcaptcha?: HCaptcha }).hcaptcha;
  if (!captcha.value) return true;
  if (captcha.value.childElementCount) return true;
  if (!api) return false;
  api.render(captcha.value, { sitekey: captchaSiteKey, theme: 'dark' });
  return true;
}

onMounted(() => {
  if (renderCaptcha()) return;
  let attempts = 0;
  poll = setInterval(() => {
    attempts += 1;
    if (renderCaptcha() || attempts >= CAPTCHA_POLL_LIMIT) clearInterval(poll);
  }, CAPTCHA_POLL_MS) as unknown as number;
});

onUnmounted(() => clearInterval(poll));
</script>
