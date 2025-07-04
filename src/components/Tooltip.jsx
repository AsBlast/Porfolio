// Fichier: src/components/Tooltip.jsx
import { useState } from 'react';

export const Tooltip = ({ children, content }) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      
      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
            {content}
            <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 bottom-[-6px] left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
};