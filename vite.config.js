import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('/react/')) return 'react';
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'motion';
          if (id.includes('react-icons')) return 'icons';
          return undefined;
        }
      }
    }
  }
});
