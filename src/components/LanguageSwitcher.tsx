// src/components/LanguageSwitcher.tsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick'; 

// On type notre tableau de langues pour plus de clarté
interface Language {
  code: 'fr' | 'en'; 
  lang: string;
}

const languages: Language[] = [
  { code: 'fr', lang: 'FR' },
  { code: 'en', lang: 'EN' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Utilisation du hook pour fermer le dropdown en cliquant à l'extérieur
 const dropdownRef = useOutsideClick<HTMLDivElement>(() => {
  setIsOpen(false);
});

  const changeLanguage = (lng: 'fr' | 'en') => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Ferme le menu après la sélection
  };

  // Trouve l'objet de la langue actuellement sélectionnée pour afficher son nom complet
  const currentLanguage = languages.find(l => l.code === i18n.resolvedLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Le bouton principal qui affiche la langue actuelle et ouvre/ferme le menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10 rounded-md transition-colors"
      >
        <Globe size={16} />
        <span>{currentLanguage?.lang}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Le panneau du dropdown qui apparaît/disparaît */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur-md border border-cyan-500/20 rounded-lg shadow-xl z-20"
          >
            <ul className="p-1">
              {languages.map((lng) => (
                <li key={lng.code}>
                  <button
                    onClick={() => changeLanguage(lng.code)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                      i18n.resolvedLanguage === lng.code
                        ? 'bg-cyan-500/20 text-cyan-200'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {lng.lang}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;