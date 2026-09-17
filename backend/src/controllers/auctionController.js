import auctionService from '../services/auctionService.js';

/**
 * Create a new auction listing (Seller)
 */
export const createAuction = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const auction = await auctionService.createAuction(sellerId, req.body);
    res.status(201).json({
      success: true,
      message: 'Auction created and published successfully',
      auction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all auctions with filters
 */
export const getAuctions = async (req, res, next) => {
  try {
    const auctions = await auctionService.getAuctions(req.query);
    res.status(200).json({
      success: true,
      count: auctions.length,
      auctions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get auction details by ID
 */
export const getAuctionById = async (req, res, next) => {
  try {
    const auction = await auctionService.getAuctionById(req.params.id);
    res.status(200).json({
      success: true,
      auction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing auction (Seller only)
 */
export const updateAuction = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const updated = await auctionService.updateAuction(req.params.id, sellerId, req.body);
    res.status(200).json({
      success: true,
      message: 'Auction updated successfully',
      auction: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an auction (Seller only)
 */
export const deleteAuction = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const result = await auctionService.deleteAuction(req.params.id, sellerId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Marketplace: Get live auctions formatted for LiveAuctions.jsx
 */
export const getMarketplaceAuctions = async (req, res, next) => {
  try {
    const auctions = await auctionService.getMarketplaceAuctions(req.query);
    res.status(200).json({
      success: true,
      count: auctions.length,
      auctions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Marketplace: Get single auction formatted for marketplace view
 */
export const getMarketplaceAuctionById = async (req, res, next) => {
  try {
    const auction = await auctionService.getMarketplaceAuctionById(req.params.id);
    res.status(200).json({
      success: true,
      auction,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createAuction,
  getAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
  getMarketplaceAuctions,
  getMarketplaceAuctionById,
};
