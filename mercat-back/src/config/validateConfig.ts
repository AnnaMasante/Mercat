import { BUCKET_FOLDER, JWT_SECRET, MONGO_URL } from './variables';

export const validateConfig = (config: Record<string, unknown>) => {
  let errors: string = '';
  if (config[MONGO_URL] === undefined) {
    errors.concat('Database Url ');
  }
  if (config[BUCKET_FOLDER] === undefined) {
    errors.concat('Bucket Folder ');
  }
  if (config[JWT_SECRET] === undefined) {
    errors.concat('jwt secret ');
  }
  if (errors.length > 0) {
    throw new Error(errors);
  }
  return config;
};
