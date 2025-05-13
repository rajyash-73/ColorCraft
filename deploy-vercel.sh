#!/bin/bash

# Vercel deployment script for Coolors.in
# This script helps to prepare and deploy the application to Vercel

echo "🚀 Preparing Coolors.in for Vercel deployment..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Run linting and type checking
echo "🔍 Running type check..."
npx tsc --noEmit

# Create production build for testing locally
echo "🏗️ Creating production build for testing..."
cd client && node build-vercel.js
cd ..

# Check if the build was successful
if [ ! -d "client/dist" ]; then
  echo "❌ Build failed! Please check the errors above."
  exit 1
fi

echo "✅ Build successful!"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "🔄 Installing Vercel CLI..."
  npm install -g vercel
fi

echo "🌐 Ready to deploy to Vercel!"
echo "You can deploy now using one of these methods:"
echo ""
echo "1. Deploy with Vercel CLI:"
echo "   vercel"
echo ""
echo "2. Deploy via the Vercel dashboard:"
echo "   - Go to https://vercel.com/import"
echo "   - Connect to your Git repository"
echo "   - Follow the setup wizard"
echo ""
echo "Make sure to set the required environment variables in Vercel:"
echo "- NODE_ENV=production"
echo "- VITE_BASE_URL=https://your-domain.com"
echo "- VITE_GA_ID=your-google-analytics-id"
echo "- SESSION_SECRET=your-secure-session-secret"
echo ""
echo "For detailed instructions, see VERCEL_DEPLOYMENT.md"

# Ask if user wants to deploy via CLI right now
read -p "Do you want to deploy via Vercel CLI now? (y/n): " deploy_now

if [[ "$deploy_now" =~ ^[Yy]$ ]]; then
  echo "🚀 Deploying to Vercel..."
  vercel
else
  echo "📝 You can deploy later using 'vercel' command or via the Vercel dashboard."
fi

echo "Done! 🎉"