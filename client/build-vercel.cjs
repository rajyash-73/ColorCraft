// CommonJS build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Setting up Vercel-specific build files...');
  
  // Ensure we're using the Vercel-specific files
  // Copy main.vercel.tsx to main.tsx
  fs.copyFileSync(
    path.resolve(__dirname, './src/main.vercel.tsx'),
    path.resolve(__dirname, './src/main.tsx')
  );
  
  // Copy index.vercel.css to index.css
  fs.copyFileSync(
    path.resolve(__dirname, './src/index.vercel.css'),
    path.resolve(__dirname, './src/index.css')
  );
  
  console.log('Files copied successfully');
  
  // Run the build with the Vercel config
  console.log('Running Vite build with Vercel config...');
  execSync('npx vite build --config vite.config.vercel.mjs', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}