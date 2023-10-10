import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@app': './src',
      '@test': './test'
    },
    root: './'
  },
  resolve: {
    alias: {
      '@app': './src',
      '@test': './test'
    }
  },
  plugins: [swc.vite()]
})
