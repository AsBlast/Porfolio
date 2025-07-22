import React, { Suspense, lazy, useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from 'react-router-dom';

// Composants
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";

// Lazy loading
const About = lazy(() => import('@/components/About').then(module => ({ default: module.About })));
const Product = lazy(() => import('@/components/Product'));
const Projects = lazy(() => import('@/components/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('@/components/Contact').then(module => ({ default: module.Contact })));

const SectionLoader = () => <div style={{ minHeight: '100vh', backgroundColor: '#1A1F2C' }} />;

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Affiche le loader pour une durée minimale pour l'esthétique
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Vous pouvez ajuster cette durée (ex: 1.5s)

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

  // Gère le scroll du body en fonction de l'état de chargement
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Nettoyage au cas où le composant est démonté
    return () => { document.body.style.overflow = 'auto'; };
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <title>Brice Yakim | Développeur Web Full Stack à Madagascar | Portfolio AsBlast</title>
        <meta name="description" content="Portfolio de Brice Yakim, développeur web Full Stack créatif basé à Madagascar. Découvrez mes projets, compétences en React, Node.js, et ma passion pour les expériences digitales innovantes." />
        <link rel="canonical" href="https://asblast.space/" />
      </Helmet>

      {/* --- SOLUTION FINALE SANS FLASH --- */}
      
      {/* 1. Le contenu principal est toujours rendu, mais caché initialement */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className="min-h-screen bg-[#1A1F2C] text-white overflow-x-hidden">
          <Navigation />
          <main>
            <section id="home" aria-labelledby="hero-heading"><Hero /></section>
            <Suspense fallback={<SectionLoader />}><section id="about" aria-labelledby="about-heading"><About /></section></Suspense>
            <Suspense fallback={<SectionLoader />}><section id="products" aria-labelledby="products-heading"><Product /></section></Suspense>
            <Suspense fallback={<SectionLoader />}><section id="projects" aria-labelledby="projects-heading"><Projects /></section></Suspense>
            <Suspense fallback={<SectionLoader />}><section id="contact" aria-labelledby="contact-heading"><Contact /></section></Suspense>
          </main>
        </div>
      </div>
      
      {/* 2. Le LoadingScreen est géré par AnimatePresence par-dessus tout */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
    </>
  );
}