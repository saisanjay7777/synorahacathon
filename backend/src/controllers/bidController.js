import bidService from '../services/bidService.js';
import logger from '../utils/logger.js';

/**
 * Place a bid via REST endpoint
 */
export const placeBid = async (req, res, next) => {
  try {
    const bidderId = req.user.id;
    const { auctionId, amount } = req.body;

    const result = await bidService.placeBid({
      auctionId,
      bidderId,
      amount,
    });

    // Broadcast via Socket.IO if instance is available on app
    const io = req.app.get('io');
    if (io) {
      const payload = {
        auctionId: result.auctionId,
        currentBid: result.currentBid,
        bidder: result.bidder,
        timestamp: result.timestamp,
      };

      io.to(result.auctionId).emit('bidUpdated', payload);
      // Also emit to all connected clients for live market updates
      io.emit('marketplaceBidUpdated', payload);
      logger.socket(`Broadcasted bidUpdated event for auction ${result.auctionId}`);
    }

    res.status(201).json({
      success: true,
      message: 'Bid placed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get bids for an auction
 */
export const getBidsByAuction = async (req, res, next) => {
  try {
    const { auctionId } = req.params;
    const bids = await bidService.getBidsByAuctionId(auctionId);
    res.status(200).json({
      success: true,
      count: bids.length,
      bids,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  placeBid,
  getBidsByAuction,
};
