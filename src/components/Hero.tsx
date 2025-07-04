import { motion } from "framer-motion";
import { ChevronDown, Terminal, Github, Linkedin, Rocket, Coffee, MoonStar, Zap } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Grille subtile en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_#000_1px),_linear-gradient(90deg,transparent_1px,_#000_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,_#000_70%,transparent_100%)] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      {/* Image de fond optimisée */}
      <div
        className="absolute inset-0 bg-[url('/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-5 mix-blend-color-dodge"
        style={{ willChange: "opacity, transform" }}
      />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Icône animée */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                boxShadow: ["0 0 20px #0ff", "0 0 40px #f0f", "0 0 20px #0ff"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full p-4 bg-black/50 backdrop-blur-sm"
            >
              <Terminal className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </div>

          {/* Nom avec dégradé et ombre */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Brice Yakim AsBlast
            </span>
          </h1>

          {/* Sous-titre */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            Apprenti développeur Full Stack
          </h2>

          {/* Paragraphe principal optimisé pour LCP */}
           {/* Paragraphe avec icônes animées */}
          <motion.div
            className="text-xl md:text-2xl text-cyan-100 opacity-95 mb-8 max-w-2xl mx-auto font-mono flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
             <p>Codeur nocturne & Architecte d'expériences digitales.</p>
              <p>Auto-formé à la lumière des écrans</p>
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <MoonStar className="text-purple-400" />
              </motion.div> +
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coffee className="text-amber-400" /> 
              </motion.div> +
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="text-yellow-400" />
              </motion.div> =
               <Rocket className="text-pink-500 animate-pulse" />
            </div>
            
           
           
            
           
          </motion.div>
          {/* Réseaux sociaux avec animations */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              {
                platform: "github",
                url: "https://github.com/AsBlast",
                icon: <Github className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />,
              },
              {
                platform: "linkedin",
                url: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200",
                icon: <Linkedin className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />,
              },
            ].map(({ platform, url, icon }) => (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.1,
                  rotate: platform === "github" ? 15 : -15,
                  boxShadow: "0 0 15px rgba(34,211,238,0.4)",
                }}
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

          {/* Bannière flottante avec call-to-action */}
          <div className="floating-banner p-6 bg-black/80 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] max-w-md mx-auto text-center transform transition-all hover:scale-105 duration-300">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/images/hostinger.png"
                alt="Hostinger Logo"
                className="w-32 h-auto rounded-md shadow-lg"
                loading="lazy"
              />

              <span className="text-2xl text-blue-500">💡 Besoin d’un hébergeur web fiable et rapide ?</span>
              <p className="text-gray-300">
                Hébergez votre site avec <strong>Hostinger</strong>, une solution abordable, performante et idéale pour les développeurs.
              </p>
              <motion.a
                href="https://hostinger.com?REFERRALCODE=W8MBRICEYA9R"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-8 py-3 text-lg font-medium text-cyan-300 border border-cyan-400 rounded-lg hover:bg-cyan-950 hover:text-cyan-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
              >
                Profitez de 20 % de réduction
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </motion.a>
            </div>
          </div>

          <br />

          {/* Bouton "En savoir plus" et flèche animée */}
          <motion.div className="flex flex-col items-center gap-8">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-950 text-cyan-300 rounded-lg border border-cyan-500/50 hover:bg-cyan-900 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
            >
              En savoir plus
            </motion.a>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="text-cyan-400/50 w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
