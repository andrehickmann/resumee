import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
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
