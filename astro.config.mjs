import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import swup from '@swup/astro';
// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    swup(),
  ], // <--- MODIFIED: Removed [image()] from integrations
  adapter: vercel({
    imageService: true, // <--- ADDED: Enable Vercel's native image optimization service
  }),
});