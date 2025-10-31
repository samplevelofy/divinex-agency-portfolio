import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase.ts'; // Explicit .ts extension
import { getSessionUser } from '../../../../lib/session.ts'; // <--- CORRECTED import

export const POST: APIRoute = async ({ request }) => {
  try {
    const user = await getSessionUser(); // <--- CORRECTED: Use getSessionUser
    if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded.' }), { status: 400 });
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage
      .from('project-images') // <--- IMPORTANT: Ensure this matches your bucket name
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error("Supabase Storage Upload Error:", error.message);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('project-images') // <--- IMPORTANT: Ensure this matches your bucket name
      .getPublicUrl(filename);

    return new Response(JSON.stringify({ url: publicUrlData.publicUrl }), { status: 200 });

  } catch (error: any) {
    console.error("API Error - Upload Image:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};