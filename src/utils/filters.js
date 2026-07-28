/**
 * Filter dashboard items by status.
 * NOTE: has no edge-case tests yet (empty input, unknown status, casing).
 */
export function filterByStatus(items, status) {
  if (status === 'all') return items;
  return items.filter((item) => item.status === status);
}

/**
 * Return items updated within the last `days` days (inclusive).
 * An item updated exactly `days` days ago should be included.
 */
export function filterRecentItems(items, days, now = new Date()) {
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);
  // BUG (intentional, for Exercise 1A): strict comparison excludes items
  // updated exactly `days` days ago. Should be >= to match the contract above.
  return items.filter((item) => new Date(item.updatedAt) > cutoff);
}
