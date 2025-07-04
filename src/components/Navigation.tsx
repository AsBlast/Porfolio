import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Folder, Mail } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

type NavigationProps = {
  navigateToSection?: (section: string) => void;
};

export function Navigation({ navigateToSection }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Navigation handler avec debounce
  const handleNavClick = useCallback((sectionId: string) => {
    setIsOpen(false);
    
    // Debounce pour éviter les clics multiples rapides
    const debounceTimer = setTimeout(() => {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        scrollToSection(sectionId);
      }
    }, 150);
    
    return () => clearTimeout(debounceTimer);
  }, [location.pathname, navigate]);

  // Fonction pour scroll vers une section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90; // Compenser la hauteur de la navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Mettre à jour la section active
      setActiveSection(sectionId);
    }
  };

  // Détecter la section visible pour le highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Détection de la section visible
      const sections = ['home', 'about', 'projects', 'contact'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu au changement de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Items de navigation avec icônes
  const menuItems = [
    { 
      name: "Accueil", 
      href: "home", 
      icon: <Home className="w-5 h-5" />,
      aria: "Aller à la section d'accueil"
    },
    { 
      name: "À propos", 
      href: "about", 
      icon: <User className="w-5 h-5" />,
      aria: "Aller à la section À propos"
    },
    { 
      name: "Projets", 
      href: "projects", 
      icon: <Folder className="w-5 h-5" />,
      aria: "Aller à la section Projets"
    },
    { 
      name: "Contact", 
      href: "contact", 
      icon: <Mail className="w-5 h-5" />,
      aria: "Aller à la section Contact"
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/80 backdrop-blur-lg border-b border-cyan-500/20 py-3 shadow-xl" 
          : "py-4 bg-transparent"
      }`}
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo avec lien vers l'accueil */}
          <motion.a
            href="/"
            aria-label="Retour à l'accueil"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <div className="bg-cyan-500/10 p-2 rounded-full">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 w-3 h-3 rounded-full animate-pulse"></div>
            </div>
            <span>Brice-Dev</span>
          </motion.a>

          {/* Desktop Menu avec surlignage gauche-droite */}
          <div className="hidden md:flex space-x-2 relative">
            {menuItems.map((item) => (
              <motion.button
                key={item.name}
                aria-label={item.aria}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 rounded-lg relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: activeSection === item.href 
                    ? '#67e8f9' 
                    : '#cffafe80'
                }}
              >
                <div className="flex items-center gap-2 z-10 relative">
                  {item.icon}
                  {item.name}
                </div>
                
                {/* Fond animé gauche-droite */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 z-0"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: (hoveredItem === item.href || activeSection === item.href) ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-cyan-300 p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu avec animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: { duration: 0.3 }, 
                  opacity: { duration: 0.2, delay: 0.1 } 
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.3 }, 
                  opacity: { duration: 0.1 } 
                }
              }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-black/90 backdrop-blur-xl border-b border-cyan-500/20">
                <div className="flex flex-col space-y-1 p-4">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.name}
                      aria-label={item.aria}
                      onClick={() => handleNavClick(item.href)}
                      className={`px-4 py-3 rounded-lg flex items-center gap-3 transition-colors relative overflow-hidden ${
                        activeSection === item.href
                          ? "text-cyan-300"
                          : "text-cyan-300/80 hover:text-cyan-300"
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        textAlign: 'left' 
                      }}
                    >
                      {/* Fond animé gauche-droite pour mobile */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 z-0"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeSection === item.href ? '100%' : '0%' 
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      
                      <div className="z-10 relative flex items-center gap-3">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}