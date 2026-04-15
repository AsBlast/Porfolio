// src/components/Ventures.tsx

import { motion } from "framer-motion";
import { 
  Facebook, ArrowUpRight, ShoppingCart, 
  Zap, Database, Globe, Box, Rocket 
} from "lucide-react";
import type { Variants } from "framer-motion";

// --- Données Intégrales (Aucun retrait) ---
const ventures = [
  {
    title: "Félin Fashion Mada",
    description: "Boutique en ligne pionnière d'accessoires stylés pour chiens et chats à Madagascar, créant un pont digital avec une communauté Facebook de plus de 11k passionnés.",
    imageBase: "/images/felin-fashion",
    facebookLink: "https://web.facebook.com/profile.php?id=61555557527535",
    stack: ["React", "Boutique Facebook", "Meta API", "Community Management"],
    status: "En ligne sur Facebook",
    metrics: "11k+ Citoyens"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export function Ventures() {
  return (
    <section 
      id="ventures" 
      className="py-24 bg-space-950 relative overflow-hidden"
      aria-labelledby="ventures-heading"
    >
      {/* Effet de lueur d'arrière-plan */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-nebula/20 to-transparent"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* EN-TÊTE STYLE HUD */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nebula/10 border border-nebula/30 text-nebula text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Rocket size={12} /> <span>Active_Ventures</span>
          </motion.div>
          <motion.h2
            id="ventures-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase"
          >
            Mes Ventures <span className="text-nebula text-shadow-glow">Numériques</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          {ventures.map((venture) => (
            <motion.div
              key={venture.title}
              variants={itemVariants}
              className="group hud-glass flex flex-col lg:flex-row overflow-hidden border-white/5 hover:border-nebula/30 transition-all duration-500"
            >
              {/* --- 1. ZONE INFO (DÉTAILS TECHNIQUES) --- */}
              <div className="p-8 lg:p-12 lg:w-[60%] flex flex-col relative">
                {/* Ligne de scan verticale interne */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5"></div>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-3 py-1 bg-nebula text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                    {venture.status}
                  </span>
                  <div className="flex items-center gap-2 text-nebula/60 font-mono text-[10px] uppercase">
                    <Globe size={12} /> <span>Location: Madagascar</span>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-nebula transition-colors">
                  {venture.title}
                </h3>
                
                <p className="text-slate-400 font-mono text-sm leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
                  {venture.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                   {venture.stack.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 p-2 bg-space-950 border border-white/5 rounded-lg">
                       <Zap size={10} className="text-nebula" />
                       <span className="text-[10px] font-mono text-slate-300 uppercase">{tech}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-6">
                  <a 
                    href={venture.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hud-corners w-full sm:w-auto bg-blue-600 text-white px-8 py-4 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-lg"
                  >
                    <Facebook size={18} />
                    <span>Lancer la liaison Facebook</span>
                    <ArrowUpRight size={16} />
                  </a>
                  
                  <div className="flex items-center gap-3 font-mono text-nebula text-sm">
                    <Box size={18} />
                    <span className="animate-pulse">{venture.metrics}</span>
                  </div>
                </div>
              </div>
              
              {/* --- 2. ZONE VISUELLE (INTERFACE GRAPHIQUE) --- */}
              <div className="lg:w-[40%] bg-space-900/50 p-8 flex items-center justify-center relative overflow-hidden">
                {/* Grille technique en overlay sur l'image */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,10,0.8)_100%)] z-10"></div>
                
                <div className="relative w-full aspect-square max-w-[300px] z-0">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-nebula/20 border-dashed rounded-full"
                  ></motion.div>

                  <picture className="relative z-10 w-full h-full flex items-center justify-center p-8">
                    <source
                      type="image/webp"
                      srcSet={`
                        ${venture.imageBase}-small.webp 300w,
                        ${venture.imageBase}-medium.webp 600w,
                        ${venture.imageBase}-large.webp 1000w
                      `}
                      sizes="(max-width: 767px) 80vw, 400px"
                    />
                    <img 
                      src={`${venture.imageBase}-medium.webp`}
                      alt={venture.title} 
                      className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(217,70,239,0.3)] group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </picture>
                </div>
                
                {/* Indicateurs HUD sur l'image */}
                <div className="absolute top-4 right-4 font-mono text-[8px] text-white/20">
                  REF_001_MADA<br/>SEC_OPERATIONAL
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* FOOTER DE SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-nebula to-transparent"></div>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-slate-500">
            Scanning for more expansion opportunities...
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Ventures;