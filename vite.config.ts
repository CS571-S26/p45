import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/p45',
  plugins: [react()],
  build: {
    outDir: "docs"
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
})
