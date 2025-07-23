import { AriaAttributes } from "react";

declare module 'react' {
  // Extension du territoire : connaissance de React sur les attributs HTML 
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Ajout de la propriété 'fetchpriority' avec ses valeurs possibles
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}