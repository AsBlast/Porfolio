import React, { useState } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';

// --- Composant Tooltip accessible et stable, basé sur Radix UI ---

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  if (!content) {
    return <>{children}</>;
  }
  
  return (
    <RadixTooltip.Provider delayDuration={150} skipDelayDuration={0}>
      <RadixTooltip.Root open={open} onOpenChange={setOpen}>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        
        <AnimatePresence>
          {open && (
            <RadixTooltip.Portal forceMount>
              <RadixTooltip.Content 
                asChild 
                sideOffset={5}
                // Ajout de styles pour éviter les problèmes de clic
                className="pointer-events-none"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded-md shadow-lg">
                    {content}
                  </div>
                 
                </motion.div>
              </RadixTooltip.Content>
            </RadixTooltip.Portal>
          )}
        </AnimatePresence>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};