import { Router } from 'express';
import multer from 'multer';
import uploadController from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// Multer memory storage configuration
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Unsupported file type: ${file.mimetype}. Allowed types: JPEG, PNG, WEBP, GIF, SVG.`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10, // Maximum 10 images at once
  },
  fileFilter,
});

// Upload multiple product images (Field name: "images")
router.post(
  '/',
  authenticate,
  upload.array('images', 10),
  uploadController.uploadMultipleImages
);

// Upload single product image (Field name: "image")
router.post(
  '/single',
  authenticate,
  upload.single('image'),
  uploadController.uploadSingleImage
);

export default router;
