import path from 'path';

const availableFormats = ['jpg', 'png', 'webp'];

export const validateParams = (
  args: Record<string, unknown>
): {
  valid: boolean;
  errors: string;
} => {
  const errorMessages: string[] = [];
  Object.entries(args).forEach(([field, value]): void => {
    if (!value) {
      errorMessages.push(`Field "${field}" cannot be empty.`);
    }

    switch (field) {
      case 'filename': {
        const { name, ext } = path.parse(value as string);
        if (value && (!name || !ext))
          errorMessages.push(
            `Invalid ${field}: Make sure to provide filename with extension.`
          );
        break;
      }
      case 'width':
      case 'height':
        if (value && !parseInt(value as string)) {
          errorMessages.push(`Invalid ${field}: provide a numeric value.`);
        }
        break;
      case 'format':
        if (
          value &&
          !availableFormats.includes((value as string).toLowerCase())
        ) {
          errorMessages.push(
            `Invalid ${field}: Only JPG, PNG and WEBP are available.`
          );
        }
        break;
    }
  });

  return {
    valid: !errorMessages.length,
    errors: errorMessages.join(' / ')
  };
};
