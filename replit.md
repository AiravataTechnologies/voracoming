# Project Overview

This is a full-stack TypeScript application migrated from Figma to Replit and configured for Netlify deployment, featuring a "Coming Soon" landing page with modern React frontend and serverless backend functions.

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with hot module replacement

### Backend (Netlify Functions + Express for Development)
- **Production**: Netlify serverless functions (JavaScript)
- **Development**: Express.js with TypeScript for local development
- **Database**: PostgreSQL with Drizzle ORM (optional)
- **Storage**: MemStorage for development (in-memory)
- **Email Service**: Nodemailer with Gmail integration
- **API**: RESTful endpoints with validation

### Key Features
- Modern component architecture with shadcn/ui
- Netlify-ready deployment configuration
- Serverless functions for backend functionality
- Email subscription with Gmail integration
- Responsive design optimized for all devices
- Type-safe development environment
- Asset management for Figma exports

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and client config
│   └── public/
│       └── figmaAssets/    # Migrated Figma assets
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Storage abstraction layer
│   └── vite.ts            # Vite integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schemas and types
└── drizzle.config.ts      # Database configuration
```

## Migration Status
- ✅ Project structure configured for Replit and Netlify
- ✅ Dependencies installed and verified
- ✅ Figma assets migrated to `/client/public/figmaAssets/`
- ✅ Coming Soon page implemented with responsive design
- ✅ Development server running on port 4000
- ✅ TypeScript configuration optimized
- ✅ Netlify deployment configuration completed
- ✅ Serverless functions for email subscription
- ✅ Build process optimized for static site deployment
- ✅ Security best practices implemented

## Development Workflow
- **Start Development**: `npm run dev` (Express server for local development)
- **Build for Netlify**: `npx vite build --config vite.config.netlify.ts`
- **Build Production**: `npm run build` (Express + Vite build)
- **Preview Build**: `npm run preview` (test Netlify build locally)
- **Database Push**: `npm run db:push`
- **Type Check**: `npm run check`

## Deployment Options
- **Netlify**: Ready for deployment (see NETLIFY_DEPLOYMENT.md)
- **Local**: Express server for development and testing

## User Preferences
(To be updated based on user feedback and requests)

## Recent Changes
- **Netlify Configuration**: Complete setup for Netlify deployment with serverless functions
- **Build Process**: Optimized Vite configuration for static site generation
- **Email Integration**: Serverless function for email subscriptions using Gmail
- **Deployment Ready**: Project configured for both development and production environments
- **Security Implementation**: Environment variables for sensitive data (email credentials)
- **Asset Management**: Figma assets properly integrated into public directory
- **Responsive Design**: Coming Soon page optimized for mobile and desktop

## Architecture Notes
- **Development Mode**: Express server serves both frontend and API (port 4000)
- **Production Mode**: Static site with serverless functions on Netlify
- **Email Service**: Gmail integration via Netlify functions (requires environment variables)
- **Static Assets**: Figma images served from public directory