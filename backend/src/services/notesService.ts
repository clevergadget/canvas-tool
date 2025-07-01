import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../db';
import type {
  Person,
  CreatePersonRequest,
  UpdatePersonNotesRequest,
  SearchPeopleRequest,
  PaginatedPeopleData
} from '@canvas-tool/shared-types';

export class NotesService {
  async getAllNotes(): Promise<Person[]> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record ORDER BY created_at DESC'
      );
      return rows as Person[];
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw new Error('Failed to fetch notes');
    }
  }

  async createNote(noteData: CreatePersonRequest): Promise<Person> {
    try {
      const { first_name, last_name, email, notes } = noteData;
      
      // Validate input
      if (!first_name.trim()) {
        throw new Error('First name is required');
      }
      
      if (!last_name.trim()) {
        throw new Error('Last name is required');
      }

      // Basic email validation if provided
      if (email && email.trim() && !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO canvassing_record (first_name, last_name, email, notes) VALUES (?, ?, ?, ?)',
        [first_name.trim(), last_name.trim(), email?.trim() || null, notes || '']
      );

      // Fetch the created note
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record WHERE id = ?',
        [result.insertId]
      );

      return rows[0] as Person;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  async updateNote(id: number, noteData: UpdatePersonNotesRequest): Promise<Person> {
    try {
      const { notes } = noteData;
      
      // First, fetch the existing note to preserve original data
      const [existingRows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record WHERE id = ?',
        [id]
      );

      if (existingRows.length === 0) {
        throw new Error('Note not found');
      }

      const existingNote = existingRows[0] as Person;

      // Only update the notes field, preserve original first_name, last_name and email
      const [result] = await pool.execute<ResultSetHeader>(
        'UPDATE canvassing_record SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [notes || '', id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Note not found');
      }

      // Fetch the updated note
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record WHERE id = ?',
        [id]
      );

      return rows[0] as Person;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async searchNotes(
    searchParams: SearchPeopleRequest = {}
  ): Promise<PaginatedPeopleData> {
    try {
      const { query = '', page = 1, limit = 10 } = searchParams;
      const offset = (page - 1) * limit;

      const searchTerm = query.trim() ? `%${query.trim()}%` : '%';

      const whereClause = 'WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR notes LIKE ?';
      const countParams = [searchTerm, searchTerm, searchTerm, searchTerm];
      const dataParams = [searchTerm, searchTerm, searchTerm, searchTerm, String(limit), String(offset)];

      const countQuery = `SELECT COUNT(*) as total FROM canvassing_record ${whereClause}`;
      const [countRows] = await pool.execute<RowDataPacket[]>(countQuery, countParams);
      const total = countRows[0].total as number;

      const dataQuery = `
        SELECT id, first_name, last_name, email, notes, created_at, updated_at 
        FROM canvassing_record 
        ${whereClause}
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
      `;

      const [dataRows] = await pool.execute<RowDataPacket[]>(dataQuery, dataParams);

      const totalPages = Math.ceil(total / limit);

      return {
        data: dataRows as Person[],
        total,
        page,
        limit,
        totalPages
      };
    } catch (error) {
      console.error('Error searching notes:', error);
      throw new Error('Failed to search notes');
    }
  }
}

export const notesService = new NotesService();
