import type { CreatePersonRequest, UpdatePersonNotesRequest } from '@canvas-tool/shared-types';

const API_BASE_URL = 'http://localhost:3001';

export async function getAllPeople() {
  const res = await fetch(`${API_BASE_URL}/api/people`);
  if (!res.ok) throw new Error('Failed to fetch people');
  return res.json();
}

export async function createPerson(personData: CreatePersonRequest) {
  const res = await fetch(`${API_BASE_URL}/api/people`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });
  if (!res.ok) throw new Error('Failed to add person');
  return res.json();
}

export async function updatePerson(id: number, data: UpdatePersonNotesRequest) {
  const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update person');
  return res.json();
}

export async function searchPeople(query: string = '', page: number = 1, limit: number = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });
  
  if (query.trim()) {
    params.append('query', query.trim());
  }

  const res = await fetch(`${API_BASE_URL}/api/people/search?${params}`);
  if (!res.ok) throw new Error('Failed to search people');
  return res.json();
}

export async function exportCsv() {
  const response = await fetch(`${API_BASE_URL}/api/people/export/csv`);
  if (!response.ok) throw new Error('Failed to export CSV');
  return response.text();
}
