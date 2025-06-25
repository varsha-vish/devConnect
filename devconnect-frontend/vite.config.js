import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  preview: {
      allowedHosts: [
        'devconnect-jun25-1047am-40s-backend-varsha-vishwakarma-beta.platform.beta.sidepro.app'
      ]
    },
   server: {
  proxy: {
    '/api': {
      target: 'https://devconnect-jun25-1047am-40s-backend-varsha-vishwakarma-beta.platform.beta.sidepro.app',
      changeOrigin: true,
      secure: false,
    }
  }
}

   
})
