import { Request, Response } from 'express';
import { peopleService } from '../services/peopleService';
import type {
  CreatePersonRequest,
  UpdatePersonNotesRequest,
  SearchPeopleRequest
} from '@canvas-tool/shared-types';

export class PeopleController {
  async getAllPeople(req: Request, res: Response): Promise<void> {
    try {
      const people = await peopleService.getAllPeople();
      res.json({
        success: true,
        data: people,
        count: people.length
      });
    } catch (error) {
      console.error('Error in getAllPeople:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch people'
      });
    }
  }

  async createPerson(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, notes, email }: CreatePersonRequest = req.body;
      const newPerson = await peopleService.createPerson({ first_name, last_name, notes, email });
      res.status(201).json({
        success: true,
        data: newPerson
      });
    } catch (error) {
      console.error('Error in createPerson:', error);
      
      if (error instanceof Error && error.message.includes('required')) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      } else if (error instanceof Error && error.message.includes('valid email')) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to create person'
        });
      }
    }
  }

  async updatePerson(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { notes }: UpdatePersonNotesRequest = req.body;

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid person ID'
        });
        return;
      }

      const updatedPerson = await peopleService.updatePerson(id, { notes });
      res.json({
        success: true,
        data: updatedPerson
      });
    } catch (error) {
      console.error('Error in updatePerson:', error);
      
      if (error instanceof Error && error.message === 'Person not found') {
        res.status(404).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to update person'
        });
      }
    }
  }

  async exportCsv(req: Request, res: Response): Promise<void> {
    try {
      const people = await peopleService.getAllPeople();
      
      // Generate CSV content
      const csvHeader = 'ID,First Name,Last Name,Email,Notes,Created At,Updated At\n';
      const csvRows = people.map(person => {
        // Escape commas and quotes in the data
        const escapeCsvField = (field: string | null | undefined): string => {
          if (!field) return '';
          const stringField = String(field);
          if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
            return `"${stringField.replace(/"/g, '""')}"`;
          }
          return stringField;
        };

        return [
          person.id,
          escapeCsvField(person.first_name),
          escapeCsvField(person.last_name),
          escapeCsvField(person.email),
          escapeCsvField(person.notes),
          new Date(person.created_at).toISOString(),
          new Date(person.updated_at).toISOString()
        ].join(',');
      }).join('\n');

      const csvContent = csvHeader + csvRows;

      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="canvassing-data-${new Date().toISOString().split('T')[0]}.csv"`);
      
      res.send(csvContent);
    } catch (error) {
      console.error('Error in exportCsv:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export CSV'
      });
    }
  }

  async searchPeople(req: Request, res: Response): Promise<void> {
    try {
      const { query, page, limit } = req.query;
      
      const searchParams: SearchPeopleRequest = {
        query: query as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      };

      const result = await peopleService.searchPeople(searchParams);
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error('Error in searchPeople:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search people'
      });
    }
  }
}

export const peopleController = new PeopleController();
