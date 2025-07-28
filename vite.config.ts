import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('/Users/suyogyashrestha/ssl-local/server.key'),
      cert: fs.readFileSync('/Users/suyogyashrestha/ssl-local/server.crt'),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
