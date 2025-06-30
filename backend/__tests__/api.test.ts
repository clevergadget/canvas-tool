import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { notesController } from '../src/controllers/notesController';
import { notesService } from '../src/services/notesService';

// Mock the database service
jest.mock('../src/services/notesService');
const mockNotesService = notesService as jest.Mocked<typeof notesService>;

// Create a test app with just the routes we want to test
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Add the routes we want to test
  app.get('/api/notes', (req, res) => notesController.getAllNotes(req, res));
  app.post('/api/notes', (req, res) => notesController.createNote(req, res));
  app.put('/api/notes/:id', (req, res) => notesController.updateNote(req, res));
  
  return app;
};

describe('Notes API', () => {
  const app = createTestApp();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/notes', () => {
    it('should return empty list initially', async () => {
      // Mock the service to return empty array
      mockNotesService.getAllNotes.mockResolvedValueOnce([]);

      const response = await request(app)
        .get('/api/notes')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: [],
        count: 0
      });
    });
  });

  describe('POST /api/notes', () => {
    it('should create a note with valid data', async () => {
      const noteData = {
        person_name: 'Test Person',
        email: 'test@example.com',
        notes: 'Test notes'
      };

      const mockNote = {
        id: 1,
        person_name: 'Test Person',
        email: 'test@example.com',
        notes: 'Test notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      // Mock the service to return the created note
      mockNotesService.createNote.mockResolvedValueOnce(mockNote);

      const response = await request(app)
        .post('/api/notes')
        .send(noteData)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        data: mockNote
      });
    });

    it('should reject note without person_name', async () => {
      const response = await request(app)
        .post('/api/notes')
        .send({ email: 'test@example.com', notes: 'Test notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Person name is required'
      });
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update only the notes field', async () => {
      const originalNote = {
        id: 1,
        person_name: 'Original Person',
        email: 'original@example.com',
        notes: 'Original notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      const updateData = {
        notes: 'Updated notes only' // Only notes can be updated
      };

      const updatedNote = {
        ...originalNote,
        notes: 'Updated notes only',
        updated_at: '2023-01-01T01:00:00.000Z'
      };

      // Mock the service to return the updated note
      mockNotesService.updateNote.mockResolvedValueOnce(updatedNote);

      const response = await request(app)
        .put('/api/notes/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: updatedNote
      });

      // Verify that updateNote was called with the correct parameters
      expect(mockNotesService.updateNote).toHaveBeenCalledWith(1, updateData);
    });

    it('should ignore attempts to update person_name and email, only updating notes', async () => {
      const originalNote = {
        id: 1,
        person_name: 'Original Person',
        email: 'original@example.com',
        notes: 'Original notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      // Attempt to update all fields, but only notes should be processed
      const updateData = {
        person_name: 'Attempted New Name',
        email: 'attempted@newemail.com',
        notes: 'Actually updated notes'
      };

      const updatedNote = {
        ...originalNote,
        notes: 'Actually updated notes', // Only notes should change
        updated_at: '2023-01-01T01:00:00.000Z'
      };

      // Mock the service to return the updated note (service only processes notes)
      mockNotesService.updateNote.mockResolvedValueOnce(updatedNote);

      const response = await request(app)
        .put('/api/notes/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: updatedNote
      });

      // Verify that updateNote was called with only the notes field
      expect(mockNotesService.updateNote).toHaveBeenCalledWith(1, { notes: 'Actually updated notes' });
    });

    it('should reject update with invalid ID', async () => {
      const response = await request(app)
        .put('/api/notes/invalid')
        .send({ notes: 'Updated notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Invalid note ID'
      });
    });

    it('should reject update without notes field', async () => {
      const response = await request(app)
        .put('/api/notes/1')
        .send({}) // Empty body
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Notes field is required'
      });
    });
  });
});
