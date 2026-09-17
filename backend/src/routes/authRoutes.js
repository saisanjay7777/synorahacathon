import { Router } from 'express';
import authController from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate, registerSchema, loginSchema } from '../middleware/validate.js';

const router = Router();

// Register new user
router.post('/register', validate(registerSchema), authController.register);

// Login existing user
router.post('/login', validate(loginSchema), authController.login);

// Get current user profile (Protected)
router.get('/me', authenticate, authController.getMe);

export default router;
