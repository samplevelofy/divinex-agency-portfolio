import type { APIRoute } from 'astro'; // <--- Correct type import
import { supabase } from '../../../../lib/supabase.ts';
import { getSessionUser } from '../../../../lib/session.ts';

export const POST: APIRoute = async ({ request }) => { // <--- Correct destructuring and type for request
  try {
    const user = await getSessionUser();
    if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }

    const body = await request.json();
    const { id, adminPassword } = body;

    if (!id) {
        return new Response(JSON.stringify({ error: 'Project ID is required for deletion.' }), { status: 400 });
    }

    const { error } = await supabase.from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return new Response(JSON.stringify({ message: 'Project deleted successfully.' }), { status: 200 });

  } catch (error: any) {
    console.error("API Error - Delete Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};