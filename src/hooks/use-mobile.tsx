import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 800;

/**
 * Un hook React performant et SSR-safe pour détecter si la vue
 * est de taille mobile.
 *
 * @returns {boolean} True si la largeur de la fenêtre est inférieure au breakpoint mobile.
 */
export function useIsMobile(): boolean {
 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleResize = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    // Définit l'état initial au premier chargement côté client
    handleResize(mediaQuery);

    // Ajoute un écouteur d'événement pour les changements de taille de fenêtre
    mediaQuery.addEventListener("change", handleResize);

    // Nettoyage : retire l'écouteur lorsque le composant est démonté
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []); 

  return isMobile;
}