// src/components/Footer.tsx

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Rocket, Code2, Sparkles } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const addFooterStyles = () => {
  if (!document.getElementById('footer-styles')) {
    const style = document.createElement('style');
    style.id = 'footer-styles';
    style.innerHTML = `
      .footer-aurora::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(transparent 1px, rgba(56, 189, 248, 0.05) 1px), linear-gradient(90deg, transparent 1px, rgba(56, 189, 248, 0.05) 1px);
        background-size: 25px 25px;
        z-index: 2;
        mask-image: linear-gradient(to top, black 50%, transparent 100%);
      }
    `;
    document.head.appendChild(style);
  }
};


export function Footer() {
  addFooterStyles();

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Accueil", href: "#home" }, { name: "A propos", href: "#about" },
    { name: "Produits", href: "#products" }, { name: "Projets", href: "#projects" },
    { name: "Blog", href: "/blog" }, { name: "Contact", href: "#contact" }
  ];
  const legalPages = [
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Mentions légales", href: "/terms" },
  ];
  const socialLinks = [
    { name: "Github", icon: <Github size={24} />, href: "https://github.com/AsBlast" },
    { name: "LinkedIn", icon: <Linkedin size={24} />, href: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200" },
    { name: "Facebook", icon: <Facebook size={24} />, href: "https://facebook.com/" }
  ];

  const handleFooterLinkClick = (href: string) => {
    if (href.startsWith('/')) navigate(href);
    else if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      if (location.pathname === '/') document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      else navigate('/', { state: { scrollToSection: sectionId } });
    }
  };

  const glassCardStyle = "bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-2xl";

  return (
    <footer className="footer-aurora relative bg-black w-full border-t border-cyan-500/20 overflow-hidden">
      <div 
        className="absolute inset-0 z-[1] opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 189, 248, 0.3), transparent), radial-gradient(ellipse 80% 50% at 50% 120%, rgba(217, 70, 239, 0.3), transparent)',
          backgroundSize: '200% 200%',
          animation: 'aurora 20s linear infinite'
        }}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10 space-y-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`${glassCardStyle} p-8 space-y-6 flex flex-col justify-center`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#D946EF]/10 rounded-xl"><Code2 className="w-8 h-8 text-[#D946EF]" /></div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Brice-Dev</span>
            </div>
            <p className="text-lg text-slate-300 font-mono flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />Créer l'excellence numérique
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className={`${glassCardStyle} lg:col-span-2 p-8`}>
            <h3 className="text-xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Explorez l'univers</h3>
            <nav aria-label="Navigation du pied de page">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                {navItems.map((item) => (
                  <div key={item.name} className="group">
                    <button
                      onClick={() => handleFooterLinkClick(item.href)}
                      className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-mono py-2 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full transition-all bg-cyan-500/30 group-hover:bg-[#D946EF] group-hover:shadow-glow-purple" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </nav>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-col items-center gap-8 py-8">
          <div className="flex gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Visiter mon profil ${link.name}`}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700/70 transition-all text-slate-300 hover:text-[#D946EF]"
                animate={{ y: [0, -4, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <motion.button onClick={() => handleFooterLinkClick('#home')} className="group relative inline-flex items-center gap-3 px-6 py-3 text-slate-200 cursor-pointer font-mono border-2 border-cyan-500/30 rounded-full hover:border-cyan-400/80 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 shadow-glow-cyan" />
            <Rocket className="relative w-6 h-6 text-purple-400 transition-transform group-hover:-translate-y-1" />
            <span className="relative">Retour au Lancement</span>
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-center text-sm text-slate-400 pt-8 border-t border-cyan-500/10">
          <div className="flex justify-center gap-8 mb-6">
            {legalPages.map((page) => (<Link key={page.name} to={page.href} className="hover:text-white transition-colors">{page.name}</Link>))}
          </div>
          <p className="mb-4">© {new Date().getFullYear()} Brice-Dev. Tous droits réservés.</p>
          <p className="text-xs text-slate-500">Conçu et développé avec <span className="text-[#D946EF]">♥</span> à Madagascar</p>
        </motion.div>
      </div>
    </footer>
  );
}