# Copilot Context: Canvas Tool Project

## Project Overview
A canvassing web app for Empower's take-home assignment. Allows canvassers to record names and notes, and view all canvassing records. Built with React frontend, Node.js backend, and MySQL database.

## Database Credentials (Development)
- User: root
- Password: example  
- Database: canvassing
- Container: canvas-tool-db-1

## Features Implemented
- Email field with validation
- Edit notes functionality with security restrictions
- CSV export with proper formatting
- Search functionality with pagination
- Test coverage for core functionality

## Development History

### Infrastructure & Setup
- Node.js project structure with Express + TypeScript backend
- Vite + React + TypeScript + Chakra UI + TanStack Query frontend
- Docker Compose with MySQL database
- Local development scripts and health check endpoints

### Core Features
- REST API for canvassing records (GET, POST, PUT)
- Database schema with name, email, and notes fields
- Frontend pages: Add Person, View People, Edit Person
- Backend security preventing unauthorized field modifications
- Jest testing setup with comprehensive test coverage

### Additional Features
- CSV export endpoint with proper formatting and escaping
- Search functionality across all fields with pagination
- Email field validation and display
- Edit functionality restricted to notes field only
- Responsive UI with loading states and error handling
