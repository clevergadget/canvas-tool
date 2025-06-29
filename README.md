# Canvas Tool

A minimal canvassing web app for Empower's take-home assignment.

## Tech Stack
- **Frontend:** Vite + React + TypeScript + Chakra UI + TanStack Query
- **Backend:** Node.js (Express, TypeScript)
- **Database:** MySQL (local via Docker Compose; AWS RDS planned)

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

## Deployment

Deployment to AWS is not currently configured. Previous AWS Copilot/ECS setup has been removed for clarity and simplicity. To deploy, you may use Docker images and your preferred cloud/container platform. (See `COPILOT_CONTEXT.md` for deployment planning and rationale.)

## What is in the current version?
- Clean project structure with separate `frontend`, `backend`, and `database` directories
- `.nvmrc` for consistent Node.js version (v22.12.0)
- **Frontend:**
  - Vite + React + TypeScript app, stripped of all default boilerplate and graphics
  - Chakra UI and TanStack Query set up and ready for use
  - Minimal, readable health check UI (shows backend and DB status)
- **Backend:**
  - TypeScript Express server with a `/health` endpoint returning backend and DB status
  - MySQL connection (local via Docker Compose)
  - Standard scripts for development and build
- **Database:**
  - MySQL schema/init script for local development
- All code is intentionally minimal, clear, and reviewer-friendly, with no unnecessary extras

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
