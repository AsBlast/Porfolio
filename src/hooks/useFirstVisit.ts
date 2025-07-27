import { useState, useEffect, useRef } from 'react';

const SESSION_STORAGE_KEY = 'hasBeenWelcomedByAI';

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
  
    if (hasChecked.current) {
      return;
    }

    hasChecked.current = true;

    if (!sessionStorage.getItem(SESSION_STORAGE_KEY)) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      setIsFirstVisit(true);
    }
  }, []); // L'effet ne dépend de rien et s'exécute au montage

  return { isFirstVisit };
};