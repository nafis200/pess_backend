# How to Run This Project

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- Stripe account (for payment features)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 3. Docker Setup For Database
Start the PostgreSQL database using Docker:
```bash
docker-compose up -d
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Create database migrations
npm run db:migrate

# Push schema to database (alternative to migrate)
npm run db:push
```

### 5. Running the Application

#### Development Mode (with hot reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

#### Using Docker (Recommended for development)
```bash
# Start database and application
docker-compose up

# Start only database (then run npm run dev separately)
docker-compose up -d postgres
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run stripe:webhook` - Listen for Stripe webhooks

## Database Management

- Use `npm run db:studio` to access the database GUI
- Run migrations with `npm run db:migrate` when schema changes are made
- Use `npm run db:push` for quick schema updates during development

## Features

- User authentication and authorization
- PostgreSQL database with Prisma ORM
- Stripe payment integration
- Image upload functionality
- Session management
- RESTful API endpoints