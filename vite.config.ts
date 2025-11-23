import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import fs from 'node:fs';
import path from 'node:path';

// Plugin to copy index.html to 404.html for GitHub Pages SPA support
const copy404Plugin = () => {
  let outDir = 'dist';
  return {
    name: 'copy-404',
    configResolved(config: any) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexHtml = path.resolve(outDir, 'index.html');
      const notFoundHtml = path.resolve(outDir, '404.html');
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
        console.log(`Created 404.html in ${outDir} for GitHub Pages`);
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    tailwindcss(),
    copy404Plugin(),
  ],
  // IMPORTANT: Change 'repo-name' to your actual GitHub repository name.
  // If you are deploying to username.github.io, set this to '/'.
  // If you are deploying to username.github.io/my-site, set this to '/my-site/'
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Only apply manualChunks in client build, not SSR where dependencies are externalized
        manualChunks: isSsrBuild ? undefined : {
          // Split React core libraries
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split heavy markdown and math libraries
          'markdown': ['react-markdown', 'remark-math', 'rehype-katex', 'katex']
        }
      }
    }
  },
}));
