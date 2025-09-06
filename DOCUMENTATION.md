# Basic Auto Finance Quote

A full-stack application for calculating and managing auto loan quotes, built with Vue 3 + TypeScript frontend and Express + TypeScript backend.

## Features

- Calculate auto loan quotes with real-time updates
- Automatic synchronization between cost, profit, and selling price
- Save and manage multiple quotes
- View saved quotes and their details
- Delete unwanted quotes
- Persistent storage using SQLite

## Tech Stack

### Frontend
- Vue 3 with Composition API
- TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API calls

### Backend
- Express.js with TypeScript
- SQLite3 with Repository pattern
- Centralized error handling middleware
- Environment configuration with dotenv
- Standardized API response format
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd basic_finance_calculator
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up environment variables (optional):
```bash
# Copy example environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit the `.env` files to customize configuration (ports, database path, etc.)

### Running the Application

#### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3001 (configurable via PORT env var)
- Frontend on http://localhost:5173
- Database will be created automatically as `database.sqlite`

#### Running Separately

Backend only:
```bash
cd backend
npm run dev
```

Frontend only:
```bash
cd frontend
npm run dev
```

### Building for Production

```bash
npm run build
```

This will build both the backend and frontend for production.

## API Endpoints

All API responses follow a standardized format:
```json
{
  "success": true,
  "data": { /* response data */ },
  "meta": {
    "timestamp": "2025-01-01T12:00:00.000Z"
  }
}
```

### Quote Endpoints
- `POST /api/quotes/calculate` - Calculate a new quote
- `POST /api/quotes/save` - Save a calculated quote
- `GET /api/quotes` - Get all saved quotes
- `DELETE /api/quotes/:id` - Delete a quote

### Health Check
- `GET /health` - Application health and version info

## Project Structure

```
basic_finance_calculator/
├── backend/
│   ├── src/
│   │   ├── config/         # Environment configuration
│   │   ├── database/       # Database connection and repositories
│   │   │   └── repositories/
│   │   ├── middleware/     # Express middleware (auth, error handling)
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic (calculator)
│   │   ├── types/          # TypeScript type definitions and API types
│   │   ├── utils/          # Response helpers and utilities
│   │   └── index.ts        # Server entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── composables/    # Vue composition functions
│   │   ├── config/         # Environment configuration
│   │   ├── constants/      # Application constants
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript types and API types
│   │   └── App.vue         # Main app component
│   ├── .env.example        # Environment variables template
│   └── package.json
├── .gitignore              # Git ignore patterns
└── package.json            # Root package with scripts
```

## Additional Notes

### Finance Calculations
- Uses standard amortization formula for monthly payment calculations
- Automatically adjusts cost/profit/selling price to maintain consistency
- Includes taxes and fees in the total loan amount
- Supports trade-in values and down payments

### Data Persistence
- SQLite database with Repository pattern for clean data access
- Database file (`database.sqlite`) created automatically on first run
- Configurable database path via `DATABASE_PATH` environment variable
- All quotes persisted with full calculation details and metadata

### Design Decisions
- **Monorepo structure**: Frontend and backend together for easier development
- **Repository Pattern**: Clean separation between data access and business logic
- **Centralized Error Handling**: Consistent error responses with proper HTTP status codes
- **Environment Configuration**: All configuration externalized for different deployment environments
- **Type-Safe API Communication**: Standardized response format with TypeScript interfaces
- **SQLite**: Simple, portable database with no external dependencies
- **Tailwind CSS**: Utility-first CSS with semantic component classes using @apply
- **Component-based Architecture**: Clean separation of concerns in Vue frontend

## Environment Configuration

### Backend Environment Variables
```bash
# Server Configuration
PORT=3001                           # Server port
NODE_ENV=development               # Environment (development/production)
CORS_ORIGIN=http://localhost:5173  # Frontend URL for CORS

# Database Configuration
DATABASE_PATH=./database.sqlite    # Database file path

# Application Information
APP_NAME=Finance Calculator API    # Application name
APP_VERSION=1.0.0                 # Application version
```

### Frontend Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api  # Backend API URL

# Application Information
VITE_APP_NAME=Finance Calculator              # Application name
VITE_APP_VERSION=1.0.0                      # Application version
```

## Architecture Features

### Backend
- **Repository Pattern**: Clean data access layer with `QuoteRepository`
- **Response Helpers**: Standardized success/error response formatting
- **Error Middleware**: Centralized error handling with proper status codes
- **Type-Safe APIs**: Consistent `ApiResponse<T>` interface for all endpoints
- **Environment Config**: Typed configuration with sensible defaults

### Frontend
- **Type-Safe API Calls**: Frontend knows exact API response structure
- **Semantic CSS Classes**: Reusable components using Tailwind's @apply
- **Composition API**: Modern Vue 3 patterns with composables
- **Environment Integration**: Configurable API endpoints and app settings

### Development Experience
- **Full TypeScript**: End-to-end type safety from database to UI
- **Hot Reloading**: Both frontend and backend support live reload
- **Consistent Formatting**: Standardized responses and error handling
- **Environment Flexibility**: Easy configuration for different environments

### Production Ready Features
- **Professional Error Handling**: Consistent error responses with timestamps
- **CORS Configuration**: Proper cross-origin setup for production
- **Build Optimization**: Production builds for both frontend and backend
- **Database Portability**: SQLite file can be easily backed up/migrated