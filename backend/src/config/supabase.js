import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    logger.info('Supabase client initialized successfully');
  } catch (err) {
    logger.warn(`Failed to initialize Supabase client: ${err.message}`);
  }
} else {
  logger.warn('Supabase credentials not configured in .env. Falling back to local storage for uploads.');
}

export { supabase };
export default supabase;
