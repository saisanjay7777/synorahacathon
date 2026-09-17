import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import generateToken from '../utils/generateToken.js';
import logger from '../utils/logger.js';

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} - { user, token }
 */
export const register = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    const error = new Error('An account with this email address already exists.');
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const token = generateToken(user);
  logger.info(`User registered successfully: ${user.email} (ID: ${user.id})`);

  return { user, token };
};

/**
 * Log in an existing user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - { user, token }
 */
export const login = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  const token = generateToken(safeUser);
  logger.info(`User logged in: ${safeUser.email} (ID: ${safeUser.id})`);

  return { user: safeUser, token };
};

/**
 * Get user profile by ID
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export default {
  register,
  login,
  getUserById,
};
