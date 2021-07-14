import { promises as fs } from 'fs';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
const fileContent =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

describe('Routes specs', () => {
  beforeAll(async () => {
    await fs.writeFile('public/original/test.jpg', fileContent, 'base64');
  });

  afterAll(async () => {
    await fs.unlink('public/original/test.jpg');
  });

  describe('GET /api/resize', () => {
    it('responds with status 200 if found', async () => {
      const response = await request.get(
        '/api/resize?filename=test.jpg&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });

    it('responds with status 500 if file not found', async () => {
      const response = await request.get(
        '/api/resize?filename=not-found&width=200&height=200'
      );
      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/images', () => {
    it('returns at least 1 image', async () => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });
});
