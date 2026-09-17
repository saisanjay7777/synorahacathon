import { Router } from 'express';
import bidController from '../controllers/bidController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate, bidSchema } from '../middleware/validate.js';

const router = Router();

// Place a new bid on an auction (Protected)
router.post('/', authenticate, validate(bidSchema), bidController.placeBid);

// Get bid history for an auction
router.get('/:auctionId', bidController.getBidsByAuction);

export default router;
