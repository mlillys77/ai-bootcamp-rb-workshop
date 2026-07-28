import React from 'react';

export default function StatusFilter({ statuses, value, onChange }) {
  return (
    <div className="status-filter" role="group" aria-label="Filter by status">
      {statuses.map((s) => (
        <button
          key={s}
          className={s === value ? 'active' : ''}
          onClick={() => onChange(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
