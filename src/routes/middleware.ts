import express, { Request } from 'express';
import path from 'path';
import multer from 'multer';
import { promises as fs, constants } from 'fs';
import { convertedFilePath } from '../util/fileManager';
import { ImageFormat } from '../resizer';

export const logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  console.log(`${req.method} request on ${req.originalUrl}`);
  next();
};

export const useCache = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
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

export const multerUpload = (): multer.Multer =>
  multer({
    storage: multer.diskStorage({
      destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ): void => cb(null, 'public/original/'),
      filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ): void => {
        const { name, ext } = path.parse(file.originalname);
        cb(null, `${name}-${Date.now()}${ext}`);
      }
    })
  });
