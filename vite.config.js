import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Uncomment for GitHub Pages (replace with your repo name):
  // base: '/vikram-kavita-wedding/',
})
