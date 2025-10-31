import type { APIRoute } from 'astro'; // <--- Correct type import
import { supabase } from '../../../../lib/supabase.ts';
import { getSessionUser } from '../../../../lib/session.ts';
import type { Project } from '../../../../lib/database.types';

export const POST: APIRoute = async ({ request }) => { // <--- Correct destructuring and type for request
  try {
    const user = await getSessionUser();
    if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
        return new Response(JSON.stringify({ error: 'Project ID is required for update.' }), { status: 400 });
    }

    const updatesToApply: Partial<Omit<Project, 'id' | 'created_at'>> = {
        title: updates.title,
        description: updates.description || null,
        image_url: updates.image_url || null,
        category_id: updates.category_id || null,
        is_published: updates.is_published === true,
        display_order: parseInt(updates.display_order) || 0,
        updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase.from('projects')
      .update(updatesToApply)
      .eq('id', id)
      .select();

    if (error) throw error;
    
    if (!data || data.length === 0) {
        return new Response(JSON.stringify({ error: 'No project found with the given ID to update, or update failed.' }), { status: 404 });
    }

    return new Response(JSON.stringify(data[0]), { status: 200 });

  } catch (error: any) {
    console.error("API Error - Update Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};