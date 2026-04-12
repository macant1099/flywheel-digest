import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  site: 'https://affiliate-digest.livechannel.com',
  build: { assets: '_assets' },
});
