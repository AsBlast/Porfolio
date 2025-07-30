// src/hooks/useOutsideClick.ts
import { useEffect, useRef, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  handler: () => void
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current;
      // Ne fait rien si on clique sur l'élément référencé ou ses descendants
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Se ré-exécute si le handler change

  return ref;
};