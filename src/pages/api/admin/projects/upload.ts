import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// This API route is protected by src/middleware.ts

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided.' }), { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    // Step 1: Upload the file
    const { error: uploadError } = await supabase.storage
      .from('project-images') // Ensure this bucket exists in Supabase Storage
      .upload(fileName, file, { contentType: file.type, upsert: false });

    if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError.message);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Step 2: Get the public URL for the uploaded file
    // DEFINITIVE FIX: Explicitly cast the result of getPublicUrl to 'any'
    // This ensures TypeScript does not incorrectly infer the return type.
    const { data: publicUrlData, error: getUrlError } = (supabase.storage
      .from('project-images')
      .getPublicUrl(fileName) as any); // <-- KEY CHANGE: Cast to 'any' here
      
    if (getUrlError) { // Now, 'getUrlError' should be correctly recognized
        console.error("Supabase Get Public URL Error:", getUrlError.message);
        throw new Error(`Failed to get public URL: ${getUrlError.message}`);
    }
    if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('Could not retrieve public URL after upload.');
    }

    return new Response(JSON.stringify({ url: publicUrlData.publicUrl }), { status: 200 });
  } catch (err: any) {
    console.error("API Error - Upload Image:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};