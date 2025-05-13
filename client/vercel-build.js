#!/usr/bin/env node

// A simpler build script for Vercel
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting Vercel build process...');

try {
  // Ensure source directory exists
  const srcDir = path.join(__dirname, 'src');
  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  // File paths
  const mainVercelPath = path.join(srcDir, 'main.vercel.tsx');
  const mainPath = path.join(srcDir, 'main.tsx');
  const cssVercelPath = path.join(srcDir, 'index.vercel.css');
  const cssPath = path.join(srcDir, 'index.css');

  // Check if source files exist
  if (!fs.existsSync(mainVercelPath)) {
    console.error(`Vercel main file not found: ${mainVercelPath}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(cssVercelPath)) {
    console.error(`Vercel CSS file not found: ${cssVercelPath}`);
    process.exit(1);
  }

  // Copy files
  console.log('Copying Vercel-specific files...');
  fs.copyFileSync(mainVercelPath, mainPath);
  fs.copyFileSync(cssVercelPath, cssPath);
  console.log('Files copied successfully');

  // Config file
  const configFile = path.join(__dirname, 'vite.config.vercel.mjs');
  if (!fs.existsSync(configFile)) {
    console.error(`Vercel config file not found: ${configFile}`);
    process.exit(1);
  }

  // Run build
  console.log('Running Vite build with Vercel config...');
  execSync(`npx vite build --config ${configFile}`, {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}