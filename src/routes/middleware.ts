import express from 'express';
import path from 'path';
import multer from 'multer';
import { promises as fs, constants } from 'fs';
import { convertedFilePath } from '../util/fileManager';
import { ImageFormat } from '../resizer';

export const logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`${req.method} request on ${req.originalUrl}`);
  next();
};

export const useCache = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { filename, width, height, format } = req.query;
  const { name } = path.parse(filename as string);
  const convertedFilename = convertedFilePath(
    name,
    width as string,
    height as string,
    format as ImageFormat
  );
  try {
    await fs.access(convertedFilename, constants.F_OK);
    console.log('File Exists: Returning from cache');
    res.status(200).sendFile(path.resolve(convertedFilename));
  } catch (_e) {
    next();
  }
};

export const multerUpload = () =>
  multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, 'public/original/'),
      filename: (_req, file, cb) => {
        const { name, ext } = path.parse(file.originalname);
        cb(null, `${name}-${Date.now()}${ext}`);
      }
    })
  });
