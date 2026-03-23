import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [vue(), cloudflare()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    allowedHosts: [
      'localhost',
      'resumee.localhost',
      'resumee-lu1n.onrender.com',
      'www.hickmann-kuschnereit.de'
    ]
  }
});