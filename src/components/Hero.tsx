import { motion } from "framer-motion";
import { ChevronDown, Terminal, Github, Linkedin, Rocket, Coffee, MoonStar, Zap } from "lucide-react";

export function Hero() {
  return (
    <header 
      id="home"
      aria-labelledby="main-heading" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Grille et dégradés (inchangés) */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(transparent_1px,_#000_1px),_linear-gradient(90deg,transparent_1px,_#000_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,_#000_70%,transparent_100%)] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      {/* --- PERFORMANCE : Image de fond chargée via une balise <img> dans une <picture> --- */}
      {/* Cela permet un chargement prioritaire et l'utilisation de formats modernes. Visuellement identique. */}
      <div className="absolute inset-0 z-0 opacity-5 mix-blend-color-dodge">
        <picture>
         
          {/* <source srcSet="/photo-1526374965328-7f61d4dc18c5.avif" type="image/avif" /> */}
          <source srcSet="/photo-1526374965328-7f61d4dc18c5.webp" type="image/webp" />
          <img
            src="/photo-1526374965328-7f61d4dc18c5.jpg" // L'image fallback, assurez-vous que c'est un .jpg ou .png
            alt="Arrière-plan abstrait de code informatique"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </picture>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Icône animée (inchangée) */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ boxShadow: ["0 0 20px #0ff", "0 0 40px #f0f", "0 0 20px #0ff"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full p-4 bg-black/50 backdrop-blur-sm"
            >
              <Terminal className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </div>

          {/* Nom avec dégradé et ombre (ajout de l'id pour aria-labelledby) */}
          <h1 id="main-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Brice Yakim AsBlast
            </span>
          </h1>

          {/* Sous-titre */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            Apprenti développeur Full Stack
          </h2>

          {/* Paragraphe avec icônes animées  */}
          <motion.div
            className="text-xl md:text-2xl text-cyan-100 opacity-95 mb-8 max-w-2xl mx-auto font-mono flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
             <p>Codeur nocturne & Architecte d'expériences digitales.</p>
             <p>Auto-formé à la lumière des écrans</p>
            <div className="flex items-center gap-3 mb-3">
              <motion.div animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}><MoonStar className="text-purple-400" /></motion.div> +
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}><Coffee className="text-amber-400" /></motion.div> +
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><Zap className="text-yellow-400" /></motion.div> =
               <Rocket className="text-pink-500 animate-pulse" />
            </div>
          </motion.div>

          {/* --- A11Y Corrigé : Réseaux sociaux avec aria-label --- */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { platform: "GitHub", url: "https://github.com/AsBlast", icon: <Github className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" /> },
              { platform: "LinkedIn", url: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200", icon: <Linkedin className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" /> },
            ].map(({ platform, url, icon }) => (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visiter mon profil ${platform}`} // Ajout de l'aria-label
                whileHover={{ scale: 1.1, rotate: platform === "GitHub" ? 15 : -15, boxShadow: "0 0 15px rgba(34,211,238,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-gradient-to-br from-black/30 to-cyan-900/20 backdrop-blur-lg border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group relative overflow-hidden"
              >
                {icon}
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%50%,rgba(34,211,238,0.2)_0%,rgba(34,211,238,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 animate-spin-slow [mask-image:linear-gradient(transparent,rgba(0,0,0,0.3))]">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(34,211,238,0.2)_0%,rgba(34,211,238,0)_100%)]" />
                </span>
              </motion.a>
            ))}
          </div>

          {/* Bannière flottante */}
          <section 
            aria-labelledby="affiliate-banner-title"
            className="floating-banner p-6 bg-black/80 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] max-w-md mx-auto text-center transform transition-all hover:scale-105 duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              
              <img
                src="/images/hostinger.png"
                alt="Hostinger Logo"
                width="128" 
                height="45" 
                className="w-32 h-auto rounded-md shadow-lg"
                loading="eager" // Important : JAMAIS 'lazy' pour le contenu LCP
                fetchPriority="high"
              />
              
            
              <h3 id="affiliate-banner-title" className="text-2xl text-blue-500 font-bold">💡 Besoin d’un hébergeur web fiable et rapide ?</h3>
              <p className="text-gray-300">
                Hébergez votre site avec <strong>Hostinger</strong>, une solution abordable, performante et idéale pour les développeurs.
              </p>
              
              {/* --- SEO Corrigé : Lien d'affiliation --- */}
              <motion.a
                href="https://hostinger.com?REFERRALCODE=W8MBRICEYA9R"
                target="_blank"
                rel="sponsored noopener noreferrer" // Ajout de 'sponsored'
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-8 py-3 text-lg font-medium text-cyan-300 border border-cyan-400 rounded-lg hover:bg-cyan-950 hover:text-cyan-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
              >
                Profitez de 20 % de réduction
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
              </motion.a>
            </div>
          </section>

          <br />

          {/* Bouton "En savoir plus" et flèche animée */}
          <motion.div className="flex flex-col items-center gap-8">
            <motion.a href="#about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-950 text-cyan-300 rounded-lg border border-cyan-500/50 hover:bg-cyan-900 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]">
              En savoir plus
            </motion.a>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="text-cyan-400/50 w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}