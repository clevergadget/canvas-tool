# Copilot Context: Canvas Tool Project

## Project Overview
A canvassing web app for Empower's take-home assignment. Allows canvassers to record names and notes, and view all canvassing notes. Built with React frontend, Node.js backend, and MySQL database.

## Development Plan

### 1. Infrastructure & Scaffold (COMPLETED)
- Set up Node.js project structure
- Backend: Express + TypeScript
- Frontend: Vite + React + TypeScript + Chakra UI + TanStack Query
- Health check endpoint
- Remove default boilerplate

### 2. Local Development Setup (COMPLETED)
- Scripts for running frontend and backend together
- Documentation for local development
- Health check UI showing backend and DB status

### 3. Database Integration (COMPLETED)
- MySQL service in Docker Compose
- Schema and init scripts
- Backend database connection

### 4. API Development (COMPLETED)
- Canvassing notes schema
- REST endpoints for notes (GET, POST)
- Backend testing with Jest

### 5. Frontend Features (COMPLETED)
- Add note page (name + notes form)
- View notes page
- TanStack Query for data fetching
- Chakra UI theming
- React Router navigation

### 6. Documentation (COMPLETED)
- README with setup instructions
- Clear, readable code
- Project documentation

## Current Status
All core requirements met. App is functional and ready for review.


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