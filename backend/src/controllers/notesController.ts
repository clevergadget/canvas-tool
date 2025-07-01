import { Request, Response } from 'express';
import { notesService } from '../services/notesService';
import type {
  CreatePersonRequest,
  UpdatePersonNotesRequest,
  SearchPeopleRequest
} from '@canvas-tool/shared-types';

export class NotesController {
  async getAllNotes(req: Request, res: Response): Promise<void> {
    try {
      const notes = await notesService.getAllNotes();
      res.json({
        success: true,
        data: notes,
        count: notes.length
      });
    } catch (error) {
      console.error('Error in getAllNotes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch notes'
      });
    }
  }

  async createNote(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, notes, email }: CreatePersonRequest = req.body;
      const newNote = await notesService.createNote({ first_name, last_name, notes, email });
      res.status(201).json({
        success: true,
        data: newNote
      });
    } catch (error) {
      console.error('Error in createNote:', error);
      
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
          error: 'Failed to create note'
        });
      }
    }
  }

  async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { notes }: UpdatePersonNotesRequest = req.body;

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid note ID'
        });
        return;
      }

      const updatedNote = await notesService.updateNote(id, { notes });
      res.json({
        success: true,
        data: updatedNote
      });
    } catch (error) {
      console.error('Error in updateNote:', error);
      
      if (error instanceof Error && error.message === 'Note not found') {
        res.status(404).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to update note'
        });
      }
    }
  }

  async exportCsv(req: Request, res: Response): Promise<void> {
    try {
      const notes = await notesService.getAllNotes();
      
      // Generate CSV content
      const csvHeader = 'ID,First Name,Last Name,Email,Notes,Created At,Updated At\n';
      const csvRows = notes.map(note => {
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
          note.id,
          escapeCsvField(note.first_name),
          escapeCsvField(note.last_name),
          escapeCsvField(note.email),
          escapeCsvField(note.notes),
          new Date(note.created_at).toISOString(),
          new Date(note.updated_at).toISOString()
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

  async searchNotes(req: Request, res: Response): Promise<void> {
    try {
      const { query, page, limit } = req.query;
      
      const searchParams: SearchPeopleRequest = {
        query: query as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      };

      const result = await notesService.searchNotes(searchParams);
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error('Error in searchNotes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search notes'
      });
    }
  }
}

export const notesController = new NotesController();
