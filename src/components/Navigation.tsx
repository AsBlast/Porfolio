import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Folder, Mail, Store, Feather } from "lucide-react"; 

function useActiveSection(sectionIds: string[], isHomePage: boolean): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    if (!isHomePage) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-30% 0px -70% 0px" }
    );
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.unobserve(element);
    });
  }, [sectionIds, isHomePage]);

  return activeSection;
}

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === '/';
  
  const menuItems = [
    { name: "Accueil", sectionId: "home", icon: <Home size={20} /> },
    { name: "À propos", sectionId: "about", icon: <User size={20} /> },
    { name: "Projets", sectionId: "projects", icon: <Folder size={20} /> },
    { name: "Produits", sectionId: "/produits", icon: <Store size={20} /> }, 
    { name: "Blog", sectionId: "/blog", icon: <Feather size={20} /> },
    { name: "Contact", sectionId: "contact", icon: <Mail size={20} /> },
  ];

  const sectionIds = menuItems.filter(item => !item.sectionId.startsWith('/')).map(item => item.sectionId);
  const activeSection = useActiveSection(sectionIds, isHomePage);
  
  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (sectionId.startsWith('/')) {
      navigate(sectionId);
    } 
    else if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } 
    else {
      navigate('/', { state: { scrollToSection: sectionId } });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getIsActive = (itemSectionId: string) => {
    if (itemSectionId.startsWith('/')) {
      return location.pathname.startsWith(itemSectionId);
    }
    return isHomePage && activeSection === itemSectionId;
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-cyan-500/20 py-3 shadow-xl" : "py-4 bg-transparent"}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center" aria-label="Navigation principale">
        
        {/* --- LOGO RESTAURÉ --- */}
        <button onClick={() => handleNavClick('home')} aria-label="Retour à l'accueil" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
          <div className="bg-cyan-500/10 p-2 rounded-full"><div className="bg-gradient-to-r from-cyan-400 to-purple-500 w-3 h-3 rounded-full animate-pulse"></div></div>
          <span>Brice-Dev</span>
        </button>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {menuItems.map((item) => {
            const isActive = getIsActive(item.sectionId);
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.sectionId)}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2 rounded-lg relative flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-cyan-300" : "text-cyan-300/60 hover:text-cyan-300"}`}
              >
                {item.icon}
                {item.name}
                {isActive && (
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" layoutId="underline" transition={{ type: "spring", stiffness: 380, damping: 30 }}/>
                )}
              </button>
            )
          })}
        </div>
        
        {/* --- BOUTON MOBILE RESTAURÉ --- */}
        <div className="md:hidden"> 
          <motion.button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isOpen} aria-controls="mobile-menu" className="p-2 rounded-md text-cyan-300">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* --- MENU MOBILE RESTAURÉ --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-black/90 backdrop-blur-xl border-t border-cyan-500/20">
            <div className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = getIsActive(item.sectionId);
                return (
                  <button key={`mobile-${item.name}`} onClick={() => handleNavClick(item.sectionId)} className={`px-3 py-3 rounded-md flex items-center gap-3 text-lg transition-colors ${isActive ? "text-cyan-300 bg-cyan-500/10" : "text-cyan-300/80 hover:bg-cyan-500/5"}`}>
                    {item.icon}
                    <span>{item.name}</span>
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