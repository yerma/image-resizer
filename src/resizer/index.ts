import { promises as fs } from 'fs';
import sharp from 'sharp';

export const getImageFileMatch = async (
  filename: string
): Promise<string | undefined> => {
  const files = await fs.readdir('./images/');
  const filenameRegex = new RegExp(`${filename}\.(jpg|png|webp)`);
  return files.find((file) => filenameRegex.test(file));
};

export const resizeImage = async (
  filename: string,
  width: string,
  height: string
): Promise<string> => {
  const fileMatch = await getImageFileMatch(filename);
  if (!fileMatch) throw new Error('File not found');

  const original = await sharp(`./images/${fileMatch}`);
  const newFilename = `./resized/${filename}-${width}x${height}.jpg`;
  try {
    await original
      .resize(parseInt(width), parseInt(height))
      .toFile(newFilename);
    return newFilename;
  } catch (e) {
    throw new Error('Error while resizing: ' + e.message);
  }
};
