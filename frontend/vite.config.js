import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/etherpad': {
        target: 'http://etherpad:9001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/etherpad/, ''),
        ws: true, // Enable WebSocket proxying
      },
    },
  },
})
