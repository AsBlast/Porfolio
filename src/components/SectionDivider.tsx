// src/components/SectionDivider.tsx

import React from "react";
import { AnimatedBackground } from "./AnimatedBackground";
export const SectionDivider: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none"
    >
        
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[100px] md:h-[150px]"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-[#020617]"
                 
        >
        </path>
      </svg>
          
         
    </div>
  );
};
