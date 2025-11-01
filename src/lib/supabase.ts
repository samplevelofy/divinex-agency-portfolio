import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('--- Supabase Client Init Debug ---');
    console.error(`PUBLIC_SUPABASE_URL: ${supabaseUrl}`);
    console.error(`PUBLIC_SUPABASE_ANON_KEY (first 5 chars): ${supabaseAnonKey?.substring(0, 5) || 'N/A'}`);
    console.error('---------------------------------');
    throw new Error('Supabase environment variables are missing. Please check your .env file.');
}

// We can simplify the client creation since in-app authentication isn't used
// The anon key has public read access to your database/storage (if policies allow)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);