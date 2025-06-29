# Copilot Context: Canvas Tool Project

## Project Overview
A minimal canvassing web app for Empower's take-home assignment. The app allows a canvasser to record a person's name and free-form notes, and view all canvassing notes. Built with Vite + React (frontend), Chakra UI (mobile-friendly UI), TanStack Query (data fetching), Node.js (Express, backend), and AWS RDS MySQL (database). Uses TypeScript primarily, with some JavaScript where expedient.

## Updated Sequenced Plan

### 1. Local Infrastructure & Project Scaffold (COMPLETED)
- Set up `.nvmrc` for Node.js version consistency
- Scaffold backend (`./backend`: Node.js + Express, TypeScript)
- Scaffold frontend (`./frontend`: Vite + React, TypeScript, Chakra UI, TanStack Query)
- Remove all default Vite/React boilerplate and graphics
- Implement a health check endpoint in backend that returns `{ status: 'ok' }`
- Confirm frontend and backend run independently and are ready for integration
- All code is minimal, clear, and reviewer-friendly

### 2. Deployment & Database Setup (NEXT)
- Set up AWS RDS MySQL instance
- Prepare Docker or other deployment scripts for backend and frontend
- Deploy backend and frontend containers, connect to RDS
- Confirm end-to-end connectivity in deployed environment

### 3. Backend & Database Expansion
- Design and create schema for canvassing notes
- Implement API endpoints for adding and retrieving notes

### 4. Frontend Feature Development
- Add page to submit new canvassing note (name, notes)
- Add page to view all notes
- Use TanStack Query for all data fetching
- Use Chakra UI for all UI components

### 5. Documentation and Cleanup
- Update README with setup, deployment, and usage instructions
- Ensure code is clean, simple, and well-commented
- Prioritize digestible, readable code for the reviewing developer: clear naming, concise functions, and helpful comments

## Workflow and Priorities
- Work in small, clear, incremental steps
- Make frequent, descriptive commits
- Prioritize clarity, simplicity, and code readability for reviewers
- Always use relative paths from the project root
- Pause often to check in and discuss next steps

---

This file is for both human and AI reference. Update as needed to reflect changes in plan or priorities.
