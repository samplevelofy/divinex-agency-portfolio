import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';

// This API route is protected by src/middleware.ts

export const GET: APIRoute = async ({ request }) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*, categories(name, slug)') // Join with categories for display
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return new Response(JSON.stringify({ projects: data }), { status: 200 });
  } catch (error: any) {
    console.error("API Error - Get All Projects:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};