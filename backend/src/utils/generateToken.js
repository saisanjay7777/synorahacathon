import jwt from 'jsonwebtoken';

/**
 * Generate signed JWT token for authenticated users
 * @param {Object} user - User object { id, email, name }
 * @returns {string} - Signed JWT string
 */
export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'bidsphere_fallback_secret_key_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    secret,
    { expiresIn }
  );
};

export default generateToken;
