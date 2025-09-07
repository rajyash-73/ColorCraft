import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupAuth } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createServer() {
  const app = express();
  
  // Set up middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Set up authentication
  setupAuth(app);
  
  console.log('Starting client-side development server...');
  
  // Create Vite server in middleware mode
  const vite = await createViteServer({
    configFile: path.join(rootDir, 'client', 'vite.config.replit.js'),
    root: path.join(rootDir, 'client'),
    server: { middlewareMode: true },
    appType: 'spa'
  });
  
  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  const port = 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`  ➜  Local:   http://localhost:${port}/`);
    console.log(`  ➜  Network: http://172.31.84.34:${port}/`);
  });
}

createServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});