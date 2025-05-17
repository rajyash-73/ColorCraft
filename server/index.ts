import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { setupAuth } from './auth';

async function startDevServer() {
  const app = express();
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Setup user authentication
  setupAuth(app);
  
  // Authentication API routes
  // Note: These are already set up in the setupAuth function
  
  // Static file handling (for production)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'dist/client')));
    
    // Serve the client for any other routes (for SPA)
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist/client/index.html'));
    });
  }
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  // For development environment, start the Vite dev server
  if (process.env.NODE_ENV !== 'production') {
    try {
      // Start client-side development server
      console.log('Starting client-side development server...');
      
      // Import Vite
      const vite = await import('vite');
      
      // Create Vite server
      const viteDevServer = await vite.createServer({
        root: './client',
        server: { 
          middlewareMode: true
        },
        appType: 'spa',
        base: '/'
      });
      
      // Use Vite's middleware
      app.use(viteDevServer.middlewares);
      
    } catch (error) {
      console.error('Error starting Vite dev server:', error);
    }
  }
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startDevServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});