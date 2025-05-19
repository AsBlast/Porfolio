import { motion } from "framer-motion";
import { Github, Linkedin,  Facebook } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "Github", icon: <Github size={20} />, href: "https://github.com/bricedev" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com/in/bricedev" },
    
    { name: "Facebook", icon: <Facebook size={20} />, href: "https://facebook.com/bricedev" }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-purple-900/80 to-blue-900/80 backdrop-blur-sm w-full border-t border-cyan-500/20 text-cyan-300/80">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Logo & Slogan */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(0,255,255,0.7)] mb-4"
            >
              Brice-Dev
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-cyan-300/80 font-mono"
            >
              Développement web & solutions digitales sur mesure
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold text-xl mb-6 text-violet-400 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
            >
              Navigation rapide
            </motion.h3>
            <ul className="grid grid-cols-2 gap-4">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (navItems.indexOf(item) * 0.05) }}
                >
                  <a
                    href={item.href}
                    className="hover:text-cyan-300 transition-colors flex items-center group"
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 transition-all ${
                        hovered === item.name
                          ? "bg-gradient-to-r from-cyan-400 to-pink-500 shadow-[0_0_8px_rgba(0,255,255,0.7)]"
                          : "bg-cyan-500/30"
                      }`}
                    />
                    <span className="font-mono text-lg">{item.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center space-x-6 mt-12"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-cyan-900/60 via-purple-900/60 to-pink-900/60 w-12 h-12 rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-400 hover:shadow-[0_0_16px_rgba(0,255,255,0.7)] transition-all"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center text-sm text-cyan-300/60 mt-12 pt-6 border-t border-cyan-500/20"
        >
          © {new Date().getFullYear()} Brice-Dev. Tous droits réservés.
        </motion.div>
      </div>
    </footer>
  );
}
