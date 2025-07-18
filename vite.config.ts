import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    host: '0.0.0.0',       // 👈 exposes to network
    port: 5173,            // 👈 explicitly sets port (optional)
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
