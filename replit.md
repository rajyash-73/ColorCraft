# Coolors.in Color Palette Generator

## Overview

Coolors.in is a next-generation color palette generator built with modern web technologies. The application is currently undergoing a migration from a client-side React application to a server-rendered Next.js application to improve SEO, performance, and user experience. The project provides advanced color exploration tools, palette generation with color theory support, image-to-palette extraction, and visualization templates for designers and developers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Hybrid Architecture Pattern
The application currently operates in a hybrid state during the Next.js migration, with both the original React (Vite) client and new Next.js pages coexisting:

- **Client Directory**: Contains the original React application built with Vite
- **Pages Directory**: Houses Next.js server-rendered pages and API routes
- **Shared Directory**: Common types and utilities used across both architectures

### Frontend Architecture
The frontend uses a component-based architecture with multiple rendering strategies:

- **Client-Side Rendering**: Original React app using Vite for development and bundling
- **Server-Side Rendering**: Next.js pages for improved SEO and initial load performance
- **State Management**: React Context API for palette state management across the application
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **Color Processing**: Custom utilities for color manipulation, theory calculations, and accessibility

### Build and Deployment Strategy
The project employs a multi-environment build system:

- **Development**: Vite dev server for fast hot reloading during development
- **Production**: Vercel-optimized builds with specific configuration for deployment
- **Static Assets**: Optimized images and fonts with proper caching headers

### Color Generation Engine
Core functionality built around sophisticated color algorithms:

- **Random Generation**: Algorithmic color palette creation
- **Color Theory Support**: Complementary, analogous, triadic, and other harmony rules
- **Image Extraction**: Server-side color extraction from uploaded images using Canvas API
- **Lock/Unlock System**: Individual color preservation during regeneration

### API Architecture
Next.js API routes provide server-side functionality:

- **Color Extraction API**: Processes images and returns dominant color palettes
- **OpenGraph Image Generation**: Dynamic social media preview images
- **Palette Sharing**: URL-based palette sharing and preview functionality

## External Dependencies

### Core Technologies
- **React 18**: Component library with TypeScript support
- **Next.js**: Full-stack React framework for SSR/SSG
- **Vite**: Development build tool for the client application
- **Tailwind CSS**: Utility-first CSS framework

### Database and ORM
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Database for user accounts and saved palettes (via Neon serverless)
- **Database Schema**: User management and palette storage with relationships

### UI and Styling
- **shadcn/ui**: React component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library for consistent iconography
- **html2canvas**: Client-side screenshot generation for palette exports

### Authentication and Session Management
- **Email/Password Authentication**: Secure user registration and login using Passport.js
- **Password Security**: bcrypt hashing with salt for secure password storage
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple
- **Protected Routes**: Authentication middleware for API endpoints
- **User Context**: React Context API for authentication state management across components

### Development and Build Tools
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### External Services
- **Vercel**: Deployment platform with edge functions and CDN
- **Google Analytics**: User behavior tracking and analytics
- **Google AdSense**: Advertisement integration with performance optimization
- **Node Canvas**: Server-side image processing for color extraction and OpenGraph generation

### Performance and SEO
- **Next.js Image Optimization**: Automatic image optimization and lazy loading
- **Structured Data**: JSON-LD schema for search engine understanding
- **Web Fonts**: Optimized font loading with preconnect hints
- **Service Worker**: Caching strategy for improved performance (planned)