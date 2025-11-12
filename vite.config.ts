import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/harry-potter-task/",
  plugins: [react()],
})