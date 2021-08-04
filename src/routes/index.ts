import express, { Request, Response } from 'express';
import path from 'path';
import { listOriginalImages } from '../util/fileManager';
import { validateParams } from '../util/validator';
import resizer, { ImageFormat } from '../resizer';
import { useCache, logger, multerUpload } from './middleware';

const router = express.Router();

router.get('/images', async (_req: Request, res: Response): Promise<void> => {
  const images = await listOriginalImages();
  res.status(200).json(images);
});

router.get(
  '/resize',
  useCache,
  async (req: Request, res: Response): Promise<void> => {
    const { filename, width, height, format } = req.query;

    const { valid, errors } = validateParams({
      filename,
      width,
      height,
      format
    });
    if (!valid) {
      res.status(400).send(errors);
    } else {
      try {
        const resizedFile = await resizer.resizeImage(
          filename as string,
          parseInt(width as string),
          parseInt(height as string),
          format as ImageFormat
        );
        res.status(200).sendFile(path.resolve(resizedFile));
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  }
);

router.post(
  '/upload',
  multerUpload().single('file'),
  (req: Request, res: Response): void => {
    if (req.file) {
      res.redirect('/');
    } else {
      res.status(400).send('No file in request');
    }
  }
);

export default router;
export { logger };
