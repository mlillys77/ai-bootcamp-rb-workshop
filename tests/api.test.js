import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../api/app.js';

describe('GET /api/health', () => {
  it('responds ok', async () => {
    const res = await request(createApp()).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
// NOTE: /api/metrics has no tests yet — see ticket QA-01.
