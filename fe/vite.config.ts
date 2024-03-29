import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({
    exclude: [/virtual:/, /node_modules/, "build"]
  }), tsconfigPaths()],
  server: {
    open: true,
    hmr: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  base: './',
})
