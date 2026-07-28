import express from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(readFileSync(join(__dirname, 'fixtures', 'metrics.json'), 'utf8'));

export function createApp() {
  const app = express();

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // NOTE: no validation of the `status` query parameter yet — an unknown
  // status silently returns an empty list. QA tickets cover this endpoint.
  app.get('/api/metrics', (req, res) => {
    const { status } = req.query;
    let items = fixtures.items;
    if (status && status !== 'all') {
      items = items.filter((i) => i.status === status);
    }
    res.json({ count: items.length, items });
  });

  return app;
}
