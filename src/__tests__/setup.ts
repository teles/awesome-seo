import '@testing-library/jest-dom';

// Mock global objects for testing
(global as any).fetch = jest.fn();

(global as any).navigator = {
  clipboard: {
    writeText: jest.fn(),
  },
};

(global as any).console = {
  ...console,
  error: jest.fn(),
  log: jest.fn(),
};
