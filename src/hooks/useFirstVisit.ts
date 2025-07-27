import { useState } from 'react';

const SESSION_STORAGE_KEY = 'hasBeenWelcomedByAI';

export const useFirstVisit = () => {
  
  const [isFirstVisit] = useState(() => {
    // On vérifie si l'utilisateur a déjà été accueilli dans cette session.
    const hasBeenWelcomed = sessionStorage.getItem(SESSION_STORAGE_KEY);

    // S'il n'a PAS été accueilli...
    if (!hasBeenWelcomed) {
      // on le marque comme accueilli pour les prochaines fois...
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      //  et on initialise l'état à `true`.
      return true;
    }

    // Sinon, on initialise l'état à `false`.
    return false;
  });

  // Plus besoin de useEffect ou de useRef !
  return { isFirstVisit };
};