# Copilot Context: Canvas Tool Project

## Project Overview
A canvassing web app for Empower's take-home assignment. Allows canvassers to record names and notes, and view all canvassing notes. Built with React frontend, Node.js backend, and MySQL database.

## Database Credentials (Development)
- User: root
- Password: example  
- Database: canvassing
- Container: canvas-tool-db-1

## Current Development Status
Extra credit features implemented:
- ✅ Email field added to notes (schema, backend, frontend) - COMPLETED
- ✅ Edit notes functionality with security restrictions - COMPLETED
- ✅ Backend validation preventing unauthorized field modifications - COMPLETED
- ✅ Comprehensive test coverage for edit functionality - COMPLETED
- ✅ Frontend cleanup (removed redundant files) - COMPLETED
- ✅ CSV export functionality with proper escaping - COMPLETED
- ✅ Search functionality with pagination - COMPLETED

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
- Add person page (name + email + notes form)
- View people page with email display
- Edit person page (notes only, with security restrictions)
- TanStack Query for data fetching
- Chakra UI theming
- React Router navigation

### 6. Edit Functionality (COMPLETED)
- PUT endpoint for editing notes with field restrictions
- Backend security preventing modification of name/email fields
- Frontend edit form for notes only
- Comprehensive test coverage for edit security
- Proper validation and error handling

### 7. Code Cleanup (COMPLETED)
- Removed redundant frontend files (AddNote.tsx, ViewNotes.tsx)
- Consolidated to clean page structure (AddPerson, EditPerson, ViewPeople)
- Updated routing and imports

### 8. CSV Export Functionality (COMPLETED)
- GET endpoint `/api/notes/export/csv` for data export
- Proper CSV formatting with escaping for commas, quotes, newlines
- Frontend download button with automated file naming
- Comprehensive test coverage for CSV generation
- Manual testing confirmed working in UI

### 9. Documentation (COMPLETED)
- README with setup instructions
- Clear, readable code
- Project documentation

### 10. Search Functionality (COMPLETED)
- Backend endpoint with pagination support
- Search across name, email, and notes fields
- Frontend search input with debouncing
- Pagination controls for navigating results
- Responsive loading states and empty states
- Comprehensive test coverage
- Test data seeding script

## Current Status
Core requirements and multiple extra credit features completed:
- ✅ Email field with validation
- ✅ Edit notes functionality with security restrictions
- ✅ CSV export with proper formatting and UI integration
- ✅ Search functionality with pagination
- ✅ Comprehensive test coverage for all features
- ✅ Clean, maintainable code structure

**NEXT: Implementing user authentication and authorization**


Assignment 
Some implementation notes:
You should have one page that lets a canvasser write down a name and some free-form notes about a person they just talked to.
You should have another page that lets the canvasser view all of their canvassing notes.
It's okay if you don't have a user login / authentication system implemented.

Your backend should have some sort of a JSON API.
Please provide any documentation necessary to run your code and try it out.
Make a git repo with an initial commit when you start working, and include the repo in your submission
We understand that a lot of folks are experimenting with AI coding tools, particularly in interviews. If you want to, that's fine! Just say that you're using AI in your readme. Since a greenfield app like this is something AI should be good at, if you're using AI, we'll also expect you to get more of the "extra credit" done.
At Empower, we use React (with hooks) for the frontend, Node for the backend, MySQL for the database, and a mix of Javascript and Typescript. Using these technologies would be ideal, but if you need to use the technologies of your choice, that's okay too.

If you have extra time...
Some ideas for enhancements to make to your project if you finish early:
Implement users and authentication
Allow editing the canvassing notes
Add an email field, and add some validation on that email
Make it possible to search across canvassing notes
Make it possible to export the canvassing results as CSV
Make the pages look nice
Make the pages look nice on mobile
Actually deploy it on a server somewhere

