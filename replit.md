# Overview

This project appears to be for the "Lacanoamericana Mar del Plata 2024" - a psychoanalysis conference taking place in Mar del Plata from September 25-28, 2024. The repository contains both a static HTML website and a React/TypeScript web application with PayPal payment integration for registration and conference management.

The application provides functionality for event information display, registration forms, payment processing, and attendee management. The project structure suggests a dual approach with both a traditional HTML site and a modern React application.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## PayPal Integration Completed (August 2025)
- Successfully implemented client-side PayPal Smart Payment Buttons
- Resolved currency compatibility issues (ARS → USD conversion)
- Removed backend dependencies for GitHub Pages compatibility
- Created deployment guide for static hosting

## Project Status
- Production-ready conference website with PayPal payments
- Compatible with GitHub Pages and static hosting
- No server infrastructure required

# System Architecture

## Frontend Architecture
- **Static HTML Site**: Traditional multi-page website with HTML, CSS, and vanilla JavaScript for public-facing conference information
- **React SPA**: Modern TypeScript React application using Vite as the build tool
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS for utility-first styling with CSS custom properties for theming
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Build System**: ESBuild for server bundling, Vite for client bundling

## Database Design
- **ORM**: Drizzle ORM providing type-safe database queries
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migration Strategy**: File-based migrations managed by Drizzle Kit
- **Connection**: Neon Database serverless PostgreSQL connection

## Payment Integration
- **Payment Processor**: PayPal Server SDK integration
- **Architecture**: Dedicated PayPal service layer with order creation and capture endpoints
- **Security**: Environment-based configuration for sandbox/production modes
- **Implementation**: Critical PayPal code marked as immutable to prevent integration failures

## Development Architecture
- **Monorepo Structure**: Client, server, and shared code in organized directories
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Hot Reload**: Vite HMR for development with runtime error overlay
- **Path Mapping**: Centralized import aliases for clean module resolution

# External Dependencies

## Core Infrastructure
- **Database**: Neon Database (serverless PostgreSQL)
- **Payment Processing**: PayPal (sandbox and production environments)
- **Development**: Replit platform integration with custom plugins

## Frontend Libraries
- **UI Framework**: React 18 with TypeScript
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod schema validation
- **Data Fetching**: TanStack Query for server state management
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

## Backend Dependencies
- **Web Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL driver
- **Payment**: PayPal Server SDK for payment processing
- **Session**: PostgreSQL session store for user sessions
- **Development**: tsx for TypeScript execution in development

## Build and Development Tools
- **Build Tool**: Vite for frontend, ESBuild for backend
- **TypeScript**: Full type checking across the application
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Development Server**: Integrated Vite dev server with Express API