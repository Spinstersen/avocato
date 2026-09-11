import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Prototype isole — base relative, aucun conflit avec webapp/ (avocato-v3).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', assetsInlineLimit: 4096 },
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
})
