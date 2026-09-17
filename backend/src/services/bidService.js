import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

/**
 * Place a bid on an auction within a Prisma transaction
 * @param {Object} params - { auctionId, bidderId, amount }
 * @returns {Promise<Object>} - { bid, currentBid, bidder, auction }
 */
export const placeBid = async ({ auctionId, bidderId, amount }) => {
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    const error = new Error('Invalid bid amount');
    error.statusCode = 400;
    throw error;
  }

  // Fetch auction with current status and details
  const auction = await prisma.auction.findUnique({
    where: { id: auctionId },
    include: {
      seller: { select: { id: true, name: true } },
    },
  });

  if (!auction) {
    const error = new Error('Auction not found');
    error.statusCode = 404;
    throw error;
  }

  // Validate auction is live
  if (auction.status !== 'LIVE') {
    const error = new Error(`Auction is not active (Current status: ${auction.status})`);
    error.statusCode = 400;
    throw error;
  }

  // Check if auction duration/deadline has passed
  if (auction.endsAt && new Date(auction.endsAt) <= new Date()) {
    // Automatically transition to ENDED
    await prisma.auction.update({
      where: { id: auctionId },
      data: { status: 'ENDED' },
    });
    const error = new Error('Auction has already ended');
    error.statusCode = 400;
    throw error;
  }

  // Prevent seller from bidding on their own auction
  if (auction.sellerId === bidderId) {
    const error = new Error('Sellers are not permitted to bid on their own auctions');
    error.statusCode = 400;
    throw error;
  }

  // Validate minimum increment & higher bid
  const minAllowed = auction.currentBid + (auction.minIncrement || 1.0);
  if (numericAmount < minAllowed) {
    const error = new Error(
      `Bid must be at least $${minAllowed.toFixed(2)} (Current bid: $${auction.currentBid.toFixed(2)} + Min increment: $${auction.minIncrement.toFixed(2)})`
    );
    error.statusCode = 400;
    throw error;
  }

  // Execute atomic Prisma transaction
  const [createdBid, updatedAuction] = await prisma.$transaction([
    prisma.bid.create({
      data: {
        amount: numericAmount,
        auctionId,
        bidderId,
      },
      include: {
        bidder: {
          select: { id: true, name: true },
        },
      },
    }),
    prisma.auction.update({
      where: { id: auctionId },
      data: {
        currentBid: numericAmount,
      },
    }),
  ]);

  logger.bid(
    `Bid placed: $${numericAmount} on "${auction.title}" by ${createdBid.bidder.name} (${bidderId})`
  );

  return {
    bid: createdBid,
    currentBid: updatedAuction.currentBid,
    bidder: createdBid.bidder.name,
    bidderId: createdBid.bidder.id,
    auctionId: updatedAuction.id,
    timestamp: createdBid.createdAt.toISOString(),
  };
};

/**
 * Get all bids for a specific auction
 * @param {string} auctionId
 */
export const getBidsByAuctionId = async (auctionId) => {
  return prisma.bid.findMany({
    where: { auctionId },
    orderBy: { amount: 'desc' },
    include: {
      bidder: {
        select: { id: true, name: true },
      },
    },
  });
};

export default {
  placeBid,
  getBidsByAuctionId,
};
