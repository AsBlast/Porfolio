// src/components/Footer.tsx

import { motion } from "framer-motion";
import { 
  Github, Linkedin, Facebook, Rocket, 
  Code2, Sparkles, Terminal, Cpu, Shield, 
  ChevronUp, Globe, Activity
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Accueil", href: "#home" }, { name: "A propos", href: "#about" },
    { name: "Produits", href: "/produits" }, { name: "Projets", href: "#projects" },
    { name: "Blog", href: "/blog" }, { name: "Contact", href: "#contact" }
  ];
  
  const legalPages = [
    { name: "Confidentialité", href: "/privacy" },
    { name: "Mentions Légales", href: "/terms" },
    { name: "Données", href: "/data-deletion" },
  ];

  const socialLinks = [
    { name: "Github", icon: <Github size={20} />, href: "https://github.com/AsBlast" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200" },
    { name: "Facebook", icon: <Facebook size={20} />, href: "https://facebook.com/" }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/')) navigate(href);
    else if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      if (location.pathname === '/') document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      else navigate('/', { state: { scrollToSection: sectionId } });
    }
  };

  return (
    <footer className="relative bg-space-950 border-t border-white/5 pt-20 pb-10 overflow-hidden">
      
      {/* --- DÉCORATIONS D'ARRIÈRE-PLAN --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-quantum/20 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/5 to-transparent" />
        {/* Lueur Aurora Subtile */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-quantum/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-20">
          
          {/* --- BLOC 1: IDENTITÉ SYSTÈME --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-quantum/10 border border-quantum/20 rounded-lg">
                <Cpu size={24} className="text-quantum" />
              </div>
              <span className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Brice<span className="text-quantum">.Dev</span>
              </span>
            </div>
            <p className="text-slate-400 font-mono text-xs leading-relaxed border-l border-white/10 pl-4">
              &gt; ARCHITECTE_SOLUTIONS_IA<br/>
              &gt; SECTEUR: MADAGASCAR_7G<br/>
              &gt; STATUS: SYSTEM_NOMINAL
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} href={link.href} target="_blank" rel="noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-quantum hover:border-quantum/50 transition-all"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- BLOC 2: RÉPERTOIRE DU SYSTÈME --- */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-mono font-black text-quantum uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
              <Terminal size={14} /> System_Directory
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-left"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-quantum group-hover:shadow-neon-cyan transition-all" />
                  <span className="font-mono text-xs uppercase tracking-widest">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* --- BLOC 3: TERMINAL D'ACTION --- */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-end">
             <motion.button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}
                className="hud-corners p-8 bg-space-900 border border-white/5 flex flex-col items-center gap-4 group"
             >
                <div className="relative">
                   <div className="absolute inset-0 bg-nebula blur-lg opacity-20 group-hover:opacity-60 transition-opacity" />
                   <Rocket className="relative text-nebula rotate-0 group-hover:-rotate-12 transition-transform" size={28} />
                </div>
                <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em]">Retour_Lancement</span>
             </motion.button>
          </div>

        </div>

        {/* --- BARRE DE DONNÉES FINALE --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            {legalPages.map((page) => (
              <Link key={page.name} to={page.href} className="hover:text-quantum transition-colors">{page.name}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Globe size={10} className="text-quantum" />
                <span className="text-[9px] font-mono text-slate-300">ASBLAST_CORE_v2.5</span>
             </div>
             <p className="text-[9px] font-mono text-slate-600">
               © {new Date().getFullYear()} // CRAFTED_IN_MADAGASCAR
             </p>
          </div>
        </div>

      </div>

      {/* Ligne de scan finale tout en bas */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-quantum/10 to-transparent animate-scan" />
    </footer>
  );
}