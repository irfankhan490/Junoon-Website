import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Only used by `npm run dev`; ignored in production. Lets /api/send-order
    // work locally when `npx wrangler dev` is running alongside on port 8787.
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
