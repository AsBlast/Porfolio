// src/components/CtaBox.tsx
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface CtaBoxProps {
  title: string;
  price: string;
  url: string;
}

export const CtaBox = ({ title, price, url }: CtaBoxProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="my-12 p-1 border-2 border-dashed border-quantum/30 rounded-3xl overflow-hidden"
    >
      <div className="p-8 rounded-[1.4rem] bg-space-900 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-quantum/10 text-quantum text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
            Offre_Limitée_Architecte
          </span>
          <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{title}</h4>
          <p className="text-slate-400 font-mono text-sm mt-2">Équipez votre stack avec ce module pour seulement {price}€</p>
        </div>
        
        <div className="flex flex-col items-center gap-3">
            <a 
                href={url} 
                target="_blank" 
                className="hud-corners whitespace-nowrap bg-quantum text-space-950 px-8 py-4 font-black uppercase text-xs tracking-widest hover:shadow-neon-cyan transition-all"
            >
                Acquérir le Module
            </a>
            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">Satisfait ou remboursé</span>
        </div>
      </div>
    </motion.div>
  );
};