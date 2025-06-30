// Core domain types
export interface Person {
  id: number;
  person_name: string;
  email?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

// API Request types
export interface CreatePersonRequest {
  person_name: string;
  email?: string;
  notes?: string;
}

export interface UpdatePersonNotesRequest {
  notes: string;
}

export interface SearchPeopleRequest {
  query?: string;
  page?: number;
  limit?: number;
}

// Service layer response types (used internally by backend)
export interface PaginatedPeopleData {
  data: Person[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response types (used by controllers and frontend)
export interface BaseApiResponse {
  success: boolean;
}

export interface PeopleResponse extends BaseApiResponse {
  data: Person[];
  count: number;
}

export interface PaginatedPeopleResponse extends BaseApiResponse, PaginatedPeopleData {}

export interface SinglePersonResponse extends BaseApiResponse {
  data: Person;
}

export interface ErrorResponse extends BaseApiResponse {
  success: false;
  error: string;
}
