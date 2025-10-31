import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase.ts';
import { getSessionUser } from '../../../../lib/session.ts'; // <--- CORRECTED import

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await getSessionUser(); // <--- CORRECTED: Use getSessionUser
    if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }

    const { data, error } = await supabase
      .from('projects')
      .select('*, categories(name, slug)') // Select category data as well
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return new Response(JSON.stringify({ projects: data }), { status: 200 });
  } catch (error: any) {
    console.error("API Error - Get All Projects:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};