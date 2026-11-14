import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// NOTE: For GitHub Pages project-site deployment set `base` to "/<repo-name>/".
// It can be overridden at build time via the VITE_BASE env var, which the
// provided GitHub Actions workflow sets automatically from the repository name.
export default defineConfig(() => {
  const base = process.env.VITE_BASE || '/'
  return {
    base,
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 900,
    },
    server: {
      port: 5173,
      open: true,
    },
  }
})
