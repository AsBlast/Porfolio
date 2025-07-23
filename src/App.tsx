import React, { Suspense } from "react";
// --- NOUVEAUX IMPORTS pour le routing ---
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// UI Providers & Components
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Initialisation du client React Query
const queryClient = new QueryClient();

// --- Performance : Code-Splitting ---
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

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />, 
      children: [ 
        { index: true, element: <IndexPage /> }, 
        { path: "privacy", element: <PrivacyPage /> },
        { path: "terms", element: <TermsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "blog/:slug", element: <ArticlePage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition : true
    },
  }
);


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