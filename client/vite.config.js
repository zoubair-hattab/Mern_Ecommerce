import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v2': {
        target: 'http://localhost:3000/api/v2',
        secure: false,
      },
    },
  },

  plugins: [react()],
});
