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
  app.get('/api/notes/export/csv', (req, res) => notesController.exportCsv(req, res));
  app.get('/api/notes/search', (req, res) => notesController.searchNotes(req, res));
  
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
        first_name: 'Test',
        last_name: 'Person',
        email: 'test@example.com',
        notes: 'Test notes'
      };

      const mockNote = {
        id: 1,
        first_name: 'Test',
        last_name: 'Person',
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

    it('should reject note without first_name', async () => {
      // Mock the service to throw an error
      mockNotesService.createNote.mockRejectedValueOnce(new Error('First name is required'));

      const response = await request(app)
        .post('/api/notes')
        .send({ last_name: 'Person', email: 'test@example.com', notes: 'Test notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'First name is required'
      });
    });

    it('should reject note without last_name', async () => {
      // Mock the service to throw an error
      mockNotesService.createNote.mockRejectedValueOnce(new Error('Last name is required'));

      const response = await request(app)
        .post('/api/notes')
        .send({ first_name: 'Test', email: 'test@example.com', notes: 'Test notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Last name is required'
      });
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update only the notes field', async () => {
      const originalNote = {
        id: 1,
        first_name: 'Original',
        last_name: 'Person',
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

    it('should only update notes field, ignoring other fields', async () => {
      const originalNote = {
        id: 1,
        first_name: 'Original',
        last_name: 'Person',
        email: 'original@example.com',
        notes: 'Original notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      const updatedNote = {
        ...originalNote,
        notes: 'Actually updated notes',
        updated_at: '2023-01-01T01:00:00.000Z'
      };

      mockNotesService.updateNote.mockResolvedValueOnce(updatedNote);

      const response = await request(app)
        .put('/api/notes/1')
        .send({
          first_name: 'Attempted New First',
          last_name: 'Attempted New Last',
          email: 'attempted@newemail.com',
          notes: 'Actually updated notes'
        })
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

    it('should allow update with notes field', async () => {
      const originalNote = {
        id: 1,
        first_name: 'Original',
        last_name: 'Person',
        email: 'original@example.com',
        notes: 'Original notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      const updateData = {
        notes: 'Updated notes'
      };

      const updatedNote = {
        ...originalNote,
        notes: 'Updated notes',
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
    });
  });

  describe('GET /api/notes/export/csv', () => {
    it('should export CSV with correct headers and data', async () => {
      const mockNotes = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          notes: 'Great conversation about policy',
          created_at: '2023-01-01T00:00:00.000Z',
          updated_at: '2023-01-01T00:00:00.000Z'
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: undefined,
          notes: 'Interested in volunteering, has "special" needs',
          created_at: '2023-01-02T00:00:00.000Z',
          updated_at: '2023-01-02T00:00:00.000Z'
        }
      ];

      mockNotesService.getAllNotes.mockResolvedValueOnce(mockNotes);

      const response = await request(app)
        .get('/api/notes/export/csv')
        .expect(200);

      expect(response.headers['content-type']).toBe('text/csv; charset=utf-8');
      expect(response.headers['content-disposition']).toMatch(/attachment; filename="canvassing-data-\d{4}-\d{2}-\d{2}\.csv"/);
      
      const csvContent = response.text;
      const lines = csvContent.split('\n');
      
      // Check header
      expect(lines[0]).toBe('ID,First Name,Last Name,Email,Notes,Created At,Updated At');
      
      // Check first data row
      expect(lines[1]).toBe('1,John,Doe,john@example.com,Great conversation about policy,2023-01-01T00:00:00.000Z,2023-01-01T00:00:00.000Z');
      
      // Check second data row (with escaped quotes and empty email)
      expect(lines[2]).toBe('2,Jane,Smith,,"Interested in volunteering, has ""special"" needs",2023-01-02T00:00:00.000Z,2023-01-02T00:00:00.000Z');
    });

    it('should handle empty data', async () => {
      mockNotesService.getAllNotes.mockResolvedValueOnce([]);

      const response = await request(app)
        .get('/api/notes/export/csv')
        .expect(200);

      const csvContent = response.text;
      expect(csvContent).toBe('ID,First Name,Last Name,Email,Notes,Created At,Updated At\n');
    });
  });

  describe('GET /api/notes/search', () => {
    it('should return paginated search results', async () => {
      const mockSearchResults = {
        data: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            notes: 'Discussed policy details',
            created_at: '2023-01-01T00:00:00.000Z',
            updated_at: '2023-01-01T00:00:00.000Z'
          }
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
      };

      mockNotesService.searchNotes.mockResolvedValueOnce(mockSearchResults);

      const response = await request(app)
        .get('/api/notes/search')
        .query({ query: 'policy', page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        ...mockSearchResults
      });
    });

    it('should handle search with invalid pagination gracefully', async () => {
      const mockSearchResults = {
        data: [],
        total: 0,
        page: 1,    // Service corrects invalid page 0 to 1
        limit: 100, // Service corrects invalid limit 200 to 100
        totalPages: 0
      };

      mockNotesService.searchNotes.mockResolvedValueOnce(mockSearchResults);

      const response = await request(app)
        .get('/api/notes/search')
        .query({ page: 0, limit: 200 })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        ...mockSearchResults
      });
    });
  });
});
