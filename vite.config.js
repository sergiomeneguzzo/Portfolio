import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cookiePolicy: resolve(__dirname, 'legal/cookie-policy.html'),
        privacyPolicy: resolve(__dirname, 'legal/privacy-policy.html'),
      },
    },
    cssCodeSplit: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
});
