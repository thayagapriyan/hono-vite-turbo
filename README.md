# hono-vite-turbo

A modern monorepo setup featuring Hono backend API with TypeScript, Vite, Node.js, and Turbo for efficient development.

## Features

- ✅ **TypeScript** - Full type safety across the project
- ✅ **Vite** - Fast development and build tooling
- ✅ **Node.js** - Runtime environment using @hono/node-server
- ✅ **Turbo** - Monorepo management with efficient caching
- ✅ **Hono** - Lightweight and fast web framework
- ✅ **Multiple API Endpoints** - At least two API calls implemented (Users & Posts)

## Project Structure

```
hono-vite-turbo/
├── packages/
│   ├── backend/          # Hono API server
│   │   ├── src/
│   │   │   └── index.ts  # API routes and logic
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── frontend/         # Client application
│       ├── src/
│       │   └── main.ts   # API client calls
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json          # Root package with turbo
├── pnpm-workspace.yaml
└── turbo.json
```

## Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Development Mode

Run all packages in development mode:

```bash
pnpm dev
```

This will start:
- Backend API server on http://localhost:3000
- Frontend dev server on http://localhost:5173

### 3. Build for Production

```bash
pnpm build
```

### 4. Run Production Backend

```bash
cd packages/backend
pnpm start
```

## API Endpoints

The backend provides the following REST API endpoints:

### Users API (API Call 1)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:userId/posts` - Get posts by user ID

### Posts API (API Call 2)
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID

### Other Endpoints
- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint

## Example API Usage

### Fetch Users
```bash
curl http://localhost:3000/api/users
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "count": 3
}
```

### Fetch Posts
```bash
curl http://localhost:3000/api/posts
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "title": "First Post",
      "content": "This is my first post!"
    }
  ],
  "count": 4
}
```

## Frontend

The frontend application demonstrates making API calls to the backend:

1. Visit http://localhost:5173
2. Click "Fetch Users" to call the `/api/users` endpoint
3. Click "Fetch Posts" to call the `/api/posts` endpoint
4. Click "Fetch Both" to call both endpoints simultaneously

## Technologies Used

- **Hono** - Ultra-fast web framework for the edge
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **Node.js** - JavaScript runtime
- **Turbo** - High-performance build system
- **@hono/node-server** - Node.js adapter for Hono

## Scripts

### Root Level
- `pnpm dev` - Run all packages in development mode
- `pnpm build` - Build all packages
- `pnpm clean` - Clean build artifacts

### Backend Package
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Run production build
- `pnpm clean` - Clean build artifacts

### Frontend Package
- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm clean` - Clean build artifacts

## License

MIT