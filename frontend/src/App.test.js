import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('Base renders', () => {
  test('renders Lista de apostas', () => {
    render(<App />);
    const element = screen.getByText(/Lista de apostas/);
    expect(element).toBeInTheDocument();
  });
});
