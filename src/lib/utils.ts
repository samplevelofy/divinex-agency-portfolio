export function getOptimizedImageUrl(originalUrl: string | null | undefined): string {
  if (!originalUrl) {
    return '/placeholder-project.jpg'; // Ensure this file exists in public/
  }
  // Since Codespace network is an issue for Supabase Storage, we will just return the original URL.
  // If you are hosting images on another service (e.g., Cloudinary) you would add transformation logic here.
  return originalUrl;
}