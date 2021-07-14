import { promises as fs } from 'fs';
import resizer from '../../resizer';

const fileContent =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

describe('Resizer specs', () => {
  beforeAll(async () => {
    await fs.writeFile('public/original/test.jpg', fileContent, 'base64');
  });

  afterAll(async () => {
    await fs.unlink('public/original/test.jpg');
    await fs.unlink('public/resized/test-200x200.jpg');
    await fs.unlink('public/resized/test-150x150.png');
  });

  describe('resizeImage function', () => {
    it('should throw if file not found', async () => {
      await expectAsync(
        resizer.resizeImage('not-found', 200, 200)
      ).toBeRejected();
    });

    it('should return path for resized image when converted successfully', async () => {
      const result = await resizer.resizeImage('test.jpg', 200, 200);
      expect(result).toEqual('public/resized/test-200x200.jpg');
    });

    it('should return path for resized image with specific format if provided', async () => {
      const result = await resizer.resizeImage('test.jpg', 150, 150, 'png');
      expect(result).toEqual('public/resized/test-150x150.png');
    });
  });
});
