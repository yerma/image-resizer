import { promises as fs } from 'fs';
import { RequestHandler } from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import multer from 'multer';
import * as middleware from '../routes/middleware';

const singleUploadStub = (): RequestHandler => (req, _, next) => {
  req.file = {} as Express.Multer.File;
  next();
};

sinon
  .stub(middleware, 'multerUpload')
  .callsFake(() => ({ single: singleUploadStub } as unknown as multer.Multer));

import app from '../index';
const request = supertest(app);

const fileContent =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

describe('Router specs', () => {
  beforeAll(async () => {
    await fs.writeFile('public/original/test.jpg', fileContent, 'base64');
  });

  afterAll(async () => {
    await fs.unlink('public/original/test.jpg');
  });

  describe('GET /api/resize', () => {
    it('responds with status 200 if found', async () => {
      const response = await request.get(
        '/api/resize?filename=test.jpg&width=200&height=200&format=png'
      );
      expect(response.status).toBe(200);
    });

    it('responds with status 500 if file not found', async () => {
      const response = await request.get(
        '/api/resize?filename=not-found.jpg&width=200&height=200&format=png'
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

  describe('POST /api/upload', () => {
    it('should upload test image to original folder', async () => {
      const response = await request
        .post('/api/upload')
        .attach('file', 'src/tests/fixtures/upload.jpg');
      expect(response.status).toBe(302);
      expect(response.headers.location).toEqual('/');
    });
  });
});
