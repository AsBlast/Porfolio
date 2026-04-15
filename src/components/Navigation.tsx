// src/components/Navigation.tsx

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Folder, Mail, Store, Feather, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

function useActiveSection(sectionIds: string[], isHomePage: boolean): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    if (!isHomePage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, isHomePage]);

  return activeSection;
}

export function Navigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === '/';
  
  const menuItems = [
    { translationKey: "nav_home", sectionId: "home", icon: <Home size={18} /> },
    { translationKey: "nav_about", sectionId: "about", icon: <User size={18} /> },
    { translationKey: "nav_projects", sectionId: "projects", icon: <Folder size={18} /> },
    { translationKey: "nav_products", sectionId: "/produits", icon: <Store size={18} /> }, 
    { translationKey: "nav_blog", sectionId: "/blog", icon: <Feather size={18} /> },
    { translationKey: "nav_contact", sectionId: "contact", icon: <Mail size={18} /> },
  ];

  const sectionIds = menuItems.filter(item => !item.sectionId.startsWith('/')).map(item => item.sectionId);
  const activeSection = useActiveSection(sectionIds, isHomePage);
  
  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      if (sectionId.startsWith('/')) navigate(sectionId);
      else if (isHomePage) document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      else navigate('/', { state: { scrollToSection: sectionId } });
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getIsActive = (itemSectionId: string) => {
    if (itemSectionId.startsWith('/')) return location.pathname.startsWith(itemSectionId);
    return isHomePage && activeSection === itemSectionId;
  };

  return (
    // On ajoute un padding top pour l'effet "flottant"
    <header className="fixed w-full top-0 z-50 p-4 md:p-6 pointer-events-none">
      <nav 
        className={`
          mx-auto max-w-7xl px-4 py-2 flex justify-between items-center 
          pointer-events-auto transition-all duration-500 rounded-2xl
          ${isScrolled 
            ? "bg-space-900/60 backdrop-blur-xl border border-quantum/30 shadow-neon-cyan/20 py-2" 
            : "bg-transparent py-4"}
        `} 
        aria-label="Navigation principale"
      >
        {/* LOGO STYLE HUD */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="group flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-quantum opacity-20 blur-md group-hover:opacity-40 transition-opacity"></div>
            <div className="relative p-2 bg-space-950 border border-quantum/40 rounded-lg group-hover:border-quantum transition-colors">
              <Cpu className="w-6 h-6 text-quantum animate-pulse" />
            </div>
          </div>
          <span className="hidden sm:block text-xl font-black tracking-tighter text-white uppercase italic">
            Brice<span className="text-quantum">Dev</span>
          </span>
        </button>
        
        {/* MENU DESKTOP - FLOTTANT */}
        <div className="hidden md:flex items-center gap-1 bg-space-950/40 p-1 rounded-xl border border-white/5">
          {menuItems.map((item) => {
            const isActive = getIsActive(item.sectionId);
            return (
              <button
                key={item.translationKey}
                onClick={() => handleNavClick(item.sectionId)} 
                className={`
                  px-4 py-2 rounded-lg relative flex items-center gap-2 transition-all duration-300
                  text-sm font-mono tracking-tight group
                  ${isActive ? "text-quantum" : "text-slate-400 hover:text-quantum hover:bg-quantum/5"}
                `}
              >
                <span className={`${isActive ? "animate-pulse" : "opacity-50 group-hover:opacity-100"}`}>
                  {item.icon}
                </span>
                <span className="uppercase">{t(item.translationKey)}</span>
                
                {/* Indicateur actif style HUD */}
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 border border-quantum/50 rounded-lg shadow-neon-cyan/20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          
          <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
          <LanguageSwitcher />
        </div>
        
        {/* MOBILE TRIGGER */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-3 bg-space-900 border border-quantum/30 rounded-xl text-quantum shadow-neon-cyan/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* MOBILE MENU FULL HUD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="md:hidden absolute top-24 left-4 right-4 bg-space-900/95 backdrop-blur-2xl border border-quantum/30 rounded-3xl p-6 pointer-events-auto shadow-2xl"
          >
            <div className="grid grid-cols-1 gap-3 text-center">
              {menuItems.map((item) => {
                const isActive = getIsActive(item.sectionId);
                return (
                  <button 
                    key={`mobile-${item.translationKey}`} 
                    onClick={() => handleNavClick(item.sectionId)} 
                    className={`
                      p-4 rounded-2xl flex items-center justify-center gap-4 text-lg font-mono uppercase transition-all
                      ${isActive 
                        ? "bg-quantum/10 text-quantum border border-quantum/40" 
                        : "text-slate-400 border border-transparent"}
                    `}
                  >
                    {item.icon}
                    <span>{t(item.translationKey)}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}