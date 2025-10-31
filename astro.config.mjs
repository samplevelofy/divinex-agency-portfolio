import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [],
  // Middleware is enabled by the presence of src/middleware.ts file
  // No explicit 'experimental' flag needed in recent Astro versions for this.
});