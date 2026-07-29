import React, { useMemo, useState } from 'react';
import metrics from '../api/fixtures/metrics.json';
import StatusFilter from './components/StatusFilter.jsx';
import TeamTable from './components/TeamTable.jsx';
import MetricsChart from './components/MetricsChart.jsx';
import { filterByStatus, filterRecentItems } from './utils/filters.js';

const STATUSES = ['all', 'on-track', 'at-risk', 'blocked', 'done'];

export default function App() {
  const [status, setStatus] = useState('all');
  const [recentOnly, setRecentOnly] = useState(false);

  const visible = useMemo(() => {
    let items = filterByStatus(metrics.items, status);
    if (recentOnly) {
      items = filterRecentItems(items, 30);
    }
    return items;
  }, [status, recentOnly]);

  const chartData = useMemo(() => {
    const byTeam = {};
    for (const item of visible) {
      byTeam[item.team] = (byTeam[item.team] || 0) + item.storyPoints;
    }
    return Object.entries(byTeam).map(([team, value]) => ({ team, value }));
  }, [visible]);

  return (
    <main className="app">
      <h1>Team Dashboard</h1>
      <p className="subtitle">GenAI Garage workshop sandbox</p>

      <section className="controls">
        <StatusFilter statuses={STATUSES} value={status} onChange={setStatus} />
        <label className="recent-toggle">
          <input
            type="checkbox"
            checked={recentOnly}
            onChange={(e) => setRecentOnly(e.target.checked)}
          />
          Updated in last 30 days
        </label>
      </section>

      <MetricsChart data={chartData} />
      <TeamTable items={visible} onResetFilter={() => setStatus('all')} />
    </main>
  );
}
