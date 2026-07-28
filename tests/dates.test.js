import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/utils/dates.js';

describe('formatDate', () => {
  it('formats ISO dates', () => {
    expect(formatDate('2026-07-20')).toBe('2026-07-20');
  });

  it('labels unparseable input', () => {
    expect(formatDate('not-a-date')).toBe('invalid date');
  });
  // NOTE: no coverage yet for the non-ISO formats present in
  // data/team_metrics.csv (DD/MM/YYYY, "June 30 2026", DD.MM.YYYY).
});
