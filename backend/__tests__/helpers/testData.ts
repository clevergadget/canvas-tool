// Test data helpers to reduce repetition in tests

export const createMockPerson = (overrides: any = {}) => ({
  id: 1,
  first_name: 'Test',
  last_name: 'Person',
  email: 'test@example.com',
  notes: 'Test notes',
  created_at: new Date('2024-01-01T00:00:00.000Z').toISOString(),
  updated_at: new Date('2024-01-01T00:00:00.000Z').toISOString(),
  ...overrides
});

export const createMockPersonData = (overrides: any = {}) => ({
  first_name: 'Test',
  last_name: 'Person',
  email: 'test@example.com',
  notes: 'Test notes',
  ...overrides
});

export const createMockSearchResult = (overrides: any = {}) => ({
  data: [createMockPerson()],
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
  ...overrides
});

// Helper to create multiple mock people
export const createMockPeople = (count: number, baseOverrides: any = {}) => {
  return Array.from({ length: count }, (_, index) => 
    createMockPerson({ 
      id: index + 1, 
      first_name: `Person${index + 1}`,
      email: `person${index + 1}@example.com`,
      ...baseOverrides 
    })
  );
};
