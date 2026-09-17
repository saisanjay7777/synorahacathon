import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import supabase from '../config/supabase.js';
import logger from '../utils/logger.js';

const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'auction-images';
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

// Ensure uploads directory exists for fallback
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/**
 * Upload a single file buffer to Supabase Storage or local disk fallback
 * @param {Object} file - Express Multer file object
 * @param {string} reqHost - Request host for fallback URL building
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export const uploadFile = async (file, reqHost = 'localhost:5000') => {
  const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
  const fileName = `auction-${Date.now()}-${randomUUID()}${ext}`;

  // If Supabase is properly configured, upload to Supabase Storage
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        logger.warn(`Supabase upload warning: ${error.message}. Falling back to local storage.`);
      } else {
        const { data: publicData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(fileName);

        if (publicData?.publicUrl) {
          logger.info(`File uploaded to Supabase Storage: ${publicData.publicUrl}`);
          return publicData.publicUrl;
        }
      }
    } catch (err) {
      logger.warn(`Error connecting to Supabase Storage: ${err.message}. Falling back to local storage.`);
    }
  }

  // Fallback: save to local uploads directory
  const filePath = path.join(UPLOADS_DIR, fileName);
  await fs.promises.writeFile(filePath, file.buffer);

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const localUrl = `${protocol}://${reqHost}/uploads/${fileName}`;
  logger.info(`File saved locally: ${localUrl}`);
  return localUrl;
};

/**
 * Upload multiple files
 * @param {Array<Object>} files - Array of Multer file objects
 * @param {string} reqHost - Request host
 * @returns {Promise<Array<string>>} - Array of public URLs
 */
export const uploadMultipleFiles = async (files, reqHost = 'localhost:5000') => {
  if (!files || files.length === 0) return [];
  const uploadPromises = files.map((file) => uploadFile(file, reqHost));
  return Promise.all(uploadPromises);
};

export default {
  uploadFile,
  uploadMultipleFiles,
};
