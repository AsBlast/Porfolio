// src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Charge les traductions depuis un serveur (ex: /public/locales)
  .use(HttpApi)
  // Détecte la langue du navigateur de l'utilisateur
  .use(LanguageDetector)
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  .init({
    
    supportedLngs: ['fr', 'en'],
    fallbackLng: 'fr', 
    
    // Configuration du backend pour charger les fichiers JSON
    backend: {
      
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Détection de la langue
    detection: {
      // Ordre de détection : cookie, localStorage, puis tag HTML de la page
      order: ['cookie', 'localStorage', 'htmlTag'],
      caches: ['cookie'], 
    },

    ns: 'translation',
    defaultNS: 'translation',

    react: {
      useSuspense: false, 
    },
  });

export default i18n;