# Canvas Tool

A minimal canvassing web app for Empower's take-home assignment.

## Tech Stack
- **Frontend:** Vite + React + TypeScript + Chakra UI + TanStack Query
- **Backend:** Node.js (Express, TypeScript)
- **Database:** MySQL (local via Docker Compose)

## Project Structure
- `./frontend` — Vite React app (mobile-friendly, Chakra UI, minimal boilerplate)
- `./backend` — Node.js Express API (TypeScript, minimal, with health check)
- `./database` — SQL schema, migration scripts, and DB docs

## Running Locally

### Prerequisites
- Node.js v22+ (see `.nvmrc`)
- npm v10+
- Docker (for local MySQL and orchestration)

### Quick Start
From the project root, run:

```bash
npm install
npm run dev
```

This will start both the frontend (on port 5173) and backend (on port 3001) in parallel.

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

To run the full stack (frontend, backend, and MySQL database) with Docker Compose:

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- MySQL: localhost:3306 (see `database/docker-mysql-init.sql` for schema)

### Scripts
- `npm run dev` — Start both frontend and backend
- `npm run dev:frontend` — Start only the frontend
- `npm run dev:backend` — Start only the backend
- `npm test` — Run backend tests
- `npm run seed-db` — Seed the database with sample data

### Database Commands (while running with Docker Compose)

Connect to MySQL shell:
```bash
docker exec -it voter-canvassing-tool-db-1 mysql -u canvasser -pcanvasserpass canvassing
```

Seed the database with sample data:
```bash
docker exec -it voter-canvassing-tool-db-1 sh -c "mysql -u canvasser -pcanvasserpass canvassing < /docker-entrypoint-initdb.d/seed.sql"
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
- `POST /api/notes` — Create a new note (requires `person_name` and optional `notes`)
- `PUT /api/notes/:id` — Update a note (only `notes` field can be modified)
- `GET /api/notes/export/csv` — Export all notes as CSV file
- `GET /api/notes/search` — Search notes with pagination (supports query, page, limit parameters)
- `GET /health` — Health check (backend + database status)

## What is in the current version?
- Clean project structure with separate `frontend`, `backend`, and `database` directories
- `.nvmrc` for consistent Node.js version (v22.12.0)
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
