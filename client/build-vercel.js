// build-vercel.js - Script to build only the client for Vercel deployment
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building client for Vercel deployment...');
try {
  // Change to client directory and run Vite build
  execSync('cd client && npm run build', { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('Client build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}