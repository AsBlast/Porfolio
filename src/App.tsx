// src/App.tsx

import React, { Suspense } from "react";
// --- NOUVEAUX IMPORTS pour le routing ---
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AIChat } from '@/components/AIChat';

// UI Providers & Components
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop"; 

// Initialisation du client React Query
const queryClient = new QueryClient();

// --- Performance : Code-Splitting pour toutes les pages ---
const IndexPage = React.lazy(() => import("./pages/Index"));
const PrivacyPage = React.lazy(() => import("./pages/Privacy"));
const TermsPage = React.lazy(() => import("./pages/Terms"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const ArticlePage = React.lazy(() => import("./pages/ArticlePage"));
const DataDeletionPage = React.lazy(() => import('./pages/DataDeletionPage'));

// --- Import des nouvelles pages de produits ---
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));

// Composant de chargement pour le fallback de Suspense
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen bg-slate-900">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
  </div>
);

// Layout principal qui enveloppe toutes les pages
const RootLayout = () => {
  return (
    <>
      <ScrollToTop /> 
      <Navigation />
      <main>
        <Outlet /> {/* Les pages de routes enfants seront affichées ici */}
      </main>
      <Footer />
      <AIChat />
    </>
  );
};

// Configuration du routeur avec toutes les routes de l'application
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />, // Le layout s'applique à toutes les routes enfants
      children: [
        // Page d'accueil
        { index: true, element: <IndexPage /> },

        // Pages statiques
        { path: "privacy", element: <PrivacyPage /> },
        { path: "terms", element: <TermsPage /> },
        { path: "data-deletion", element: <DataDeletionPage /> },

        // Routes pour le Blog
        { path: "blog", element: <BlogPage /> },
        { path: "blog/:slug", element: <ArticlePage /> },

        // Routes pour les Produits
        { path: "produits", element: <ProductsPage /> },
        { path: "produits/:slug", element: <ProductDetailPage /> },

        // Route "Catch-all" pour les pages non trouvées (404)
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);

// Composant principal de l'application
const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;