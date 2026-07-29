import React from 'react';
import { formatDate } from '../utils/dates.js';

export default function TeamTable({ items, onResetFilter }) {
  if (items.length === 0) {
    return (
      <p className="empty-message">
        No items match this filter.{' '}
        <button className="reset-filter" onClick={onResetFilter}>
          Show all items
        </button>
      </p>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Item</th>
          <th>Status</th>
          <th>Story points</th>
          <th>Last updated</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.team}</td>
            <td>{item.title}</td>
            <td>{item.status}</td>
            <td>{item.storyPoints}</td>
            <td>{formatDate(item.updatedAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
