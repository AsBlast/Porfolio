// src/components/Hero.tsx

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { AnimatedBackground } from "./AnimatedBackground"; 
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ChevronDown, Github, Linkedin, Rocket, Coffee, MoonStar, Zap, Terminal, Activity, Globe } from "lucide-react";

export function Hero() {
  const { t, i18n } = useTranslation(); 

  const typingSequence = useMemo(() => {
    const phrases = t('hero_typing_sequence', { returnObjects: true }) as string[];
    if (!Array.isArray(phrases)) return ["Developer", 1500];
    return phrases.flatMap(phrase => [phrase, 1500]);
  }, [t]);

  return (
    <header id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />

      {/* --- HUD DECORATIONS (Les éléments techniques sur les côtés) --- */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Ligne latérale gauche */}
        <div className="absolute left-10 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-quantum/20 to-transparent">
            <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-2 h-10 bg-quantum/40 -left-[3px] absolute blur-sm" />
        </div>
        {/* Coordonnées techniques */}
        <div className="absolute left-14 top-1/3 font-mono text-[10px] text-quantum/30 space-y-2 uppercase tracking-tighter">
          <p>Sector: 7G-Madagascar</p>
          <p>Lat: 18.8792° S</p>
          <p>Long: 47.5079° E</p>
          <div className="flex items-center gap-2 mt-4">
            <Activity size={12} className="text-quantum animate-pulse" />
            <span className="animate-pulse">System: Nominal</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }} 
          className="text-center w-full max-w-4xl"
        >
          {/* Badge Terminal Futuriste */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-quantum rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border border-dashed border-quantum/30 rounded-full"
              />
              <div className="relative p-6 bg-space-950/80 backdrop-blur-xl border border-quantum/40 rounded-full shadow-neon-cyan">
                <Terminal className="w-12 h-12 md:w-16 md:h-16 text-quantum" />
              </div>
            </div>
          </div>

          {/* Titre avec effet de lueur */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter uppercase italic">
            <span className="bg-gradient-to-r from-white via-quantum to-quantum/50 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              Brice Yakim AsBlast
            </span>
          </h1>

          <h2 className="text-xl md:text-3xl font-mono text-quantum/80 mb-8 tracking-widest uppercase">
            &lt; {t('hero_job_title')} /&gt;
          </h2>

          {/* Séquence de texte */}
          <div className="text-lg md:text-2xl text-slate-400 font-mono mb-12 h-12">
            <TypeAnimation
              key={i18n.language} 
              sequence={typingSequence}
              wrapper="p" 
              speed={50} 
              repeat={Infinity}
            />
          </div>

          {/* Boutons d'action style HUD */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a 
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hud-corners relative px-10 py-4 bg-quantum text-space-950 font-black uppercase tracking-tighter transition-all hover:shadow-neon-cyan"
            >
              Initier la mission
            </motion.a>
            
            <div className="flex gap-4">
              <SocialIcon href="https://github.com/AsBlast" icon={<Github size={20} />} label="GitHub" />
              <SocialIcon href="https://linkedin.com/..." icon={<Linkedin size={20} />} label="LinkedIn" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de Scroll style Radar */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-quantum/50">Scroll to Explore</span>
        <ChevronDown className="text-quantum" />
      </motion.div>
    </header>
  );
}

function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <motion.a 
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      whileHover={{ y: -3, color: "#22d3ee" }}
      className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-colors"
    >
      {icon}
    </motion.a>
  );
}