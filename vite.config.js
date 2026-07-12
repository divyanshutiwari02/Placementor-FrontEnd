// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:"/Placementor-FrontEnd/",
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://place-d7ee.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})