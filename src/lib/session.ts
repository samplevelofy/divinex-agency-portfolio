import { supabase } from './supabase.ts'; // Correct path from src/lib/

// This function attempts to get the authenticated user's session
// It's designed for server-side usage in Astro endpoints or components
export async function getSessionUser() {
    try {
        // Get the session from Supabase on the server
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("getSessionUser error:", error.message);
            return null;
        }

        if (session) {
            return session.user;
        }
        return null;
    } catch (e) {
        console.error("Error getting session user:", e);
        return null;
    }
}