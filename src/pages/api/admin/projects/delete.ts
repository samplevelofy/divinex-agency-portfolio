import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
// getAuthenticatedUser is not imported as per current local development plan (static login)

export const POST: APIRoute = async ({ request }) => {
  try {
    // --- TEMPORARY: NO AUTHENTICATION CHECK FOR LOCAL DEV ---
    // const user = await getAuthenticatedUser();
    // if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }
    // --- END TEMPORARY ---

    const { id } = await request.json();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
  } catch (error: any) {
    console.error("API Error - Delete Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};