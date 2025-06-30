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
        notes: 'Test notes'
      };

      const mockNote = {
        id: 1,
        person_name: 'Test Person',
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
        .send({ notes: 'Test notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Person name is required'
      });
    });
  });
});
