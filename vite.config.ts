import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@shared': '/src/shared/',
      '@app': '/src/app/',
      '@features': '/src/features/',
      '@pages': '/src/pages/'
    }
  },
  worker: {
    format: 'es',
    rollupOptions: {
      external: []
    }
  },

  build: {
    rollupOptions: {
      external: []
    }
  }
});
