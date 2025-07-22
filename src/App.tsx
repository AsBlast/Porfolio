import React, { Suspense, useEffect } from "react"; // --- NOUVEAU : import de useEffect ---
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// UI Providers & Components
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Initialisation du client React Query (singleton)
const queryClient = new QueryClient();

// --- Performance : Code-Splitting avec React.lazy ---
const IndexPage = React.lazy(() => import("./pages/Index"));
const PrivacyPage = React.lazy(() => import("./pages/Privacy"));
const TermsPage = React.lazy(() => import("./pages/Terms"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const ArticlePage = React.lazy(() => import("./pages/ArticlePage"));

// Composant de chargement pour le fallback de Suspense
const PageLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#1A1F2C", color: "white", fontFamily: "sans-serif" }}>
    Chargement ...
  </div>
);

const App = () => {
  useEffect(() => {
    // Vérifie si la fonctionnalité existe dans le navigateur
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []); 

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Navigation />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<ArticlePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;