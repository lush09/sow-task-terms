import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
  },
});
