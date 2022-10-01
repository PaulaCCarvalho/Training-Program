import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@storybook/addon-a11y/preview.js',
      '@storybook/addon-actions/preview.js',
      '@storybook/addon-backgrounds/preview.js',
      'babel-plugin-open-source/script.js',
      'chromatic/isChromatic',
      'storybook-dark-mode',
    ],
  },

})
