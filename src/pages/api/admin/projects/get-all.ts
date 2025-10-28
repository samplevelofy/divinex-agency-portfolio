import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
// getAuthenticatedUser is not imported as per current local development plan (static login)

export const GET: APIRoute = async ({ request }) => {
  try {
    // --- TEMPORARY: NO AUTHENTICATION CHECK FOR LOCAL DEV ---
    // If you want to fetch ALL projects (including unpublished ones) only for logged-in admins,
    // you would re-enable the auth check here. For now, it fetches all.
    // const user = await getAuthenticatedUser();
    // if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }
    // --- END TEMPORARY ---

    const { data, error } = await supabase
      .from('projects')
      .select('*, categories(*)')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return new Response(JSON.stringify({ projects: data }), { status: 200 });
  } catch (error: any) {
    console.error("API Error - Get All Projects:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};