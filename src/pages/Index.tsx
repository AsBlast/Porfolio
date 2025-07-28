// src/pages/Index.tsx

import React, { Suspense, lazy, useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Link } from 'react-router-dom'; 
import { ArrowRight } from "lucide-react"; 

// Composants
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";

// Lazy loading pour les autres sections
const About = lazy(() => import('@/components/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/components/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('@/components/Contact').then(module => ({ default: module.Contact })));

// --- Composant : Appel à l'action pour la boutique ---
const CtaShopSection = () => (
  <section id="shop-cta" className="py-20 md:py-32 bg-[#1A1F2C]">
    <div className="container mx-auto px-4 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        Explorez mes Outils & Templates
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-xl mx-auto text-lg text-white/70 mb-8"
      >
        Des ressources prêtes à l'emploi, conçues pour accélérer vos projets et vous faire gagner un temps précieux.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link 
          to="/produits"
          className="inline-flex items-center gap-3 px-8 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors shadow-lg shadow-[#D946EF]/20"
        >
          Visiter la boutique
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);


const SectionLoader = () => <div style={{ minHeight: '100vh', backgroundColor: '#1A1F2C' }} />;

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.state]);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isLoading]);

  return (
    <>
      <Helmet>
        {/* --- BALISES SEO MISES À JOUR --- */}
        <title>Brice Yakim AsBlast | Développeur Full Stack à Madagascar</title>
        <meta name="description" content="Portfolio de Brice Yakim, Développeur Full Stack à Madagascar. Spécialisé en React, Node.js et création d'expériences web interactives pour startups et PME." />
        <link rel="canonical" href="https://asblast.space/"/>
        
        {/* Open Graph (pour le partage sur les réseaux sociaux) */}
        <meta property="og:title" content="Brice Yakim AsBlast | Développeur Full Stack à Madagascar" />
        <meta property="og:description" content="Découvrez le portfolio et les projets de Brice Yakim, spécialiste en expériences digitales innovantes." />
        <meta property="og:image" content="https://asblast.space/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://asblast.space/" />
      </Helmet>
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className="min-h-screen bg-[#1A1F2C] text-white overflow-x-hidden">
          <main>
            <section id="home" aria-labelledby="hero-heading"><Hero /></section>
            <Suspense fallback={<SectionLoader />}><section id="about" aria-labelledby="about-heading"><About /></section></Suspense>
            <Suspense fallback={<SectionLoader />}>
              <CtaShopSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}><section id="projects" aria-labelledby="projects-heading"><Projects /></section></Suspense>
            <Suspense fallback={<SectionLoader />}><section id="contact" aria-labelledby="contact-heading"><Contact /></section></Suspense>
          </main>
        </div>
      </div>
      
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
    </>
  );
}