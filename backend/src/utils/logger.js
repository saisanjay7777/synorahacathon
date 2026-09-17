/**
 * Simple, readable logger utility for BidSphere Backend
 */
const formatTime = () => new Date().toISOString();

export const logger = {
  info: (msg, meta = '') => {
    console.log(`\x1b[36m[${formatTime()}] [INFO]\x1b[0m ${msg}`, meta ? meta : '');
  },
  success: (msg, meta = '') => {
    console.log(`\x1b[32m[${formatTime()}] [SUCCESS]\x1b[0m ${msg}`, meta ? meta : '');
  },
  warn: (msg, meta = '') => {
    console.warn(`\x1b[33m[${formatTime()}] [WARN]\x1b[0m ${msg}`, meta ? meta : '');
  },
  error: (msg, meta = '') => {
    console.error(`\x1b[31m[${formatTime()}] [ERROR]\x1b[0m ${msg}`, meta ? meta : '');
  },
  debug: (msg, meta = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`\x1b[35m[${formatTime()}] [DEBUG]\x1b[0m ${msg}`, meta ? meta : '');
    }
  },
  socket: (msg, meta = '') => {
    console.log(`\x1b[34m[${formatTime()}] [SOCKET]\x1b[0m ${msg}`, meta ? meta : '');
  },
  bid: (msg, meta = '') => {
    console.log(`\x1b[35m[${formatTime()}] [BID]\x1b[0m ${msg}`, meta ? meta : '');
  },
};

export default logger;
