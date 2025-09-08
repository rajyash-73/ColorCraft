#!/usr/bin/env node

import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startDevServer() {
  console.log('Starting Vite development server...');
  
  const server = await createServer({
    configFile: path.join(__dirname, 'client', 'vite.config.js'),
    root: path.join(__dirname, 'client'),
    server: {
      port: 5000,
      host: '0.0.0.0'
    }
  });

  await server.listen();
  server.printUrls();
  console.log('\n✅ Vite development server is running!');
}

startDevServer().catch(err => {
  console.error('❌ Error starting dev server:', err);
  process.exit(1);
});