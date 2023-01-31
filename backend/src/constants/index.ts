import { config } from 'dotenv';

config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const SUPABASE_KEY = process.env.SUPABASE_KEY;
export const SUPABASE_URL = process.env.SUPABASE_URL;
if (!JWT_SECRET || !SUPABASE_KEY || !SUPABASE_URL) {
  throw new Error('Missing environment variables');
}
