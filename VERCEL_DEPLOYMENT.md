# Vercel Deployment Guide for Coolors.in

This document provides detailed instructions for deploying Coolors.in to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your Vercel account
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the Coolors.in repository

### 2. Configure Project

Vercel will automatically detect the project configuration from `vercel.json`, but you may need to adjust some settings:

- **Framework Preset**: Vite (automatically detected)
- **Build Command**: `cd client && node build-vercel.js` (defined in vercel.json)
- **Output Directory**: `client/dist` (defined in vercel.json)
- **Environment Variables**: Add the following environment variables:
  - `NODE_ENV`: `production`
  - `VITE_BASE_URL`: Your production URL (e.g., `https://coolors.vercel.app`)
  - `VITE_GA_ID`: Your Google Analytics ID
  - `SESSION_SECRET`: A secure random string for session encryption

### 3. Deploy

Click "Deploy" and wait for the build to complete.

## Custom Domain Setup (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `coolors.in`)
4. Follow Vercel's instructions to configure DNS settings

## Automatic Deployments

By default, Vercel will automatically deploy when you push changes to the main branch of your repository. You can configure this behavior in the "Git" section of your project settings.

## Build Optimizations

The project is already optimized for Vercel with:

- Enhanced cache headers for static assets
- Optimized build process with chunk splitting
- Security headers for improved protection
- SEO improvements with robots.txt and sitemap.xml

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in Vercel for specific errors
2. Verify environment variables are set correctly
3. Ensure all dependencies are properly listed in package.json
4. Check that the build command and output directory are correctly configured

## Monitoring

After deployment, monitor your application's performance using:

- Vercel Analytics
- Google Analytics (configured in the app)
- Vercel's deployment logs

## Next.js Migration

As the project is being migrated to Next.js, future deployments will leverage Vercel's native Next.js support. See `NEXT_MIGRATION.md` for more details on the migration progress.