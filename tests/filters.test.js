import { describe, it, expect } from 'vitest';
import { filterByStatus, filterRecentItems } from '../src/utils/filters.js';

const items = [
  { id: 1, status: 'on-track', updatedAt: '2026-07-20' },
  { id: 2, status: 'blocked',  updatedAt: '2026-07-01' },
  { id: 3, status: 'done',     updatedAt: '2026-06-27' }
];

describe('filterByStatus', () => {
  it('returns everything for "all"', () => {
    expect(filterByStatus(items, 'all')).toHaveLength(3);
  });

  it('returns only matching items', () => {
    expect(filterByStatus(items, 'blocked').map((i) => i.id)).toEqual([2]);
  });
});

describe('filterRecentItems', () => {
  const now = new Date('2026-07-27');

  it('includes items inside the window', () => {
    const result = filterRecentItems(items, 30, now);
    expect(result.map((i) => i.id)).toContain(1);
  });

  it('excludes items outside the window', () => {
    const result = filterRecentItems(items, 10, now);
    expect(result.map((i) => i.id)).not.toContain(2);
  });

  // This test FAILS on purpose — Exercise 1A. The contract says the window
  // is inclusive: an item updated exactly `days` days ago belongs in the result.
  it('includes items updated exactly `days` days ago (inclusive boundary)', () => {
    const result = filterRecentItems(items, 30, now);
    expect(result.map((i) => i.id)).toContain(3);
  });
});
