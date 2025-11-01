// This file contains TypeScript types for your Supabase database tables.
// It's manually updated to reflect your schema.

// Type for the 'projects' table
export type Project = {
    id: string;
    created_at: string;
    updated_at: string | null;
    title: string;
    description: string | null;
    image_url: string | null;
    category_name: string | null;
    is_published: boolean;
    display_order: number;
    
    // <--- ADDED NEW COLUMNS BELOW --->
    slug: string; // Crucial for detail page URLs
    long_description: string | null;
    gallery_image_urls: string[] | null; // Array of image URLs
    client_name: string | null;
    services_provided: string | null; // e.g., "Logo Design, Branding Strategy"
};

// Composite type (no longer joining categories, but keeping if you need it for old code references)
export type ProjectWithCategory = Project & {
    categories: {
        name: string;
        slug: string;
    } | null;
};