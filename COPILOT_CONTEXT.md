# Copilot Context: Canvas Tool Project

## Project Overview
A minimal canvassing web app for Empower's take-home assignment. The app allows a canvasser to record a person's name and free-form notes, and view all canvassing notes. Built with Vite + React (frontend), Chakra UI (mobile-friendly UI), TanStack Query (data fetching), Node.js (Express, backend), and MySQL (local via Docker Compose). Uses TypeScript primarily, with some JavaScript where expedient.

## Updated Sequenced Plan

### 1. Local Infrastructure & Project Scaffold (COMPLETED)
- Set up `.nvmrc` for Node.js version consistency
- Scaffold backend (`./backend`: Node.js + Express, TypeScript)
- Scaffold frontend (`./frontend`: Vite + React, TypeScript, Chakra UI, TanStack Query)
- Remove all default Vite/React boilerplate and graphics
- Implement a health check endpoint in backend that returns backend and DB status
- Confirm frontend and backend run independently and are ready for integration
- All code is minimal, clear, and reviewer-friendly

### 2. Local Development & Integration (COMPLETED)
- Add scripts and documentation for running frontend and backend together locally
- Ensure the frontend calls and displays the backend health check endpoint
- Make local development as easy and reliable as possible for any reviewer

### 3. Local Database Integration (COMPLETED)
- Add a MySQL service to `docker-compose.yml` for local development
- Provide an init script for schema setup
- Ensure backend can connect to local MySQL
- Document DB connection details for local development
- Frontend health check UI displays backend and DB status

### 4. Backend & Database Expansion (NEXT)
- Design and create schema for canvassing notes
- Implement API endpoints for adding and retrieving notes

### 5. Frontend Feature Development
- Add page to submit new canvassing note (name, notes)
- Add page to view all notes
- Use TanStack Query for all data fetching
- Use Chakra UI for all UI components

### 6. Documentation and Cleanup (ONGOING)
- Update README with setup and usage instructions
- Ensure code is clean, simple, and well-commented
- Prioritize digestible, readable code for the reviewing developer: clear naming, concise functions, and helpful comments
- Keep this file up to date with major project changes

## Workflow and Priorities
- 1. Easy to run locally
- Work in small, clear, incremental steps
- Make frequent, descriptive commits
- Prioritize clarity, simplicity, and code readability for reviewers
- Always use relative paths from the project root
- Pause often to check in and discuss next steps

---

This file is for both human and AI reference. Update as needed to reflect changes in plan or priorities.


Assignment 
Some implementation notes:
You should have one page that lets a canvasser write down a name and some free-form notes about a person they just talked to.
You should have another page that lets the canvasser view all of their canvassing notes.
It's okay if you don't have a user login / authentication system implemented.
It's okay if your pages are simple and/or ugly
Your backend should have some sort of a JSON API.
Please provide any documentation necessary to run your code and try it out.
Make a git repo with an initial commit when you start working, and include the repo in your submission
We understand that a lot of folks are experimenting with AI coding tools, particularly in interviews. If you want to, that's fine! Just say that you're using AI in your readme. Since a greenfield app like this is something AI should be good at, if you're using AI, we'll also expect you to get more of the "extra credit" done.
At Empower, we use React (with hooks) for the frontend, Node for the backend, MySQL for the database, and a mix of Javascript and Typescript. Using these technologies would be ideal, but if you need to use the technologies of your choice, that's okay too.