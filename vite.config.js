import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forwards /api/* from Vite dev server to your backend
      '/api': {
        target: 'http://localhost:5000', // or your Render URL if you prefer
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
