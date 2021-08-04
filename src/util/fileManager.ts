import { promises as fs } from 'fs';
import { ImageFormat } from '../resizer';

export interface ImageObject {
  filename: string;
  src: string;
}

export const listOriginalImages = async (): Promise<ImageObject[]> => {
  const images = await fs.readdir('public/original');
  return images.map(
    (filename: string): ImageObject => ({
      filename,
      src: `original/${filename}`
    })
  );
};

export const listResizedImages = async (): Promise<ImageObject[]> => {
  const images = await fs.readdir('public/original');
  return images.map(
    (filename: string): ImageObject => ({
      filename,
      src: `original/${filename}`
    })
  );
};

export const convertedFilePath = (
  name: string,
  width: string | number,
  height: string | number,
  format: ImageFormat = 'jpg'
): string => `public/resized/${name}-${width}x${height}.${format}`;
