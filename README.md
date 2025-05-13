# Coolors.in

A next-generation color palette generator built with modern web technologies, designed to streamline color selection for designers and developers with advanced exploration and export tools.

## Features

- 🎨 Advanced color palette generator
- 🔒 Color locking for selective generation
- 📊 Comprehensive color theory system
- 🖼️ Image-to-palette extraction
- 👁️ Visualizer with UI templates
- 📱 Fully responsive design
- 🚀 Server-side rendering for SEO

## Tech Stack

- React.js with TypeScript
- Vite build tool
- Context API for state management
- Tailwind CSS and shadcn/ui for styling
- Next.js for SSR/SSG pages
- Drizzle ORM for database interactions

## Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.local.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

### Running in Development Mode

- For the React (Vite) app only:
  ```bash
  npm run dev
  ```

- For Next.js development:
  ```bash
  ./start-next-dev.sh
  ```

- For both apps simultaneously:
  ```bash
  ./start-all.sh
  ```

## Deployment to Vercel

This project is configured for deployment on Vercel.

### Automatic Deployment

1. Push your code to GitHub
2. Connect the repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### Manual Deployment

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

### Environment Variables

Configure the following environment variables in Vercel dashboard:

- `NODE_ENV`: Set to `production`
- `VITE_BASE_URL`: Your production URL
- `VITE_GA_ID`: Google Analytics ID
- `SESSION_SECRET`: A secure random string for session encryption

## Project Structure

- `/client`: React app (Vite)
- `/pages`: Next.js pages
- `/components`: Shared components
- `/shared`: Shared types and utilities
- `/server`: Express server for database operations

## Migration Status

The application is currently being migrated from React/Vite to Next.js. See `NEXT_MIGRATION.md` for details on the migration progress.

## License

MIT