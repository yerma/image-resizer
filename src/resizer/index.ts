import path from 'path';
import sharp from 'sharp';
import { convertedFilePath } from '../util/fileManager';

export type ImageFormat = 'jpg' | 'png' | 'webp';

const resizeImage = async (
  filename: string,
  width: number,
  height: number,
  format: ImageFormat = 'jpg'
): Promise<string> => {
  const { name } = path.parse(filename);
  const newFilename = convertedFilePath(name, width, height, format);

  try {
    await sharp(`public/original/${filename}`)
      .resize(width, height)
      .toFile(newFilename);
    return newFilename;
  } catch (e) {
    throw new Error(`Error while resizing: ${e.message}`);
  }
};

export default {
  resizeImage
};
