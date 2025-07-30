// src/react-i18next.d.ts
import 'react-i18next';
import fr from '../public/locales/fr/translation.json';
import en from '../public/locales/en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    
    resources: {
      translation: typeof fr & typeof en; 
    };
  }
}