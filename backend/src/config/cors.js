import dotenv from 'dotenv';
dotenv.config();

const baseOrigins = [
  'https://fronted-saaho.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
];

// Add CLIENT_URL from environment if specified
if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const trimmed = url.trim().replace(/\/+$/, '');
    if (trimmed && !baseOrigins.includes(trimmed)) {
      baseOrigins.push(trimmed);
    }
  });
}

/**
 * Checks if a given origin is allowed
 * @param {string|undefined} origin
 * @returns {boolean}
 */
export const isOriginAllowed = (origin) => {
  // Allow requests with no origin (mobile apps, curl, postman, server-to-server)
  if (!origin) return true;

  const normalized = origin.replace(/\/+$/, '');

  // Exact match in allowed origins list
  if (baseOrigins.includes(normalized)) {
    return true;
  }

  // Allow any localhost port in development
  if (/^http:\/\/localhost(:\d+)?$/.test(normalized)) {
    return true;
  }

  // Allow any Vercel deployment preview / production domain
  if (normalized.endsWith('.vercel.app')) {
    return true;
  }

  return false;
};

export const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
};

export const allowedOriginsList = baseOrigins;
export default corsOptions;
