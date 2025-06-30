// Common types used across the application

export interface CanvassingNote {
  id: number;
  person_name: string;
  email?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  person_name: string;
  email?: string;
  notes?: string;
}

export interface UpdateNoteRequest {
  notes: string;
}

export interface NotesResponse {
  success: boolean;
  data: CanvassingNote[];
  count: number;
}

export interface PaginatedNotesResponse {
  success: boolean;
  data: CanvassingNote[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
