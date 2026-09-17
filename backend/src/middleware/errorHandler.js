import logger from '../utils/logger.js';

/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`, err.stack);

  // Multer Errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size limit exceeded. Maximum allowed size is 5MB per image.',
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Too many files uploaded or unexpected field name.',
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`,
    });
  }

  // Prisma Error Handling
  if (err.code === 'P2002') {
    const target = err.meta?.target ? ` on field: ${err.meta.target}` : '';
    return res.status(409).json({
      success: false,
      message: `A record with this value already exists${target}.`,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Requested record was not found.',
    });
  }

  if (err.code === 'P2003') {
    return res.status(400).json({
      success: false,
      message: 'Foreign key constraint failed.',
    });
  }

  // JSON Parsing Syntax Error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request body.',
    });
  }

  // Default Status and Message
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error occurred.';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found Handler for undefined routes
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: [${req.method}] ${req.originalUrl}`,
  });
};

export default errorHandler;
