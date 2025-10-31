import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';

// This API route is protected by src/middleware.ts

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json(); // No adminPassword needed in body

    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
  } catch (error: any) {
    console.error("API Error - Delete Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};