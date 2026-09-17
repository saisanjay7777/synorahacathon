import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

/**
 * Create a new auction
 * @param {string} sellerId - Authenticated user ID
 * @param {Object} data - Auction input details
 */
export const createAuction = async (sellerId, data) => {
  const {
    title,
    category,
    description,
    brand,
    startPrice,
    reservePrice,
    minIncrement = 1.0,
    duration = 60,
    images = [],
  } = data;

  const numericStartPrice = parseFloat(startPrice);
  const numericDuration = parseInt(duration, 10);
  const endsAt = new Date(Date.now() + numericDuration * 60 * 1000);

  const auction = await prisma.auction.create({
    data: {
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      brand: brand ? brand.trim() : null,
      startPrice: numericStartPrice,
      currentBid: numericStartPrice, // currentBid = startPrice when published
      reservePrice: reservePrice ? parseFloat(reservePrice) : null,
      minIncrement: parseFloat(minIncrement),
      duration: numericDuration,
      status: 'LIVE',
      sellerId,
      endsAt,
      images: {
        create: images.map((url) => ({ url })),
      },
    },
    include: {
      seller: {
        select: { id: true, name: true, email: true },
      },
      images: {
        select: { id: true, url: true },
      },
      _count: {
        select: { bids: true },
      },
    },
  });

  logger.info(`Auction created: "${auction.title}" (ID: ${auction.id}) by seller ${sellerId}`);
  return auction;
};

/**
 * Get all auctions with optional query filters
 */
export const getAuctions = async (filters = {}) => {
  const { category, status, search, sellerId } = filters;

  const where = {};

  if (category && category !== 'All') {
    where.category = { equals: category, mode: 'insensitive' };
  }

  if (status) {
    where.status = status;
  }

  if (sellerId) {
    where.sellerId = sellerId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
    ];
  }

  const auctions = await prisma.auction.findMany({
    where,
    include: {
      seller: {
        select: { id: true, name: true },
      },
      images: {
        select: { id: true, url: true },
      },
      _count: {
        select: { bids: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return auctions;
};

/**
 * Get single auction by ID
 */
export const getAuctionById = async (id) => {
  const auction = await prisma.auction.findUnique({
    where: { id },
    include: {
      seller: {
        select: { id: true, name: true, email: true },
      },
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
  });

  if (!auction) {
    const error = new Error('Auction not found');
    error.statusCode = 404;
    throw error;
  }

  return auction;
};

/**
 * Update auction (Seller Only)
 */
export const updateAuction = async (id, sellerId, updateData) => {
  const existing = await prisma.auction.findUnique({
    where: { id },
  });

  if (!existing) {
    const error = new Error('Auction not found');
    error.statusCode = 404;
    throw error;
  }

  if (existing.sellerId !== sellerId) {
    const error = new Error('Unauthorized: You can only edit your own auctions');
    error.statusCode = 403;
    throw error;
  }

  const { images, ...fields } = updateData;

  const dataToUpdate = { ...fields };
  if (fields.startPrice) dataToUpdate.startPrice = parseFloat(fields.startPrice);
  if (fields.reservePrice) dataToUpdate.reservePrice = parseFloat(fields.reservePrice);
  if (fields.minIncrement) dataToUpdate.minIncrement = parseFloat(fields.minIncrement);

  if (images && Array.isArray(images)) {
    // Replace images
    await prisma.auctionImage.deleteMany({ where: { auctionId: id } });
    dataToUpdate.images = {
      create: images.map((url) => ({ url })),
    };
  }

  const updated = await prisma.auction.update({
    where: { id },
    data: dataToUpdate,
    include: {
      seller: {
        select: { id: true, name: true },
      },
      images: {
        select: { id: true, url: true },
      },
      _count: {
        select: { bids: true },
      },
    },
  });

  logger.info(`Auction updated: "${updated.title}" (ID: ${updated.id})`);
  return updated;
};

/**
 * Delete auction (Seller Only)
 */
export const deleteAuction = async (id, sellerId) => {
  const existing = await prisma.auction.findUnique({
    where: { id },
  });

  if (!existing) {
    const error = new Error('Auction not found');
    error.statusCode = 404;
    throw error;
  }

  if (existing.sellerId !== sellerId) {
    const error = new Error('Unauthorized: You can only delete your own auctions');
    error.statusCode = 403;
    throw error;
  }

  await prisma.auction.delete({
    where: { id },
  });

  logger.info(`Auction deleted: (ID: ${id}) by seller ${sellerId}`);
  return { success: true, message: 'Auction deleted successfully' };
};

/**
 * Get Marketplace Auctions formatted specifically for LiveAuctions.jsx
 */
export const getMarketplaceAuctions = async (query = {}) => {
  const { category, search, status = 'LIVE' } = query;

  const where = {};
  if (status && status !== 'ALL') {
    where.status = status;
  }

  if (category && category !== 'All') {
    where.category = { equals: category, mode: 'insensitive' };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
    ];
  }

  const auctions = await prisma.auction.findMany({
    where,
    include: {
      seller: {
        select: { id: true, name: true },
      },
      images: {
        select: { id: true, url: true },
      },
      _count: {
        select: { bids: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transform and enrich with countdown in seconds
  const now = Date.now();
  return auctions.map((auction) => {
    let countdown = 0;
    if (auction.endsAt) {
      const remainingMs = new Date(auction.endsAt).getTime() - now;
      countdown = Math.max(0, Math.floor(remainingMs / 1000));
    }

    return {
      id: auction.id,
      title: auction.title,
      category: auction.category,
      description: auction.description,
      brand: auction.brand,
      startPrice: auction.startPrice,
      currentBid: auction.currentBid,
      reservePrice: auction.reservePrice,
      minIncrement: auction.minIncrement,
      status: auction.status,
      duration: auction.duration,
      endsAt: auction.endsAt,
      countdown, // remaining seconds
      seller: auction.seller,
      images: auction.images.map((img) => img.url),
      bidCount: auction._count.bids,
      createdAt: auction.createdAt,
    };
  });
};

/**
 * Get single Marketplace auction by ID with countdown and recent bids
 */
export const getMarketplaceAuctionById = async (id) => {
  const auction = await getAuctionById(id);
  const now = Date.now();

  let countdown = 0;
  if (auction.endsAt) {
    const remainingMs = new Date(auction.endsAt).getTime() - now;
    countdown = Math.max(0, Math.floor(remainingMs / 1000));
  }

  return {
    id: auction.id,
    title: auction.title,
    category: auction.category,
    description: auction.description,
    brand: auction.brand,
    startPrice: auction.startPrice,
    currentBid: auction.currentBid,
    reservePrice: auction.reservePrice,
    minIncrement: auction.minIncrement,
    status: auction.status,
    duration: auction.duration,
    endsAt: auction.endsAt,
    countdown,
    seller: auction.seller,
    images: auction.images.map((img) => img.url),
    bidCount: auction._count.bids,
    bids: auction.bids.map((bid) => ({
      id: bid.id,
      amount: bid.amount,
      bidder: bid.bidder.name,
      bidderId: bid.bidder.id,
      createdAt: bid.createdAt,
    })),
    createdAt: auction.createdAt,
  };
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
