// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// --- NOUVEAUX IMPORTS ---
// Importe le visualiseur de bundle
import { visualizer } from 'rollup-plugin-visualizer';
// Importe le plugin sitemap
import Sitemap from 'vite-plugin-sitemap';
// Importe les données des produits pour générer les routes dynamiquement
import { productsData } from './src/data/products';

// --- Logique pour générer les routes des produits dynamiquement ---
// Cela rend le sitemap "intelligent". Si on ajoute un produit,
// il sera automatiquement ajouté au sitemap lors du prochain build.
const productRoutes = productsData.map(product => `/produits/${product.slug}`);


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
      
      // La liste des routes est maintenant générée dynamiquement
      dynamicRoutes: [
        // Pages principales
        '/blog',
        '/produits', // On ajoute la page catalogue
        ...productRoutes, // On ajoute toutes les pages de détail des produits

        // Pages légales 
        '/privacy',
        '/terms',

        //Produits
        '/produits/analyseur-texte-offline',
        '/produits/creative-portfolio-pro',

        // Articles
        '/blog/guide-optimisation-lighthouse',
        '/blog/creation-majordome-ai',

      ]
    }),

    // --- NOUVEAU PLUGIN POUR LA PERFORMANCE ---
    
    visualizer({
      open: true, // Ouvre le rapport dans le navigateur après le build
      filename: 'stats.html', // Nom du fichier de rapport
      gzipSize: true, // Affiche la taille après compression gzip
      brotliSize: true, // Affiche la taille après compression brotli
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});