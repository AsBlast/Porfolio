// src/components/RouteLoader.tsx

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function RouteLoader() {
  return (
    <div className="fixed inset-0 z-[40] flex items-center justify-center bg-space-950/50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        {/* Ligne de scan infinie */}
        <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full border border-white/5">
          <motion.div 
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-quantum to-transparent shadow-neon-cyan"
          />
        </div>
        
        {/* Petit texte de terminal */}
        <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-quantum uppercase tracking-[0.3em]">
          <Terminal size={12} className="animate-pulse" />
          <span>Syncing_Data_Stream...</span>
        </div>
      </div>
    </div>
  );
}