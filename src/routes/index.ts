import express from 'express';
import path from 'path';
import multer from 'multer';
import resizer, { ImageFormat } from '../resizer';
import fileManager from '../util/fileManager';

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'public/original/'),
    filename: (_req, file, cb) => {
      const { name, ext } = path.parse(file.originalname);
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
});

router.get('/images', async (_req, res) => {
  const images = await fileManager.listOriginalImages();
  res.status(200).json(images);
});

router.get('/resize', async (req, res) => {
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

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).redirect('/');
  }
});

export default router;
