// src/components/Hero.tsx

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { AnimatedBackground } from "./AnimatedBackground"; 
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ChevronDown, Github, Linkedin, Rocket, Coffee, MoonStar, Zap, Terminal } from "lucide-react";

// Logo SVG de Systeme.io corrigé : version texte vectoriel stable
const SystemeIoLogo = () => (
  <svg 
    viewBox="0 0 180 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-36 md:w-44 h-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
    role="img"
    aria-label="Logo Systeme.io"
  >
    <text 
      x="50%" // Centrage horizontal
      y="65%" // Centrage vertical
      dominantBaseline="middle"
      textAnchor="middle" // Aligne le milieu du texte sur le milieu du SVG
      fill="white" 
      style={{ 
        fontFamily: 'Inter, system-ui, sans-serif', 
        fontWeight: '800', 
        fontSize: '24px',
        letterSpacing: '-0.05em' 
      }}
    >
      systeme<tspan fill="#22d3ee">.io</tspan>
    </text>
  </svg>
);

export function Hero() {
  const { t, i18n } = useTranslation(); 

  const typingSequence = useMemo(() => {
    const phrases = t('hero_typing_sequence', { returnObjects: true }) as string[];
    if (!Array.isArray(phrases)) return ["Developer", 1500];
    return phrases.flatMap(phrase => [phrase, 1500]);
  }, [t]);

  return (
    <header
      id="home"
      aria-labelledby="main-heading"
      className="min-h-screen flex flex-col items-center justify-center pt-20 relative overflow-hidden"
    >
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-40 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center w-full max-w-4xl"
        >
          {/* Badge Terminal */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            >
              <Terminal className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" />
            </motion.div>
          </div>

          <h1 id="main-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Brice Yakim AsBlast
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-cyan-300/90">
            {t('hero_job_title')}
          </h2>

          <div className="text-lg md:text-2xl text-cyan-100/90 font-mono mb-8 max-w-2xl mx-auto min-h-[120px]">
            <TypeAnimation
              key={i18n.language} 
              sequence={typingSequence}
              wrapper="p" 
              speed={50} 
              cursor={true} 
              className="mb-6 h-8" 
              repeat={Infinity}
            />
            
            <motion.div 
              className="flex items-center justify-center gap-4 text-2xl md:text-3xl"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8, duration: 1 }}
            >
              <motion.div animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}><MoonStar className="text-purple-400" /></motion.div>
              <span className="text-cyan-500/50">+</span>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}><Coffee className="text-amber-400" /></motion.div>
              <span className="text-cyan-500/50">+</span>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><Zap className="text-yellow-400" /></motion.div>
              <span className="text-cyan-500/50">=</span>
              <Rocket className="text-pink-500 animate-pulse" />
            </motion.div>
          </div>
            
          {/* Social Links */}
          <div className="flex justify-center gap-5 mb-10">
            {[ 
              { platform: "GitHub", url: "https://github.com/AsBlast", icon: <Github size={22} /> }, 
              { platform: "LinkedIn", url: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200", icon: <Linkedin size={22} /> }
            ].map(({ platform, url, icon }) => (
              <motion.a 
                key={platform} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visiter mon profil ${platform}`} 
                whileHover={{ scale: 1.1, y: -2, backgroundColor: "rgba(34,211,238,0.1)" }} 
                whileTap={{ scale: 0.95 }} 
                className="p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Section Affiliation  */}
          <section className="p-6 bg-black/80 backdrop-blur-md rounded-2xl border border-cyan-500/20 shadow-2xl max-w-md mx-auto transform transition-all hover:border-cyan-500/40 duration-500">
  <div className="flex flex-col items-center text-center"> {/* Force le centrage de tous les enfants */}
    
    {/* Conteneur du Logo  */}
    <div className="flex justify-center items-center py-2 px-6 bg-slate-900/50 rounded-xl border border-white/5 mb-4">
      <SystemeIoLogo />
    </div>

    <div className="space-y-2 flex flex-col items-center">
      <h3 id="affiliate-heading" className="text-xl md:text-2xl text-cyan-400 font-bold tracking-tight flex items-center justify-center gap-2">
        {t('affiliate_io_title')}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed max-w-[300px]">
        {t('affiliate_io_description')}
      </p>
    </div>

    {/* Bouton centré par w-full ou mx-auto */}
    <motion.a 
      href="https://systeme.io/fr?sa=sa0022198814097ccfbed4310ab271748ad1333063" 
      target="_blank" 
      rel="sponsored noopener noreferrer" 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }}
      className="w-full mt-5 py-3 text-base font-bold text-cyan-900 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
    >
      {t('affiliate_io_button')}
    </motion.a>

    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mt-4">
      {t('affiliate_io_disclaimer')}
    </p>
  </div>
</section>

          
          {/* Scroll Button */}
          <motion.a 
            href="#about" 
            aria-label={t('hero_scroll_button_aria')} 
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 mt-12 text-lg font-bold text-white rounded-full overflow-hidden bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 transition-all duration-300 shadow-lg" 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(107, 229, 255, 0.4)"}} 
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10">{t('hero_scroll_button')}</span>
            <motion.div 
              className="relative z-10" 
              animate={{ y: [0, 4, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-cyan-300" />
            </motion.div>
          </motion.a>
          
        </motion.div>
      </div>
    </header>
  );
}