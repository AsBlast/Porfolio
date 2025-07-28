// src/pages/Index.tsx

import React, { Suspense, lazy, useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Link } from 'react-router-dom'; // <-- AJOUT DE LINK
import { ArrowRight } from "lucide-react"; // <-- AJOUT POUR L'ICÔNE DU BOUTON

// Composants
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
// Navigation n'a plus besoin d'être importé ici car il est dans le RootLayout

// --- CORRECTION : Suppression de l'import de l'ancien composant Product ---
// const Product = lazy(() => import('@/components/Product')); // <-- CETTE LIGNE EST SUPPRIMÉE

// Lazy loading pour les autres sections
const About = lazy(() => import('@/components/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/components/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('@/components/Contact').then(module => ({ default: module.Contact })));

// --- NOUVEAU COMPOSANT : Appel à l'action pour la boutique ---
const CtaShopSection = () => (
  <section id="shop-cta" className="py-20 md:py-32 bg-[#1A1F2C]"> {/* Changement de l'ID pour éviter les conflits */}
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
          to="/produits" // <-- Lien vers votre nouvelle page catalogue
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

  // Les hooks useEffect restent inchangés, ils sont corrects.
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
        <title>Brice Yakim | Développeur Web Full Stack à Madagascar | Portfolio AsBlast</title>
        <meta name="description" content="Portfolio de Brice Yakim, développeur web Full Stack créatif basé à Madagascar. Découvrez mes projets, compétences en React, Node.js, et ma passion pour les expériences digitales innovantes." />
        <link rel="canonical" href="https://asblast.space/" />
      </Helmet>
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className="min-h-screen bg-[#1A1F2C] text-white overflow-x-hidden">
          {/* La navigation est maintenant gérée par RootLayout, donc plus besoin de l'appeler ici */}
          <main>
            <section id="home" aria-labelledby="hero-heading"><Hero /></section>
            <Suspense fallback={<SectionLoader />}><section id="about" aria-labelledby="about-heading"><About /></section></Suspense>
            
            {/* --- CORRECTION : Remplacement de l'ancienne section produit --- */}
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