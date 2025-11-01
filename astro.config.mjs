import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import vercel from '@astrojs/vercel'; // <--- ADDED: Import Vercel adapter

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [image()],
  adapter: vercel(), // <--- ADDED: Configure Vercel adapter
});