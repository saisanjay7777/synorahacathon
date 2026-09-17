import storageService from '../services/storageService.js';

/**
 * Upload single image
 */
export const uploadSingleImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided. Field name must be "image" or "file".',
      });
    }

    const host = req.get('host') || 'localhost:5000';
    const url = await storageService.uploadFile(req.file, host);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url,
      urls: [url],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload multiple images
 */
export const uploadMultipleImages = async (req, res, next) => {
  try {
    // Handle both req.files (array) or req.file (single)
    const files = req.files || (req.file ? [req.file] : []);

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided. Field name must be "images".',
      });
    }

    const host = req.get('host') || 'localhost:5000';
    const urls = await storageService.uploadMultipleFiles(files, host);

    res.status(200).json({
      success: true,
      message: `${urls.length} images uploaded successfully`,
      urls,
      url: urls[0], // Convenience for single-image consumers
    });
  } catch (error) {
    next(error);
  }
};

export default {
  uploadSingleImage,
  uploadMultipleImages,
};
