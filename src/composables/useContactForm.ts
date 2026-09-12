import { ref } from 'vue';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '9189f54a-81f9-428f-ab76-af89e7a8e3ed';

export type ContactMessages = {
  captchaMissing: string;
  submitError: string;
};

export function useContactForm(messages: () => ContactMessages) {
  const form = ref({ name: '', email: '', role: '', message: '', honeypot: '' });
  const submitting = ref(false);
  const error = ref('');
  const sent = ref(false);

  function reset() {
    form.value = { name: '', email: '', role: '', message: '', honeypot: '' };
  }

  async function submit() {
    submitting.value = true;
    error.value = '';

    try {
      const captcha = document.querySelector(
        'textarea[name="h-captcha-response"]'
      ) as HTMLTextAreaElement | null;

      if (!captcha || !captcha.value) {
        error.value = messages().captchaMissing;
        return;
      }

      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);
      payload.append('name', form.value.name);
      payload.append('email', form.value.email);
      payload.append('subject', `Kontaktanfrage von ${form.value.name}`);
      payload.append(
        'message',
        [
          `Name: ${form.value.name}`,
          `E-Mail: ${form.value.email}`,
          form.value.role ? `Rolle/Position: ${form.value.role}` : '',
          '',
          'Nachricht:',
          form.value.message
        ]
          .filter(Boolean)
          .join('\n')
      );
      payload.append('h-captcha-response', captcha.value);
      if (form.value.honeypot) payload.append('botcheck', form.value.honeypot);

      const response = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: payload });
      const data = await response.json();

      if (!response.ok || !data.success) {
        error.value = data.message || messages().submitError;
        return;
      }

      sent.value = true;
      reset();
    } catch {
      error.value = messages().submitError;
    } finally {
      submitting.value = false;
    }
  }

  return { form, submitting, error, sent, submit };
}
