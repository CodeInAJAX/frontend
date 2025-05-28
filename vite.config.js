import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),basicSsl()],
  // plugins: [react(),tailwindcss()],
  server: {
    https: true,
    proxy: {
      '/api/v1' : {
        target: 'http://103.210.35.189:8135',
        changeOrigin: true,
      },
      '/storage' : {
        target: 'http://103.210.35.189:8132',
        changeOrigin: true,
      }
    }
  }
})
