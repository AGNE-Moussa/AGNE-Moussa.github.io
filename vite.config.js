import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site servi à la racine de https://agne-moussa.github.io
export default defineConfig({
  plugins: [react()],
  base: '/',
})
