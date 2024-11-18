import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically opens the browser
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your Express server port
        changeOrigin: true,
        secure: false, // If you're using HTTPS and want to allow self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, '') // Optional: remove '/api' prefix when forwarding
      },
    },
  },
});
