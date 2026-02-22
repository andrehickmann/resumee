import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import LegalView from './views/LegalView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/legal', name: 'legal', component: LegalView }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  }
});
