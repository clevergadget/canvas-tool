// Jest setup file

// Mock console to reduce noise during tests
const originalConsole = console;
Object.assign(console, {
  log: () => {},
  error: () => {},
  warn: () => {},
  info: () => {},
});
