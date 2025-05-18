import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    // 👇 Critical for local dev routing
    historyApiFallback: true,
  },
  // 👇 Critical for Netlify production routing
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html', // Explicit entry point
      },
    },
  }, 
  base: './',
});