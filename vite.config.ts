// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// ---  plugin de sitemap ---
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    
    Sitemap({
      hostname: 'https://asblast.space',
      
      // On liste ici toutes les "pages" de votre application
      // que le plugin ne peut pas deviner, comme les articles de blog.
      dynamicRoutes: [
        // Pages principales
        '/blog',
        
        // Pages légales 
        '/privacy',
        '/terms',

        //Articles
        '/blog/guide-optimisation-lighthouse',
        '/blog/creation-majordome-ai',
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});