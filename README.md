# Canvas Tool

A minimal canvassing web app for Empower's take-home assignment.

## Tech Stack
- **Frontend:** Vite + React + TypeScript + Chakra UI + TanStack Query
- **Backend:** Node.js (Express, TypeScript)
- **Database:** AWS RDS MySQL (to be added)

## Project Structure
- `./frontend` — Vite React app (mobile-friendly, Chakra UI, minimal boilerplate)
- `./backend` — Node.js Express API (TypeScript, minimal, with health check)
- `./database` — SQL schema, migration scripts, and DB docs (to be added)

## What is in the first commit?
This initial commit includes:
- Clean project structure with separate `frontend` and `backend` directories
- `.nvmrc` for consistent Node.js version (v22.12.0)
- **Frontend:**
  - Vite + React + TypeScript app, stripped of all default boilerplate and graphics
  - Chakra UI and TanStack Query set up and ready for use
  - Minimal, readable welcome page (no extra UI or CSS)
- **Backend:**
  - TypeScript Express server with a `/health` endpoint returning `{ status: 'ok' }`
  - Standard scripts for development and build
- All code is intentionally minimal, clear, and reviewer-friendly, with no unnecessary extras

## Why this approach?
- To provide a clean, professional starting point for full-stack development
- To make the codebase as readable and approachable as possible for the reviewer
- To ensure all infrastructure is working before adding features

## Development Plan
See `COPILOT_CONTEXT.md` for a sequenced, AI-assisted plan and context.

## AI Assistance
This project is developed in partnership with GitHub Copilot (AI), as permitted by the assignment. All code is written for clarity, simplicity, and maintainability for future developers.

## Getting Started
Instructions for setup and running the app will be added as development progresses.

---

For any questions, please contact Phillip Dodson.
