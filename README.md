# Canvas Tool

A minimal canvassing web app for Empower's take-home assignment.

## Tech Stack
- **Frontend:** Vite + React + TypeScript + Chakra UI + TanStack Query
- **Backend:** Node.js (Express, TypeScript)
- **Database:** MySQL (local via Docker Compose)

## Project Structure
- `./frontend` — Vite React app (mobile-friendly, Chakra UI, minimal boilerplate)
- `./backend` — Node.js Express API (TypeScript, minimal, with health check)
- `./database` — SQL schema, migration script

## Running Locally

### Prerequisites
- Node.js v22.12.0 or higher
- npm v10+
- **Docker Desktop running** (required for MySQL database and full-stack orchestration)

### Recommended Quick Start (Full Stack)
**This is the primary way to run the application for evaluation:**

```bash
npm run setup
```

This single command will:
1. Install all dependencies
2. Build and start all Docker containers (frontend, backend, database)
3. Wait for the database to be ready
4. Seed the database with sample data
5. Display success message with access URLs

**Application will be available at:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **Database:** localhost:3306

When you're done, clean up everything with:

```bash
npm run cleanup
```

This stops and removes all Docker containers created for this project.

### Alternative Development Mode (Frontend/Backend Only)
If you want to run just the frontend and backend without Docker:

```bash
npm install
npm run dev
```

This starts both the frontend (port 5173) and backend (port 3001) in parallel, but requires a separate MySQL instance.

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- MySQL: localhost:3306 (see `database/docker-mysql-init.sql` for schema)

### Scripts
- **`npm run setup`** — **Primary command:** One-command setup that installs dependencies, starts all containers, and seeds the database
- **`npm run cleanup`** — **Primary cleanup:** Stop and remove all Docker containers
- `npm run dev` — Start both frontend and backend (development mode, requires separate MySQL)
- `npm run dev:frontend` — Start only the frontend
- `npm run dev:backend` — Start only the backend
- `npm test` — Run backend tests
- `npm run seed-db` — Seed the database with sample data (when containers are running)

### Database Commands (while running with Docker Compose)

Connect to MySQL shell:
```bash
docker exec -it canvas-tool-db-1 mysql -u canvasser -pcanvasserpass canvassing
```

ReSeed the database with sample data (if for some reason you want many more records?):
```bash
docker exec -it canvas-tool-db-1 sh -c "mysql -u canvasser -pcanvasserpass canvassing < /docker-entrypoint-initdb.d/seed.sql"
```

### Testing

Run backend tests:
```bash
cd backend
npm test
```

Tests use Jest and supertest to validate API endpoints.

### API Endpoints
- `GET /api/notes` — Get all canvassing notes
- `POST /api/notes` — Create a new note (requires `first_name`, `last_name`, optional `email` and `notes`)
- `PUT /api/notes/:id` — Update a note (only `notes` field can be modified)
- `GET /api/notes/export/csv` — Export all notes as CSV file
- `GET /api/notes/search` — Search notes with pagination (supports query, page, limit parameters)
- `GET /health` — Health check (backend + database status)

## What is in the current version?
- Clean project structure with separate `frontend`, `backend`, and `database` directories
- **Frontend:**
  - Vite + React + TypeScript app
  - Chakra UI with custom theme
  - TanStack Query for data fetching
  - Canvassing note management: add notes form and view all notes page
  - React Router DOM for navigation
  - Responsive design
  - Search functionality with pagination
  - CSV export feature
  - Email field with validation
  - Edit functionality (notes only, with security restrictions)
- **Backend:**
  - Express server with health check endpoint
  - MySQL connection via Docker Compose
  - REST API endpoints for canvassing notes (GET, POST, PUT, Search, Export CSV)
  - TypeScript throughout
  - Test suite using Jest
  - Field-level security for updates (preventing modification of person name and email)
- **Database:**
  - MySQL schema and init script
  - Canvassing notes table
  - Sample seed data for testing search functionality
- Clean, readable code focused on the core requirements

## AI Assistance
This project is developed with GitHub Copilot assistance, as permitted by the assignment.
