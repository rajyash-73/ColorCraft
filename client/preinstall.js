// This script ensures terser is installed before the build starts
const { execSync } = require('child_process');

console.log('Checking if terser is installed...');

try {
  // Try to require terser
  require.resolve('terser');
  console.log('terser is already installed.');
} catch (e) {
  // If terser is not installed, install it
  console.log('terser is not installed. Installing...');
  execSync('npm install --no-save terser', { stdio: 'inherit' });
  console.log('terser installed successfully.');
}