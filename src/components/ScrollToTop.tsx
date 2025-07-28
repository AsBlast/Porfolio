// src/components/ScrollToTop.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ce composant détecte les changements de route et fait automatiquement
 * défiler la fenêtre vers le haut de la page.
 */
function ScrollToTop() {
  // Récupère l'objet "location" qui contient le chemin actuel (pathname)
  const { pathname } = useLocation();

  // Utilise un effet qui se déclenche à chaque fois que le "pathname" change
  useEffect(() => {
    // Fait défiler la fenêtre en haut (position 0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Le tableau de dépendances assure que l'effet s'exécute uniquement lors d'un changement d'URL

  // Ce composant ne rend aucun élément visuel
  return null;
}

export default ScrollToTop;