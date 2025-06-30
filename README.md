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

### Database Commands (while running with Docker Compose)

Connect to MySQL shell:
```bash
docker exec -it voter-canvassing-tool-db-1 mysql -u canvasser -pcanvasserpass canvassing
```

Quick database queries:
```bash
# See all tables
docker exec -it voter-canvassing-tool-db-1 mysql -u canvasser -pcanvasserpass canvassing -e "SHOW TABLES;"

# View all canvassing notes
docker exec -it voter-canvassing-tool-db-1 mysql -u canvasser -pcanvasserpass canvassing -e "SELECT * FROM canvassing_notes ORDER BY created_at DESC;"

# Count total notes
docker exec -it voter-canvassing-tool-db-1 mysql -u canvasser -pcanvasserpass canvassing -e "SELECT COUNT(*) as total_notes FROM canvassing_notes;"
```

### Testing

Run backend tests:
```bash
cd backend
npm test
```

Tests use Jest and supertest to validate API endpoints without hitting the real database.

### API Endpoints
- `GET /api/notes` — Get all canvassing notes
- `POST /api/notes` — Create a new note (requires `person_name` and optional `notes`)
- `GET /health` — Health check (backend + database status)

## What is in the current version?
- Clean project structure with separate `frontend`, `backend`, and `database` directories
- `.nvmrc` for consistent Node.js version (v22.12.0)
- **Frontend:**
  - Vite + React + TypeScript app, stripped of all default boilerplate and graphics
  - Chakra UI with custom Empower Project brand theme (cyan and purple color palette)
  - TanStack Query for professional data fetching and state management
  - Complete canvassing note management UI: add notes form and view all notes page
  - Responsive, mobile-friendly design with centralized color theming
  - React Router DOM for client-side navigation
  - All colors managed through Chakra theme tokens (no hardcoded colors)
  - All colors managed through Chakra theme tokens (no hardcoded colors)
- **Backend:**
  - TypeScript Express server with a `/health` endpoint returning backend and DB status
  - MySQL connection (local via Docker Compose)
  - REST API endpoints for canvassing notes (`GET /api/notes`, `POST /api/notes`)
  - Professional service/controller architecture with TypeScript types
  - Comprehensive test suite using Jest and supertest (mocked DB calls)
  - Standard scripts for development and build
- **Database:**
  - MySQL schema/init script for local development
  - Canvassing notes table with proper indexing and constraints
- All code is intentionally minimal, clear, and reviewer-friendly, with professional UI/UX

## Why this approach?
- To provide a clean, professional starting point for full-stack development
- To make the codebase as readable and approachable as possible for the reviewer
- To ensure all infrastructure is working before adding features

## Development Plan
See `COPILOT_CONTEXT.md` for a sequenced, AI-assisted plan and context.

## AI Assistance
This project is developed in partnership with GitHub Copilot (AI), as permitted by the assignment. All code is written for clarity, simplicity, and maintainability for future developers.

---

For any questions, please contact Phillip Dodson.
