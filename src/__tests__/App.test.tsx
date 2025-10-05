import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

// Mock the DataLoader
jest.mock('../services/DataLoader', () => ({
  DataLoader: jest.fn().mockImplementation(() => ({
    loadData: jest.fn().mockResolvedValue([
      {
        name: 'Test Tool',
        url: 'https://example.com',
        description: 'A test tool for SEO',
        category: 'Testing',
      },
    ]),
  })),
}));

describe('App', () => {
  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByText('Awesome SEO')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
