// src/components/LoadingScreen.tsx

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, Activity, ShieldCheck, Wifi, Terminal } from "lucide-react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const bootStatuses = [
    "LOADING_CORE_RESOURCES...",
    "ESTABLISHING_ORBITAL_LINK...",
    "DECRYPTING_NEURAL_MODELS...",
    "SYNCING_QUANTUM_CORE...",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < bootStatuses.length - 1 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(statusInterval);
  }, []);

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-space-950 overflow-hidden"
    >
      {/* Background Grids */}
      <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="relative flex flex-col items-center w-full max-w-md px-6">
        
        {/* --- LE RADAR CENTRAL AVEC BRICE DEV --- */}
        <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
          
          {/* Anneaux rotatifs */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-b-2 border-quantum/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-l-2 border-r-2 border-nebula/20 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.1)]"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-10 border border-dashed border-quantum/20 rounded-full"
          />
          
          {/* NOM AU CENTRE */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter"
            >
              BRICE<span className="text-quantum font-light">_</span>DEV
            </motion.h1>
            <motion.div 
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-[1px] bg-quantum mt-1 shadow-neon-cyan"
            />
            <span className="mt-2 font-mono text-[8px] uppercase tracking-[0.5em] text-quantum/60">
              Orbital_Architect
            </span>
          </div>

          {/* Scanner laser qui balaie le nom */}
          <motion.div 
            animate={{ top: ["20%", "80%", "20%"] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-10 right-10 h-px bg-gradient-to-r from-transparent via-quantum to-transparent z-20 shadow-neon-cyan"
          />
        </div>

        {/* --- BARRE DE PROGRESSION ET STATUTS --- */}
        <div className="w-full space-y-4 bg-space-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2 text-quantum">
              <Terminal size={12} className="animate-pulse" />
              <span>{bootStatuses[statusIndex]}</span>
            </div>
            <span className="text-white font-black">{progress}%</span>
          </div>

          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-quantum shadow-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          {/* Icônes de diagnostic */}
          <div className="flex justify-between pt-4 opacity-50">
            <div className="flex gap-4">
               <Activity size={14} className={progress > 30 ? "text-quantum" : ""} />
               <ShieldCheck size={14} className={progress > 60 ? "text-quantum" : ""} />
               <Wifi size={14} className={progress > 85 ? "text-quantum" : ""} />
            </div>
            <span className="font-mono text-[9px]">ID: 09E5-ASBLAST</span>
          </div>
        </div>
      </div>

      {/* Lueur d'ambiance globale */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-quantum/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}