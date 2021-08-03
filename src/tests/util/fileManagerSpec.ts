import { promises as fs } from 'fs';
import {
  listOriginalImages,
  listResizedImages,
  convertedFilePath
} from './../../util/fileManager';

const fileContent =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

describe('File Manager specs', () => {
  describe('listOriginalImages function', () => {
    beforeAll(async () => {
      await fs.writeFile('public/original/test.jpg', fileContent, 'base64');
    });

    afterAll(async () => {
      await fs.unlink('public/original/test.jpg');
    });

    it('should list at least 1 original image', async () => {
      const images = await listOriginalImages();
      expect(images.length).toBeGreaterThanOrEqual(1);
    });

    it('should return filename and src per image found', async () => {
      const images = await listOriginalImages();
      const { filename, src } = images[0];
      expect(filename).toBeDefined();
      expect(src).toBeDefined();
    });
  });

  describe('listResizedImages function', () => {
    beforeAll(async () => {
      await fs.writeFile('public/resized/test.jpg', fileContent, 'base64');
    });

    afterAll(async () => {
      await fs.unlink('public/resized/test.jpg');
    });

    it('should list at least 1 resized image', async () => {
      const images = await listResizedImages();
      expect(images.length).toBeGreaterThanOrEqual(1);
    });

    it('should return filename and src per image found', async () => {
      const images = await listResizedImages();
      const { filename, src } = images[0];
      expect(filename).toBeDefined();
      expect(src).toBeDefined();
    });
  });

  describe('convertedFilePath function', () => {
    it('should build name for resized image from params', () => {
      const filename = convertedFilePath('test', 200, 100, 'webp');
      expect(filename).toEqual(`public/resized/test-200x100.webp`);
    });
  });
});
