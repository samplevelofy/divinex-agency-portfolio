export function getOptimizedImageUrl(originalUrl: string | null | undefined): string {
  if (!originalUrl) {
    return '/placeholder-project.jpg'; // Ensure this file exists in public/
  }
  // Since Codespace network is an issue for Supabase Storage, we will just return the original URL.
  // If you are hosting images on another service (e.g., Cloudinary) you would add transformation logic here.
  return originalUrl;
}
// This file contains TypeScript types for your Supabase database tables.
// It's manually updated to reflect your schema.

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')    // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-')    // Replace multiple - with single -
        .substring(0, 100);      // Trim to 100 chars
}

// New utility function to format plain text with line breaks into HTML paragraphs
export function formatTextForHtml(text: string | null | undefined): string {
    if (!text) return '';
    // Replace double line breaks with new paragraphs, then single line breaks with <br/>
    return text
        .split(/\n\s*\n/) // Split by double line breaks (and optional whitespace)
        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`) // Wrap paragraphs and convert single line breaks
        .join('');
}