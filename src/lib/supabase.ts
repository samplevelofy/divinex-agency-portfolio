import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types'; // <--- Import the new database type

// Get Supabase URL and ANON key from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and/or ANON key are not defined in environment variables.');
}

// Create a single Supabase client for convenience with database types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);