import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

/**
 * Protect routes - Verifies JWT and attaches authenticated user to req.user
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authorization token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'bidsphere_fallback_secret_key_2026';

    const decoded = jwt.verify(token, secret);

    // Fetch user from DB to ensure user still exists and get latest details
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session. User not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authorization token has expired. Please log in again.',
      });
    }

    logger.error('Authentication error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token.',
    });
  }
};

/**
 * Optional authentication - If token is present, sets req.user; otherwise proceeds as guest
 */
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'bidsphere_fallback_secret_key_2026';
      const decoded = jwt.verify(token, secret);

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true, createdAt: true },
      });

      if (user) {
        req.user = user;
      }
    }
  } catch {
    // Ignore invalid token in optional authentication
  }
  next();
};

export default authenticate;
