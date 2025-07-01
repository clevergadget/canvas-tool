import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { peopleController } from '../src/controllers/peopleController';
import { peopleService } from '../src/services/peopleService';

// Mock the database service
jest.mock('../src/services/peopleService');
const mockPeopleService = peopleService as jest.Mocked<typeof peopleService>;

// Create a test app with just the routes we want to test
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Add the routes we want to test
  app.get('/api/people', (req, res) => peopleController.getAllPeople(req, res));
  app.post('/api/people', (req, res) => peopleController.createPerson(req, res));
  app.put('/api/people/:id', (req, res) => peopleController.updatePerson(req, res));
  app.get('/api/people/export/csv', (req, res) => peopleController.exportCsv(req, res));
  app.get('/api/people/search', (req, res) => peopleController.searchPeople(req, res));
  
  return app;
};

describe('People API', () => {
  const app = createTestApp();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/people', () => {
    it('should return empty list initially', async () => {
      // Mock the service to return empty array
      mockPeopleService.getAllPeople.mockResolvedValueOnce([]);

      const response = await request(app)
        .get('/api/people')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: [],
        count: 0
      });
    });
  });

  describe('POST /api/people', () => {
    it('should create a person with valid data', async () => {
      const personData = {
        first_name: 'Test',
        last_name: 'Person',
        email: 'test@example.com',
        notes: 'Test notes'
      };

      const mockPerson = {
        id: 1,
        first_name: 'Test',
        last_name: 'Person',
        email: 'test@example.com',
        notes: 'Test notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      // Mock the service to return the created person
      mockPeopleService.createPerson.mockResolvedValueOnce(mockPerson);

      const response = await request(app)
        .post('/api/people')
        .send(personData)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        data: mockPerson
      });
    });

    it('should reject person without first_name', async () => {
      // Mock the service to throw an error
      mockPeopleService.createPerson.mockRejectedValueOnce(new Error('First name is required'));

      const response = await request(app)
        .post('/api/people')
        .send({ last_name: 'Person', email: 'test@example.com', notes: 'Test notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'First name is required'
      });
    });

    it('should reject person without last_name', async () => {
      // Mock the service to throw an error
      mockPeopleService.createPerson.mockRejectedValueOnce(new Error('Last name is required'));

      const response = await request(app)
        .post('/api/people')
        .send({ first_name: 'Test', email: 'test@example.com', notes: 'Test notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Last name is required'
      });
    });
  });

  describe('PUT /api/people/:id', () => {
    it('should update only the notes field', async () => {
      const originalPerson = {
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

      const updatedPerson = {
        ...originalPerson,
        notes: 'Updated notes only',
        updated_at: '2023-01-01T01:00:00.000Z'
      };

      // Mock the service to return the updated person
      mockPeopleService.updatePerson.mockResolvedValueOnce(updatedPerson);

      const response = await request(app)
        .put('/api/people/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: updatedPerson
      });

      // Verify that updatePerson was called with the correct parameters
      expect(mockPeopleService.updatePerson).toHaveBeenCalledWith(1, updateData);
    });

    it('should only update notes field, ignoring other fields', async () => {
      const originalPerson = {
        id: 1,
        first_name: 'Original',
        last_name: 'Person',
        email: 'original@example.com',
        notes: 'Original notes',
        created_at: '2023-01-01T00:00:00.000Z',
        updated_at: '2023-01-01T00:00:00.000Z'
      };

      const updatedPerson = {
        ...originalPerson,
        notes: 'Actually updated notes',
        updated_at: '2023-01-01T01:00:00.000Z'
      };

      mockPeopleService.updatePerson.mockResolvedValueOnce(updatedPerson);

      const response = await request(app)
        .put('/api/people/1')
        .send({
          first_name: 'Attempted New First',
          last_name: 'Attempted New Last',
          email: 'attempted@newemail.com',
          notes: 'Actually updated notes'
        })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: updatedPerson
      });

      // Verify that updatePerson was called with only the notes field
      expect(mockPeopleService.updatePerson).toHaveBeenCalledWith(1, { notes: 'Actually updated notes' });
    });

    it('should reject update with invalid ID', async () => {
      const response = await request(app)
        .put('/api/people/invalid')
        .send({ notes: 'Updated notes' })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Invalid person ID'
      });
    });

    it('should allow update with notes field', async () => {
      const originalPerson = {
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

      const updatedPerson = {
        ...originalPerson,
        notes: 'Updated notes',
        updated_at: '2023-01-01T01:00:00.000Z'
      };

      // Mock the service to return the updated person
      mockPeopleService.updatePerson.mockResolvedValueOnce(updatedPerson);

      const response = await request(app)
        .put('/api/people/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: updatedPerson
      });
    });
  });

  describe('GET /api/people/export/csv', () => {
    it('should export CSV with correct headers and data', async () => {
      const mockPeople = [
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

      mockPeopleService.getAllPeople.mockResolvedValueOnce(mockPeople);

      const response = await request(app)
        .get('/api/people/export/csv')
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
      mockPeopleService.getAllPeople.mockResolvedValueOnce([]);

      const response = await request(app)
        .get('/api/people/export/csv')
        .expect(200);

      const csvContent = response.text;
      expect(csvContent).toBe('ID,First Name,Last Name,Email,Notes,Created At,Updated At\n');
    });
  });

  describe('GET /api/people/search', () => {
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

      mockPeopleService.searchPeople.mockResolvedValueOnce(mockSearchResults);

      const response = await request(app)
        .get('/api/people/search')
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

      mockPeopleService.searchPeople.mockResolvedValueOnce(mockSearchResults);

      const response = await request(app)
        .get('/api/people/search')
        .query({ page: 0, limit: 200 })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        ...mockSearchResults
      });
    });
  });
});
