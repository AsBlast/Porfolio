// src/components/ScrollToTop.tsx

/**
 * Ce composant fait défiler la fenêtre vers le haut (0, 0)
 * à chaque fois que la navigation change (le pathname de l'URL est modifié).
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null; 
}

export default ScrollToTop;