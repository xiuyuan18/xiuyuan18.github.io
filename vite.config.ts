import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // IMPORTANT: Change 'repo-name' to your actual GitHub repository name.
    // If you are deploying to username.github.io, set this to '/'.
    // If you are deploying to username.github.io/my-site, set this to '/my-site/'
    base: '/', 
    build: {
      outDir: 'dist',
    },
    define: {
      // This allows the code 'process.env.API_KEY' to be replaced by the actual value during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
