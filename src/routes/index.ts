import express from 'express';
import path from 'path';
import { resizeImage } from '../resizer';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to image resizer');
});

router.get('/resize', async (req, res) => {
  const { filename, width, height } = req.query;
  try {
    const resizedFile = await resizeImage(
      filename as string,
      width as string,
      height as string
    );
    res.status(200).sendFile(path.resolve(resizedFile));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
