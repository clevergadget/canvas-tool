import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../db';
import type {
  Person,
  CreatePersonRequest,
  UpdatePersonNotesRequest,
  SearchPeopleRequest,
  PaginatedPeopleData
} from '@canvas-tool/shared-types';

export class PeopleService {
  async getAllPeople(): Promise<Person[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record ORDER BY created_at DESC'
    );
    return rows as Person[];
  }

  async createPerson(personData: CreatePersonRequest): Promise<Person> {
    const { first_name, last_name, email, notes } = personData;
    
    // Validate required fields
    if (!first_name?.trim()) {
      throw new Error('First name is required');
    }
    
    if (!last_name?.trim()) {
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

    // Fetch the created person
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record WHERE id = ?',
      [result.insertId]
    );

    return rows[0] as Person;
  }

  async updatePerson(id: number, personData: UpdatePersonNotesRequest): Promise<Person> {
    const { notes } = personData;
    
    // Check if person exists
    const [existingRows] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM canvassing_record WHERE id = ?',
      [id]
    );

    if (existingRows.length === 0) {
      throw new Error('Person not found');
    }

    // Update the notes field
    await pool.execute<ResultSetHeader>(
      'UPDATE canvassing_record SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [notes || '', id]
    );

    // Fetch the updated person
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, first_name, last_name, email, notes, created_at, updated_at FROM canvassing_record WHERE id = ?',
      [id]
    );

    return rows[0] as Person;
  }

  async searchPeople(
    searchParams: SearchPeopleRequest = {}
  ): Promise<PaginatedPeopleData> {
    const { query = '', page = 1, limit = 10 } = searchParams;
    
    // Basic bounds checking
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const offset = (validPage - 1) * validLimit;

    const searchTerm = query.trim() ? `%${query.trim()}%` : '%';

    const whereClause = 'WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR notes LIKE ?';
    const countParams = [searchTerm, searchTerm, searchTerm, searchTerm];
    const dataParams = [searchTerm, searchTerm, searchTerm, searchTerm, String(validLimit), String(offset)];

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

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: dataRows as Person[],
      total,
      page: validPage,
      limit: validLimit,
      totalPages
    };
  }
}

export const peopleService = new PeopleService();
