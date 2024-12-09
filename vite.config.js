import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['react-bootstrap'], // Ensures react-bootstrap is bundled correctly
  },
  build: {
    commonjsOptions: {
      ignoreDynamicRequires: true, // Prevent issues with dynamic imports
    },
  },
});
// import { defineConfig } from 'vite';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': 'http://localhost:3000',
//     },
//   },
// });
