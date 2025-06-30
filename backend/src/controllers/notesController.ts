import { Request, Response } from 'express';
import { notesService, CreateNoteRequest } from '../services/notesService';

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
      const { person_name, notes, email }: CreateNoteRequest = req.body;

      // Basic validation
      if (!person_name) {
        res.status(400).json({
          success: false,
          error: 'Person name is required'
        });
        return;
      }

      const newNote = await notesService.createNote({ person_name, notes, email });
      res.status(201).json({
        success: true,
        data: newNote
      });
    } catch (error) {
      console.error('Error in createNote:', error);
      
      if (error instanceof Error && error.message === 'Person name is required') {
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
}

export const notesController = new NotesController();
