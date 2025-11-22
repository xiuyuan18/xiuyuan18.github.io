import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // IMPORTANT: Change 'repo-name' to your actual GitHub repository name.
  // If you are deploying to username.github.io, set this to '/'.
  // If you are deploying to username.github.io/my-site, set this to '/my-site/'
  base: '/',
  build: {
    outDir: 'dist',
  },
});
