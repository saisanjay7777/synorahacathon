import { Router } from 'express';
import sellerController from '../controllers/sellerController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// Seller Dashboard metrics & listed auctions (Protected)
router.get('/dashboard', authenticate, sellerController.getDashboard);

// Seller Recent live activity feed (Protected)
router.get('/activity', authenticate, sellerController.getActivity);

export default router;
