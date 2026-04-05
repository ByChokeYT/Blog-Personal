import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite picks up PostCSS plugins if available, but for v4 we use the Vite plugin.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
