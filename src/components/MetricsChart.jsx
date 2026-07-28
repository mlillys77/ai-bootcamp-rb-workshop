import React from 'react';

// Deliberately hand-rolled SVG bar chart. Tickets exist to improve/replace it.
export default function MetricsChart({ data }) {
  const width = 800;
  const height = 220;
  const padding = 40;
  const max = Math.max(1, ...data.map((d) => d.value));
  const barWidth = data.length > 0 ? (width - padding * 2) / data.length - 12 : 0;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Story points by team">
        {data.map((d, i) => {
          const barHeight = ((height - padding * 2) * d.value) / max;
          const x = padding + i * (barWidth + 12);
          const y = height - padding - barHeight;
          return (
            <g key={d.team}>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill="#0a6e5c" rx="3" />
              <text x={x + barWidth / 2} y={height - padding + 16} textAnchor="middle" fontSize="12">
                {d.team}
              </text>
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="12">
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
