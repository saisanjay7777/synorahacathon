import jwt from 'jsonwebtoken';
import bidService from '../services/bidService.js';
import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

/**
 * Configure Socket.IO live bidding and real-time room events
 * @param {import('socket.io').Server} io
 */
export const configureAuctionSocket = (io) => {
  // Middleware to authenticate socket connection if token is provided
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(' ')[1] ||
        socket.handshake.query?.token;

      if (token) {
        const secret = process.env.JWT_SECRET || 'bidsphere_fallback_secret_key_2026';
        const decoded = jwt.verify(token, secret);
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { id: true, name: true, email: true },
        });

        if (user) {
          socket.data.user = user;
        }
      }
    } catch (err) {
      logger.debug(`Socket authentication skipped or failed: ${err.message}`);
    }
    next();
  });

  io.on('connection', (socket) => {
    const userLabel = socket.data.user ? `${socket.data.user.name} (${socket.data.user.id})` : 'Anonymous';
    logger.socket(`Client connected: ${socket.id} [${userLabel}]`);

    /**
     * Join auction room
     */
    socket.on('joinAuction', (data) => {
      const auctionId = typeof data === 'object' ? data.auctionId : data;
      if (!auctionId) {
        return socket.emit('error', { message: 'Auction ID is required to join room.' });
      }

      socket.join(auctionId);
      logger.socket(`Socket ${socket.id} joined auction room: ${auctionId}`);

      // Notify user they joined
      socket.emit('joinedAuction', {
        auctionId,
        message: `Successfully joined auction room: ${auctionId}`,
      });

      // Notify others in room
      socket.to(auctionId).emit('userJoined', {
        auctionId,
        user: socket.data.user?.name || 'A bidder',
      });
    });

    /**
     * Leave auction room
     */
    socket.on('leaveAuction', (data) => {
      const auctionId = typeof data === 'object' ? data.auctionId : data;
      if (auctionId) {
        socket.leave(auctionId);
        logger.socket(`Socket ${socket.id} left auction room: ${auctionId}`);
        socket.to(auctionId).emit('userLeft', {
          auctionId,
          user: socket.data.user?.name || 'A bidder',
        });
      }
    });

    /**
     * Place live bid
     */
    socket.on('placeBid', async (data) => {
      try {
        let { auctionId, amount, token } = data || {};

        // Resolve bidder identity
        let bidder = socket.data.user;

        // If not already authenticated, attempt verification with passed token
        if (!bidder && token) {
          const secret = process.env.JWT_SECRET || 'bidsphere_fallback_secret_key_2026';
          const decoded = jwt.verify(token, secret);
          bidder = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true },
          });
          if (bidder) {
            socket.data.user = bidder;
          }
        }

        if (!bidder) {
          return socket.emit('bidError', {
            message: 'Authentication required. Please sign in to place a bid.',
          });
        }

        if (!auctionId || !amount) {
          return socket.emit('bidError', {
            message: 'Auction ID and bid amount are required.',
          });
        }

        // Validate and place bid using bidService transaction
        const result = await bidService.placeBid({
          auctionId,
          bidderId: bidder.id,
          amount,
        });

        const broadcastPayload = {
          auctionId: result.auctionId,
          currentBid: result.currentBid,
          bidder: result.bidder,
          timestamp: result.timestamp,
        };

        // 1. Broadcast to the specific auction room
        io.to(auctionId).emit('bidUpdated', broadcastPayload);

        // 2. Broadcast to global market channel for live marketplace cards
        io.emit('marketplaceBidUpdated', broadcastPayload);

        // 3. Acknowledge the bidder
        socket.emit('bidSuccess', {
          message: 'Bid placed successfully!',
          data: broadcastPayload,
        });

        logger.socket(
          `Live bid broadcasted on room ${auctionId}: $${result.currentBid} by ${result.bidder}`
        );
      } catch (error) {
        logger.error(`Live bid failed for socket ${socket.id}: ${error.message}`);
        socket.emit('bidError', {
          message: error.message || 'Failed to place bid',
        });
      }
    });

    /**
     * Handle manual or automated auction end broadcast
     */
    socket.on('endAuction', async (data) => {
      try {
        const { auctionId } = data || {};
        if (!auctionId) return;

        const auction = await prisma.auction.findUnique({
          where: { id: auctionId },
          include: {
            bids: {
              orderBy: { amount: 'desc' },
              take: 1,
              include: { bidder: { select: { id: true, name: true } } },
            },
          },
        });

        if (auction) {
          await prisma.auction.update({
            where: { id: auctionId },
            data: { status: 'ENDED' },
          });

          const highestBid = auction.bids[0];
          const payload = {
            auctionId,
            status: 'ENDED',
            finalBid: auction.currentBid,
            winner: highestBid ? highestBid.bidder.name : null,
            winnerId: highestBid ? highestBid.bidder.id : null,
            timestamp: new Date().toISOString(),
          };

          io.to(auctionId).emit('auctionEnded', payload);
          io.emit('marketplaceAuctionEnded', payload);
          logger.socket(`Broadcasted auctionEnded for auction: ${auctionId}`);
        }
      } catch (err) {
        logger.error(`Error ending auction ${data?.auctionId}: ${err.message}`);
      }
    });

    /**
     * Cleanup on disconnect
     */
    socket.on('disconnect', (reason) => {
      logger.socket(`Client disconnected: ${socket.id} (${reason})`);
    });
  });
};

export default configureAuctionSocket;
