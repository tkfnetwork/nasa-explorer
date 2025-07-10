import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { coverageConfigDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {},
    modules: {
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    minify: true,
    rollupOptions: {
      treeshake: 'smallest',
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          return null;
        },
      },
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        '**/_templates/**',
        '**/build/**',
        '**/dist/**',
        '**/index.ts',
        '**/*.types.ts',
        '**/*.stories.tsx',
        '**/routeTree.gen.ts',
        '**/routes/**',
        '**/generated/**',
        // Firefox fix is for navigator
        '**/utils/virtual.ts',
        ...coverageConfigDefaults.exclude,
      ],
      include: ['**/src/**/*'],
    },
  },
});
