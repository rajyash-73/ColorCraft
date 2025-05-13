import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// This is a simplified Vite config for Replit that avoids ESM-only plugins
export default defineConfig({
  plugins: [
    react(),
    // Removed problematic ESM-only plugins: 
    // - runtimeErrorOverlay
    // - themePlugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    hmr: {
      clientPort: 443
    },
    strictPort: true,
    allowedHosts: [
      'localhost',
      '0.0.0.0',
      '172.31.128.17',
      'a7c2b0e9-c4bd-4912-9db6-d8e76a014543-00-1m0y5conrqvbj.riker.replit.dev',
      '.replit.dev',
      '.repl.co'
    ],
  },
});