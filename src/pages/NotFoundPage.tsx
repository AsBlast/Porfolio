import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

// Composants partagés
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function NotFoundPage() {

  // S'assure que la page s'affiche en haut
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>404 - Page non trouvée | Brice-Dev Portfolio</title>
        <meta name="description" content="La page que vous recherchez n'a pas pu être trouvée. Retournez à l'accueil pour explorer mes projets." />
      </Helmet>

      {/* Maintenir la cohérence visuelle avec la Navigation et le Footer */}
      <Navigation />
      
      <main className="min-h-screen bg-[#1A1F2C] text-white flex items-center justify-center px-4 pt-24 pb-12">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
          >
            <Search className="w-24 h-24 mx-auto text-[#D946EF]/30 mb-8" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-white mb-8"
          >
            Oups ! Cette page s'est perdue dans le cyberespace.
          </motion.p>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-white/70 max-w-lg mx-auto mb-12"
          >
            Il semble que le lien que vous avez suivi est incorrect ou que la page a été déplacée.
            Pas de panique, voici comment retrouver votre chemin.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Retourner à l'accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white/10 rounded-lg text-white/80 font-semibold hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}