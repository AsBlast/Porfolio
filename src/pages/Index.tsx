// src/pages/Index.tsx

import { Suspense, lazy, useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Link } from 'react-router-dom'; 
import { ArrowRight, Store, Layers } from "lucide-react"; 

// Composants critiques (chargés immédiatement)
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";

// Sections lourdes (chargées en arrière-plan)
const About = lazy(() => import('@/components/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/components/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('@/components/Contact').then(module => ({ default: module.Contact })));
const Ventures = lazy(() => import('@/components/Ventures').then(module => ({ default: module.Ventures })));

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // On simule le temps de boot de l'OS (2.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  // Gestion du scroll fluide vers une section
  useEffect(() => {
    if (!isLoading && location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [isLoading, location.state]);

  return (
    <>
      <Helmet>
        <title>Brice Yakim AsBlast | Architecte de Solutions Augmentées par l'IA</title>
        <meta name="description" content="Découvrez le portfolio d'AsBlast, expert en solutions IA et architectures web futuristes." />
      </Helmet>
      
      {/* 
          STRATÉGIE ANTI-DOUBLE CHARGEMENT : 
          Le contenu est TOUJOURS présent mais caché par l'opacité au début.
          Le LoadingScreen est un overlay fixe (z-index 100).
      */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="min-h-screen bg-background text-foreground overflow-x-hidden relative"
      >
        <main>
          {/* Le Hero est le premier élément visible après le boot */}
          <section id="home">
            <Hero />
          </section>
          
          {/* 
              Suspense local : On utilise un fallback vide (h-screen) pour ne pas 
              déclencher le chargeur de route global de App.tsx 
          */}
          <Suspense fallback={<div className="h-screen bg-space-950" />}>
            <About />
            <Projects />
            <Ventures />
            
            {/* --- UNITÉ DE DISTRIBUTION (CTA BOUTIQUE) --- */}
            <section id="shop-cta" className="py-24 bg-space-950 relative overflow-hidden">
              {/* Décoration : Ligne d'horizon lumineuse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-quantum/30 to-transparent" />
              
              <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto p-12 hud-glass rounded-3xl border-quantum/20"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-quantum/10 rounded-2xl text-quantum animate-pulse shadow-neon-cyan/20">
                      <Store size={32} />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
                    Accès aux <span className="text-quantum">Modules Tech</span>
                  </h2>
                  <p className="text-slate-400 font-mono text-lg mb-10 leading-relaxed text-balance">
                    Optimisez vos cycles de développement avec nos ressources de grade orbital. Systèmes prêts pour intégration immédiate.
                  </p>
                  <Link 
                    to="/produits"
                    className="hud-corners inline-flex items-center gap-4 px-10 py-5 bg-quantum text-space-950 font-black uppercase tracking-[0.2em] hover:shadow-neon-cyan transition-all"
                  >
                    Initialiser le catalogue
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
            </section>

            <Contact />
          </Suspense>
        </main>
      </motion.div>

      {/* 
          OVERLAY DE CHARGEMENT :
          Il reste au-dessus de tout tant que isLoading est vrai.
      */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="global-loader" />
        )}
      </AnimatePresence>
    </>
  );
}