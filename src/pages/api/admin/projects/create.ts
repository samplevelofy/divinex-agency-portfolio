import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
import type { Project } from '../../../../lib/database.types';

// This API route is protected by src/middleware.ts (checks for admin_session_id cookie)

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { title, description, image_url, category_id, is_published, display_order } = body;

    const newProject: Partial<Project> = {
        title,
        description: description || null,
        image_url: image_url || null,
        category_id: category_id || null,
        is_published: is_published === true,
        display_order: parseInt(display_order) || 0
    };

    // DEFINITIVE FIX: Apply 'as any' to the insert method call
    const { data, error } = await (supabase.from('projects').insert as any)([newProject]).select().single();

    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: any) {
    console.error("API Error - Create Project:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};