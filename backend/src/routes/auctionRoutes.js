import { Router } from 'express';
import auctionController from '../controllers/auctionController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  validate,
  createAuctionSchema,
  updateAuctionSchema,
} from '../middleware/validate.js';

const auctionRouter = Router();
export const marketplaceRouter = Router();

/* ==========================================================================
   Auctions Endpoints (/api/auctions)
   ========================================================================== */

// Create a new auction (Protected, Seller)
auctionRouter.post(
  '/',
  authenticate,
  validate(createAuctionSchema),
  auctionController.createAuction
);

// Get list of auctions with query filters
auctionRouter.get('/', auctionController.getAuctions);

// Get auction by ID
auctionRouter.get('/:id', auctionController.getAuctionById);

// Update auction (Protected, Seller Only)
auctionRouter.patch(
  '/:id',
  authenticate,
  validate(updateAuctionSchema),
  auctionController.updateAuction
);

// Delete auction (Protected, Seller Only)
auctionRouter.delete('/:id', authenticate, auctionController.deleteAuction);

/* ==========================================================================
   Marketplace Endpoints (/api/marketplace)
   ========================================================================== */

// Get live auctions formatted for buyer marketplace
marketplaceRouter.get('/', auctionController.getMarketplaceAuctions);

// Get single marketplace auction by ID
marketplaceRouter.get('/:id', auctionController.getMarketplaceAuctionById);

export default auctionRouter;
