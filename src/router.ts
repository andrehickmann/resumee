import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import LegalView from './views/LegalView.vue';
import UnderConstruction from './views/UnderConstruction.vue';

// Environment variable to toggle under construction mode
const UNDER_CONSTRUCTION = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: UNDER_CONSTRUCTION ? UnderConstruction : HomeView },
    { path: '/legal', name: 'legal', component: LegalView }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  }
});
