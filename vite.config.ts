import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // CRITICAL: Forces absolute paths starting with /
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false, // FORCED: Combines all CSS into one file so it's harder to lose
    sourcemap: false,
  }
});
