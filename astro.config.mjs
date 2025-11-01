import { defineConfig } from 'astro/config';
// import image from '@astrojs/image'; // <--- REMOVED: No longer importing @astrojs/image directly
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [], // <--- MODIFIED: Removed [image()] from integrations
  adapter: vercel({
    imageService: true, // <--- ADDED: Enable Vercel's native image optimization service
  }),
});