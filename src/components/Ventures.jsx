// src/components/Ventures.tsx

import { motion } from "framer-motion";
import { Facebook, ArrowUpRight } from "lucide-react";

// --- 1. MODIFICATION DE LA STRUCTURE DE DONNÉES ---
const ventures = [
  {
    title: "Félin Fashion Mada",
    description: "Boutique en ligne pionnière d'accessoires stylés pour chiens et chats à Madagascar, créant un pont digital avec une communauté Facebook de plus de 10k passionnés.",
    imageBase: "/images/felin-fashion",
    facebookLink: "https://web.facebook.com/profile.php?id=61555557527535",
    stack: ["React", "Boutique Facebook", "Meta API", "Community Management"],
    status: "En ligne sur Facebook" 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function Ventures() {
  return (
    <section 
      id="ventures" 
      className="py-16 md:py-24 bg-gradient-to-b from-[#100a1c] to-[#0a0f1f]"
      aria-labelledby="ventures-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
       <motion.h2
          id="ventures-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        >
          Mes Ventures Numériques
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
          className="grid gap-10 max-w-5xl mx-auto"
        >
          {ventures.map((venture) => (
            <motion.div
              key={venture.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(217, 70, 239, 0.25)",
                transition: { duration: 0.4, ease: "easeInOut" } 
              }}
              className="bg-gradient-to-br from-[#1e1b4b] to-[#172554] rounded-2xl border border-purple-500/30 group overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/30 relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(217,70,239,0.15)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-6 md:p-8 flex flex-col md:w-[58%] relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    venture.status === 'En ligne sur Facebook' 
                      ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.3)]' 
                      : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300'
                  }`}>
                    {venture.status}
                  </span>
                  <div className="h-px flex-grow bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-transparent"></div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                  {venture.title}
                </h3>
                
                <p className="text-purple-200/80 mb-6 flex-grow text-lg leading-relaxed">
                  {venture.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {venture.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-purple-900/40 text-purple-200 text-sm rounded-lg border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <a 
                    href={venture.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-3 rounded-lg border border-blue-400/50 shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all transform hover:scale-105"
                    aria-label={`Découvrir et commander sur la page Facebook de ${venture.title}`}
                  >
                    <Facebook size={20} />
                    <span>Découvrir & Commander sur Facebook</span>
                    <ArrowUpRight size={18} className="hidden sm:inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
              
              {/* --- 2. LA CORRECTION POUR L'OPTIMISATION DE L'IMAGE --- */}
              <div className="md:w-[42%] flex-shrink-0 bg-black/30 p-4 flex items-center justify-center relative overflow-hidden">
                <div className="relative w-full h-64 md:h-full">

                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`
                        ${venture.imageBase}-small.webp 300w,
                        ${venture.imageBase}-medium.webp 600w,
                        ${venture.imageBase}-large.webp 1000w
                      `}
                      sizes="(max-width: 767px) 90vw, 500px"
                    />
                    <img 
                      src={`${venture.imageBase}-medium.webp`}
                      alt={`Logo de ${venture.title}`} 
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                      width="600"
                      height="600"
                    />
                  </picture>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-purple-500/20 rounded-xl pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
       <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-purple-300 text-lg font-medium">
            Et ce n'est que le début...
          </p>
        </motion.div>
      </div>
    </section>
  );
}