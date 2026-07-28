// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('App', () => {
  it('renders the dashboard heading and table', () => {
    render(<App />);
    expect(screen.getByText('Team Dashboard')).toBeDefined();
    expect(screen.getByRole('table')).toBeDefined();
  });
});
