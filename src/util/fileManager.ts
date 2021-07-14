import { promises as fs } from 'fs';

export interface ImageObject {
  filename: string;
  src: string;
}

const listOriginalImages = async (): Promise<ImageObject[]> => {
  const images = await fs.readdir('public/original');
  return images.map((filename) => ({
    filename,
    src: `original/${filename}`
  }));
};

const listResizedImages = async (): Promise<ImageObject[]> => {
  const images = await fs.readdir('public/original');
  return images.map((filename) => ({
    filename,
    src: `original/${filename}`
  }));
};

export default {
  listOriginalImages,
  listResizedImages
};
