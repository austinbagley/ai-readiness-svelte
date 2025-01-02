import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/style.css';
          }
          return 'assets/[name].[hash][extname]';
        },
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
      }
    },
    minify: true,
  },
  optimizeDeps: {
    include: ['chart.js', 'svelte-chartjs']
  }
});