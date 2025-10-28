export function getOptimizedImageUrl(originalUrl: string | null | undefined, width: number, height: number): string {
  if (!originalUrl || originalUrl.trim() === '') {
    return '/placeholder-project.jpg'; // Ensure this file exists in public/
  }
  // If it's a Supabase URL, for now, just return it directly until network is stable.
  // We will add image transformations here when deploying to Vercel/live environment.
  if (originalUrl.includes('supabase.co/storage/v1/object/public/')) {
    return originalUrl; // Return original URL, transformation features can be added later
  }
  return originalUrl; // For any other direct URL, return as is
}