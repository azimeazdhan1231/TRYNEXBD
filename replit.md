# TryNex Lifestyle - E-commerce Web Application

## Overview

TryNex Lifestyle is a full-stack e-commerce web application built for selling personalized gifts and lifestyle products in Bangladesh. The application features a React frontend with Tailwind CSS, a Node.js/Express backend, and uses Drizzle ORM with PostgreSQL for data management. The system includes a hidden admin panel for content management and real-time order processing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom aliases and path resolution
- **Component System**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema**: Shared TypeScript schema definitions
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `./shared/schema.ts`
- **Migrations**: Stored in `./migrations` directory
- **Database Connection**: Environment variable `DATABASE_URL` required

## Key Components

### Database Schema
The application uses five main entities:
- **Products**: Catalog items with pricing, images, variants, and inventory
- **Orders**: Customer orders with tracking, payment status, and product details
- **Promo Codes**: Discount codes with percentage or fixed amount reductions
- **Site Content**: Dynamic content management for homepage and site settings
- **Admins**: Admin user management for panel access

### Authentication & Authorization
- **Admin Access**: Hidden trigger mechanism (click footer icons 5 times)
- **Password**: Fixed admin password "Amits@12345"
- **Session Management**: PostgreSQL-based sessions
- **Security**: JWT-like verification system for admin operations

### Product Management
- **Categories**: T-shirts, Mugs, Picture Frames, Water Tumblers
- **Features**: Featured products, variants (size/color/options), inventory tracking
- **Pricing**: Support for original price and discounted price display
- **Images**: Multiple image support via JSON array storage

### Order Processing
- **Payment Flow**: 100৳ advance payment requirement
- **Payment Methods**: bKash/Nagad/Upay (01747292277)
- **WhatsApp Integration**: Order confirmation via WhatsApp (01940689487)
- **Status Tracking**: Real-time order status updates
- **Order ID**: Unique order identifier generation

## Data Flow

1. **Product Browsing**: Frontend fetches products via REST API with filtering/search
2. **Order Creation**: Customer fills order form → payment modal → WhatsApp redirect
3. **Admin Management**: Hidden admin panel for CRUD operations on all entities
4. **Real-time Updates**: Simulated via polling mechanism (5-second intervals)
5. **Content Management**: Dynamic site content updates via admin panel

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm with drizzle-zod for schema validation
- **UI Components**: @radix-ui/* for accessible component primitives
- **Forms**: @hookform/resolvers with react-hook-form integration
- **Styling**: class-variance-authority for component variants

### Development Tools
- **TypeScript**: Full type safety across frontend/backend/shared
- **Vite**: Fast development server with HMR
- **ESBuild**: Production bundling for backend
- **Replit Integration**: Runtime error overlay and cartographer

## Deployment Strategy

### Frontend Deployment
- **Target Platform**: Netlify (as specified in requirements)
- **Build Command**: `vite build`
- **Output Directory**: `dist/public`
- **SPA Routing**: Requires `_redirects` file configuration

### Backend Deployment
- **Target Platform**: Render (as specified in requirements)
- **Build Command**: `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- **Start Command**: `NODE_ENV=production node dist/index.js`
- **Database**: Neon Database (serverless PostgreSQL)

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment specification
- Production deployment requires database provisioning

## Changelog
- July 08, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.