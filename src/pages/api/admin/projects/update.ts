import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
import type { Project } from '../../../../lib/database.types';

// This API route is protected by src/middleware.ts

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const updatesToApply: Partial<Omit<Project, 'id' | 'created_at'>> = {
        title: updates.title,
        description: updates.description || null,
        image_url: updates.image_url || null,
        category_id: updates.category_id || null,
        is_published: updates.is_published === true,
        display_order: parseInt(updates.display_order) || 0,
        updated_at: new Date().toISOString()
    };
    
    // DEFINITIVE FIX: Apply 'as any' to the update method call
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