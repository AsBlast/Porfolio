import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Footer } from "@/components/Footer";
import AdSenseMeta from "./AdSenseMeta"; // ajustez le chemin selon votre arborescence
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import React, { Suspense } from 'react';

const queryClient = new QueryClient();
// const HeavyComponent = React.lazy(() => import('./components/HeavyComponent'));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdSenseMeta />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
