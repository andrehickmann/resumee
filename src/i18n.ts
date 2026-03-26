import { createI18n } from 'vue-i18n';
import { contentDe } from './content.de.js';
import { contentEn } from './content.en.js';

export function createI18nInstance() {
  return createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'de',
    messages: {
      de: { app: contentDe },
      en: { app: contentEn }
    }
  });
}
