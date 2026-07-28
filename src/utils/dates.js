/**
 * Parse a date string into a Date.
 * Currently only handles ISO (YYYY-MM-DD) reliably — see data/team_metrics.csv
 * for the other formats found in the wild. Stretch tickets cover this gap.
 */
export function parseDate(value) {
  return new Date(value);
}

export function formatDate(value) {
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return 'invalid date';
  return d.toISOString().slice(0, 10);
}
