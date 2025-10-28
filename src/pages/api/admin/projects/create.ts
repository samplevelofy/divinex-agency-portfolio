import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
// getAuthenticatedUser is not imported as per current local development plan (static login)
import type { Project } from '../../../../lib/database.types';

export const POST: APIRoute = async ({ request }) => {
  try {
    // --- TEMPORARY: NO AUTHENTICATION CHECK FOR LOCAL DEV ---
    // In a production setup, this would be guarded by proper authentication middleware
    // const user = await getAuthenticatedUser();
    // if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }
    // --- END TEMPORARY ---

    const body = await request.json();
    const { title, description, thumbnail, images, category_id, is_published, display_order } = body;

    const newProject: Partial<Project> = {
        title,
        description: description || null,
        thumbnail: thumbnail || null,
        images: images || null,
        category_id: category_id || null,
        is_published: is_published === true, // Ensure it's a boolean
        display_order: parseInt(display_order) || 0 // Ensure it's an integer
    };

    // Cast the insert method to 'any' to bypass strict TypeScript inference if needed
    const { data, error } = await (supabase.from('projects').insert as any)([newProject]).select().single();

    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: any) {
    console.error("API Error - Create Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};