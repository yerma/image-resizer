import express from 'express';
import path from 'path';
import { listOriginalImages } from '../util/fileManager';
import resizer, { ImageFormat } from '../resizer';
import { useCache, logger, multerUpload } from './middleware';

const router = express.Router();

router.get('/images', async (_req, res) => {
  const images = await listOriginalImages();
  res.status(200).json(images);
});

router.get('/resize', useCache, async (req, res) => {
  const { filename, width, height, format } = req.query;
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
});

router.post('/upload', multerUpload().single('file'), (req, res) => {
  if (req.file) {
    res.redirect('/');
  } else {
    res.status(400).send('No file in request');
  }
});

export default router;
export { logger };
