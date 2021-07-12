import { promises as fs } from 'fs';
import sharp from 'sharp';

export const resizeImage = async (
  filename: string,
  width: string,
  height: string
): Promise<string> => {
  const original = await sharp('./images/' + filename);
  const [name, extension] = filename.split('.');
  const newFilename = `./resized/${name}-${width}x${height}.${extension}`;
  try {
    await original
      .resize(parseInt(width), parseInt(height))
      .toFile(newFilename);
    return newFilename;
  } catch (e) {
    throw new Error('Error while resizing: ' + e.message);
  }
};
