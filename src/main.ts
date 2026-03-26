import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { createI18nInstance } from './i18n';
import { routes, scrollBehavior } from './router';
import './styles.css';

export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app }) => {
  app.use(createI18nInstance());
});
