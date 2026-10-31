import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (quentingautier2b.github.io) : le site est servi à la racine.
export default defineConfig({ plugins: [react()], base: '/' })
