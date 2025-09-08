#!/usr/bin/env node

// Temporary redirect script to start Vite directly
// This fixes the workflow crash while maintaining the old command structure

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('🔄 Redirecting to Vite development server...');
console.log('🚀 Starting Coolors.in Color Palette Generator...');

// Start Vite development server from client directory
const viteProcess = spawn('npx', ['vite'], {
  cwd: path.join(rootDir, 'client'),
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (err) => {
  console.error('❌ Failed to start Vite:', err);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  if (code !== 0) {
    console.log(`⚠️  Vite process exited with code ${code}`);
  }
  process.exit(code || 0);
});