import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Ensure only one JS chunk is generated
        manualChunks: undefined,
        // Combine all CSS into one file
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/style.css';
          }
          return 'assets/[name].[hash][extname]';
        },
        // Combine all JS into one file
        entryFileNames: 'assets/[name].js',
        // Don't split into chunks
        chunkFileNames: 'assets/[name].js',
      }
    },
    // Minimize output
    minify: true,
  }
})