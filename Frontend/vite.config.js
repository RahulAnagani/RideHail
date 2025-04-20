// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/RideHail/',  // Ensure this is correctly set
  plugins: [react()],
})
