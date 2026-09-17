import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Routes
import authRoutes from './routes/authRoutes.js';
import auctionRoutes, { marketplaceRouter } from './routes/auctionRoutes.js';
import bidRoutes from './routes/bidRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { corsOptions } from './config/cors.js';

// Middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

/* ==========================================================================
   Security & Core Middleware
   ========================================================================== */

// Helmet Security Headers (allow cross-origin for static uploaded images)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS Configuration
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Assets (for local uploads fallback)
const uploadsDir = path.resolve(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Rate Limiter for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});
app.use('/api', apiLimiter);

/* ==========================================================================
   Health Endpoint
   ========================================================================== */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'BidSphere Backend',
  });
});

/* ==========================================================================
   API Routes
   ========================================================================== */
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/marketplace', marketplaceRouter);
app.use('/api/bids', bidRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/upload', uploadRoutes);

/* ==========================================================================
   Error Handlers
   ========================================================================== */
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
