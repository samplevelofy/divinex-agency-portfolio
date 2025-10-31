import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing!");
  // Depending on your application, you might want to throw an error,
  // or return a mock client to prevent the app from crashing.
  // For now, we'll log an error and let it fail gracefully in dev if needed.
}

// Create the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('--- Supabase Client Init Debug ---');
console.log('PUBLIC_SUPABASE_URL:', supabaseUrl);
console.log('PUBLIC_SUPABASE_ANON_KEY (first 5 chars):', supabaseAnonKey ? supabaseAnonKey.substring(0, 5) + '...' : 'N/A');
console.log('---------------------------------');