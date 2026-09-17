import prisma from '../config/prisma.js';

/**
 * Get aggregated dashboard analytics and auction listings for a seller
 * @param {string} sellerId
 */
export const getSellerDashboard = async (sellerId) => {
  // Fetch seller's auctions with bids and counts
  const auctions = await prisma.auction.findMany({
    where: { sellerId },
    include: {
      images: {
        select: { id: true, url: true },
      },
      bids: {
        orderBy: { amount: 'desc' },
        include: {
          bidder: {
            select: { id: true, name: true },
          },
        },
      },
      _count: {
        select: { bids: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Calculate active auctions
  const activeAuctions = auctions.filter((a) => a.status === 'LIVE').length;

  // Calculate total revenue (Sum of final/current bids for auctions that received bids)
  const totalRevenue = auctions.reduce((acc, a) => {
    // If auction has bids, currentBid represents current or final value
    if (a._count.bids > 0) {
      return acc + a.currentBid;
    }
    return acc;
  }, 0);

  // Calculate highest bid across all seller's auctions
  let highestBid = 0;
  const uniqueBidderIds = new Set();

  for (const auction of auctions) {
    for (const bid of auction.bids) {
      if (bid.amount > highestBid) {
        highestBid = bid.amount;
      }
      uniqueBidderIds.add(bid.bidderId);
    }
  }

  const participants = uniqueBidderIds.size;

  // Format auctions for response
  const formattedAuctions = auctions.map((a) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    brand: a.brand,
    startPrice: a.startPrice,
    currentBid: a.currentBid,
    reservePrice: a.reservePrice,
    minIncrement: a.minIncrement,
    duration: a.duration,
    status: a.status,
    endsAt: a.endsAt,
    images: a.images.map((img) => img.url),
    bidCount: a._count.bids,
    createdAt: a.createdAt,
  }));

  return {
    activeAuctions,
    totalRevenue,
    highestBid,
    participants,
    auctions: formattedAuctions,
  };
};

/**
 * Get recent live activity feed for seller's auctions
 * @param {string} sellerId
 */
export const getSellerActivity = async (sellerId) => {
  // Fetch recent bids on seller's auctions
  const recentBids = await prisma.bid.findMany({
    where: {
      auction: { sellerId },
    },
    take: 20,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      auction: {
        select: {
          id: true,
          title: true,
          status: true,
          endsAt: true,
          reservePrice: true,
        },
      },
      bidder: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const now = Date.now();

  const activities = recentBids.map((bid) => {
    let type = 'Bid increased';
    let message = `${bid.bidder.name} placed a bid of $${bid.amount.toFixed(2)}`;

    // Check if auction has ended
    if (bid.auction.status === 'ENDED') {
      type = 'Auction won';
      message = `${bid.bidder.name} won "${bid.auction.title}" for $${bid.amount.toFixed(2)}`;
    } else if (
      bid.auction.endsAt &&
      new Date(bid.auction.endsAt).getTime() - now < 15 * 60 * 1000 &&
      new Date(bid.auction.endsAt).getTime() > now
    ) {
      type = 'Auction ending';
      message = `High activity: "${bid.auction.title}" is ending soon!`;
    }

    return {
      id: bid.id,
      type,
      message,
      amount: bid.amount,
      bidder: bid.bidder.name,
      bidderId: bid.bidder.id,
      auctionId: bid.auction.id,
      auctionTitle: bid.auction.title,
      timestamp: bid.createdAt,
    };
  });

  return activities;
};

export default {
  getSellerDashboard,
  getSellerActivity,
};
