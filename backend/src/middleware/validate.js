import { z } from 'zod';

/**
 * Higher-order middleware to validate request body with a Zod schema
 * @param {z.ZodSchema} schema
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid request payload',
    });
  }
};

/* ==========================================================================
   Validation Schemas
   ========================================================================== */

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Invalid email address')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Invalid email address')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

export const createAuctionSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters'),
  category: z
    .string({ required_error: 'Category is required' })
    .trim()
    .min(2, 'Category is required'),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(5, 'Description must be at least 5 characters'),
  brand: z.string().trim().optional().nullable(),
  startPrice: z.coerce
    .number({ required_error: 'Starting price is required' })
    .positive('Starting price must be greater than 0'),
  reservePrice: z.coerce
    .number()
    .positive('Reserve price must be greater than 0')
    .optional()
    .nullable(),
  minIncrement: z.coerce
    .number()
    .positive('Minimum increment must be greater than 0')
    .default(1.0),
  duration: z.coerce
    .number({ required_error: 'Duration is required' })
    .int('Duration must be an integer')
    .positive('Duration must be greater than 0')
    .default(60), // default 60 minutes
  images: z
    .array(z.string().url('Each image must be a valid URL'))
    .optional()
    .default([]),
});

export const updateAuctionSchema = z.object({
  title: z.string().trim().min(3).max(200).optional(),
  category: z.string().trim().min(2).optional(),
  description: z.string().trim().min(5).optional(),
  brand: z.string().trim().optional().nullable(),
  reservePrice: z.coerce.number().positive().optional().nullable(),
  minIncrement: z.coerce.number().positive().optional(),
  status: z.enum(['LIVE', 'ENDED', 'CANCELLED']).optional(),
  images: z.array(z.string().url()).optional(),
});

export const bidSchema = z.object({
  auctionId: z
    .string({ required_error: 'Auction ID is required' })
    .trim()
    .min(1, 'Auction ID is required'),
  amount: z.coerce
    .number({ required_error: 'Bid amount is required' })
    .positive('Bid amount must be greater than 0'),
});
