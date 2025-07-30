// src/components/Hero.tsx

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { AnimatedBackground } from "./AnimatedBackground"; 
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { ChevronDown, Github, Linkedin, Rocket, Coffee, MoonStar, Zap, Terminal } from "lucide-react";

export function Hero() {
  const { t, i18n } = useTranslation(); 

  const typingSequence = useMemo(() => {
    const phrases = t('hero_typing_sequence', { returnObjects: true }) as string[];
    return phrases.flatMap(phrase => [
      phrase,
      1500,
      (el: HTMLElement | null) => { if (el) el.textContent = ''; }
    ]);
  }, [t]);

  return (
    <header
      id="home"
      aria-labelledby="main-heading"
      className="min-h-screen flex flex-col items-center justify-center pt-28 relative overflow-hidden"
    >
      <AnimatedBackground />
      
<div className="container mx-auto px-4 relative z-40 flex flex-col items-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
            >
              <Terminal className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </div>

          <h1 id="main-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Brice Yakim AsBlast
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            {t('hero_job_title')}
          </h2>

          <div className="text-xl md:text-2xl text-cyan-100/90 font-mono mb-8 max-w-2xl mx-auto min-h-[110px] sm:min-h-[80px]">
            <TypeAnimation
              key={i18n.language} 
              sequence={typingSequence}
              wrapper="p" speed={50} cursor={true} className="mb-4" repeat={Infinity}
            />
            <motion.div 
              className="flex items-center justify-center gap-3 text-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            >
              <motion.div animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}><MoonStar className="text-purple-400" /></motion.div>
              <span>+</span>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}><Coffee className="text-amber-400" /></motion.div>
              <span>+</span>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.4 }}><Zap className="text-yellow-400" /></motion.div>
              <span>=</span>
              <Rocket className="text-pink-500 animate-pulse" />
            </motion.div>
          </div>
            
          <div className="flex justify-center gap-4 mb-12">
            {[ { platform: "GitHub", url: "https://github.com/AsBlast", icon: <Github size={24} /> }, { platform: "LinkedIn", url: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200", icon: <Linkedin size={24} /> }, ].map(({ platform, url, icon }) => (
              <motion.a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visiter mon profil ${platform}`} whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(34,211,238,0.4)" }} whileTap={{ scale: 0.95 }} className="p-3 rounded-full bg-black/30 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-colors">{icon}</motion.a>
            ))}
          </div>

          <section aria-labelledby="affiliate-heading" className="floating-banner p-6 bg-black/80 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] max-w-md mx-auto transform transition-all hover:scale-105 duration-300">
            <div className="flex flex-col items-center text-center gap-4">
              <picture>
                <source type="image/webp" srcSet="/images/hostinger-small.webp 1x, /images/hostinger-large.webp 2x" />
                <img src="/images/hostinger.webp" alt="Logo Hostinger" width="128" height="45" className="rounded-md shadow-lg" loading="lazy" />
              </picture>
              <h3 id="affiliate-heading" className="text-2xl text-cyan-400 font-bold">{t('affiliate_title')}</h3>
              <p className="text-gray-300">{t('affiliate_description')}</p>
              <motion.a href="https://hostinger.com?REFERRALCODE=W8MBRICEYA9R" target="_blank" rel="sponsored noopener noreferrer" whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-3 px-8 py-3 text-lg font-medium text-cyan-300 border border-cyan-400 rounded-lg hover:bg-cyan-950 hover:text-cyan-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]">{t('affiliate_button')}</motion.a>
              <p className="text-xs text-gray-400/80 italic mt-2">{t('affiliate_disclaimer')}</p>
            </div>
          </section>
          
          <motion.a href="#about" aria-label={t('hero_scroll_button_aria')} className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 mt-12 text-lg font-bold text-white rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 transition-all duration-300 ease-in-out" whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(107, 229, 255, 0.6)"}} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <span className="absolute inset-0 w-full h-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{t('hero_scroll_button')}</span>
            <motion.div className="relative z-10" animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.a>
          
        </motion.div>
      </div>
    </header>
  );
}