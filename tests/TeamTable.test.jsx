// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TeamTable from '../src/components/TeamTable.jsx';

describe('TeamTable', () => {
  const sampleItems = [
    {
      id: 1,
      team: 'Alpha',
      title: 'Task A',
      status: 'on-track',
      storyPoints: 5,
      updatedAt: '2026-07-20',
    },
  ];

  it('renders table when items are provided', () => {
    render(<TeamTable items={sampleItems} />);
    expect(screen.getByRole('table')).toBeDefined();
    expect(screen.getByText('Task A')).toBeDefined();
  });

  it('renders empty message when no items match the filter', () => {
    render(<TeamTable items={[]} />);
    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.getByText(/No items match this filter/)).toBeDefined();
  });

  it('calls onResetFilter when reset button is clicked', () => {
    const onReset = vi.fn();
    render(<TeamTable items={[]} onResetFilter={onReset} />);
    screen.getByRole('button').click();
    expect(onReset).toHaveBeenCalledOnce();
  });
});
