import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import app from './app.js';
import configureAuctionSocket from './sockets/auctionSocket.js';
import prisma from './config/prisma.js';
import logger from './utils/logger.js';

import { isOriginAllowed, allowedOriginsList } from './config/cors.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
});

// Attach Socket.IO instance to app for use in controllers
app.set('io', io);

// Configure Socket.IO event listeners
configureAuctionSocket(io);

// Start HTTP & Socket server
server.listen(PORT, () => {
  logger.success(`🚀 BidSphere Backend running on port ${PORT}`);
  logger.info(`📡 Socket.IO server initialized and listening for connections`);
  logger.info(`🔗 Allowed Origins: ${allowedOriginsList.join(', ')}`);
  logger.info(`🩺 Health endpoint: http://localhost:${PORT}/`);
});

// Graceful Shutdown Handler
const gracefulShutdown = async (signal) => {
  logger.warn(`Received ${signal}. Gracefully terminating BidSphere Backend...`);
  try {
    server.close(() => {
      logger.info('HTTP and Socket server closed.');
    });
    await prisma.$disconnect();
    logger.info('Database connection closed.');
    process.exit(0);
  } catch (err) {
    logger.error(`Error during graceful shutdown: ${err.message}`);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

export default server;
