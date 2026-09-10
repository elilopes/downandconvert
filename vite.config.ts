import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    optimizeDeps: {
      entries: ['index.html'],
      exclude: ['vite', 'express', 'rollup', 'fsevents', 'btch-downloader'],
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        external: ['fsevents', 'rollup', 'vite', 'express', 'node:path', 'node:fs', 'node:url', 'node:stream', 'node:crypto', 'node:os', 'node:util', 'path', 'fs', 'crypto', 'os', 'stream'],
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@ffmpeg')) return 'vendor-ffmpeg';
              if (id.includes('lucide-react') || id.includes('motion') || id.includes('canvas-confetti')) return 'vendor-ui';
              if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
              if (id.includes('jszip') || id.includes('lamejs')) return 'vendor-utils';
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
