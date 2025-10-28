import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
// getAuthenticatedUser is not imported as per current local development plan (static login)
import type { Project } from '../../../../lib/database.types';

export const POST: APIRoute = async ({ request }) => {
  try {
    // --- TEMPORARY: NO AUTHENTICATION CHECK FOR LOCAL DEV ---
    // const user = await getAuthenticatedUser();
    // if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }
    // --- END TEMPORARY ---

    const body = await request.json();
    const { id, ...updates } = body;

    // Prepare updates object with correct types and defaults
    const updatesToApply: Partial<Omit<Project, 'id' | 'created_at'>> = {
        title: updates.title,
        description: updates.description || null,
        thumbnail: updates.thumbnail || null,
        images: updates.images || null,
        category_id: updates.category_id || null,
        is_published: updates.is_published === true, // Ensure boolean
        display_order: parseInt(updates.display_order) || 0, // Ensure integer
        updated_at: new Date().toISOString() // Manually update updated_at
    };
    
    // Cast the update method to 'any' to bypass strict TypeScript inference if needed
    const { data, error } = await (supabase.from('projects').update as any)(updatesToApply)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("API Error - Update Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};