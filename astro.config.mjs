import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Keeping server output for Supabase API routes
  integrations: [] // No integrations for now, as we removed Tailwind
});