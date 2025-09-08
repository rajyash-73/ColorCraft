import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createServer() {
  const app = express();
  
  // Set up middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  console.log('Starting client-side development server...');
  
  // Create Vite server in middleware mode with minimal config
  const vite = await createViteServer({
    root: path.join(rootDir, 'client'),
    configFile: false, // Disable config file to avoid ESM issues
    server: { 
      middlewareMode: true,
      hmr: {
        port: 24678,
      },
    },
    appType: 'spa',
    resolve: {
      alias: {
        "@": path.join(rootDir, 'client', 'src'),
        "@shared": path.join(rootDir, 'shared'),
        "@assets": path.join(rootDir, 'attached_assets'),
      },
    },
    plugins: [
      // Add only essential plugins
      (await import('@vitejs/plugin-react')).default(),
    ],
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