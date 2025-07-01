// Test constants to avoid magic numbers and improve maintainability

export const TEST_CONSTANTS = {
  // Common test IDs
  DEFAULT_PERSON_ID: 1,
  
  // Date constants for consistent testing
  BASE_DATE: '2024-01-01T00:00:00.000Z',
  UPDATED_DATE: '2024-01-01T01:00:00.000Z',
  SECOND_DATE: '2024-01-02T00:00:00.000Z',
  
  // API endpoints (for reference)
  ENDPOINTS: {
    PEOPLE: '/api/people',
    PEOPLE_EXPORT: '/api/people/export/csv',
    PEOPLE_SEARCH: '/api/people/search',
  },
  
  // Common test strings
  STRINGS: {
    SUCCESS: 'success',
    ERROR: 'error',
    DATA: 'data',
  },
  
  // HTTP status codes
  STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  }
};
