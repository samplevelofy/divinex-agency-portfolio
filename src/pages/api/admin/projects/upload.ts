import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
// getAuthenticatedUser is not imported as per current local development plan (static login)
import { v4 as uuidv4 } from 'uuid';

export const POST: APIRoute = async ({ request }) => {
  try {
    // --- TEMPORARY: NO AUTHENTICATION CHECK FOR LOCAL DEV ---
    // const user = await getAuthenticatedUser();
    // if (!user) { return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }); }
    // --- END TEMPORARY ---

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided.' }), { status: 400 });
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images') // Ensure this bucket exists in Supabase Storage and is configured for public uploads
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError.message);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);
      
    if (!urlData || !urlData.publicUrl) {
        throw new Error('Could not get public URL after upload.');
    }

    return new Response(JSON.stringify({ url: urlData.publicUrl }), { status: 200 });
  } catch (err: any) {
    console.error("API Error - Upload Image:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};