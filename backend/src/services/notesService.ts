import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../db';

export interface CanvassingNote {
  id: number;
  person_name: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  person_name: string;
  notes: string;
}

export class NotesService {
  async getAllNotes(): Promise<CanvassingNote[]> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, person_name, notes, created_at, updated_at FROM canvassing_notes ORDER BY created_at DESC'
      );
      return rows as CanvassingNote[];
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw new Error('Failed to fetch notes');
    }
  }

  async createNote(noteData: CreateNoteRequest): Promise<CanvassingNote> {
    try {
      const { person_name, notes } = noteData;
      
      // Validate input
      if (!person_name.trim()) {
        throw new Error('Person name is required');
      }

      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO canvassing_notes (person_name, notes) VALUES (?, ?)',
        [person_name.trim(), notes || '']
      );

      // Fetch the created note
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, person_name, notes, created_at, updated_at FROM canvassing_notes WHERE id = ?',
        [result.insertId]
      );

      return rows[0] as CanvassingNote;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }
}

export const notesService = new NotesService();
