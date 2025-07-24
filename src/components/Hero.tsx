// src/components/Hero.tsx

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { AnimatedBackground } from "./AnimatedBackground"; 

import { ChevronDown, Github, Linkedin, Rocket, Coffee, MoonStar, Zap, Terminal } from "lucide-react";

export function Hero() {

  return (
    <header
      id="home"
      aria-labelledby="main-heading"
      className="min-h-screen flex flex-col items-center justify-center pt-28 relative overflow-hidden bg-black"
    >
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
        
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
            Apprenti développeur Full Stack
          </h2>

          <div className="text-xl md:text-2xl text-cyan-100/90 font-mono mb-8 max-w-2xl mx-auto min-h-[110px]">
            <TypeAnimation
              sequence={[
                'Codeur nocturne', 1500, (element) => { if(element) element.textContent = ''; },
                'Architecte d\'expériences digitales', 1500, (element) => { if(element) element.textContent = ''; },
                'Auto-formé à la lumière des écrans', 1500, (element) => { if(element) element.textContent = ''; },
              ]}
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
            <div className="flex flex-col items-center gap-4">
              <img src="/images/hostinger.png" alt="Logo Hostinger" width="128" height="45" className="rounded-md shadow-lg" loading="lazy" fetchpriority="auto" />
              <h3 id="affiliate-heading" className="text-2xl text-blue-500 font-bold">💡 Besoin d’un hébergeur web fiable ?</h3>
              <p className="text-gray-300">Hébergez votre site avec <strong>Hostinger</strong>, une solution abordable et performante pour les développeurs.</p>
              <motion.a href="https://hostinger.com?REFERRALCODE=W8MBRICEYA9R" target="_blank" rel="sponsored noopener noreferrer" whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-3 px-8 py-3 text-lg font-medium text-cyan-300 border border-cyan-400 rounded-lg hover:bg-cyan-950 hover:text-cyan-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]">Profitez de 20 % de réduction</motion.a>
            </div>
          </section>
          
          <a href="#about" className="mt-12 inline-flex items-center gap-2 px-8 py-3 bg-cyan-950 text-cyan-300 rounded-lg border border-cyan-500/50 hover:bg-cyan-900 transition-colors">
            En savoir plus 
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </a>
          
        </motion.div>
      </div>
    </header>
  );
}