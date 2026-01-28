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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="my-10 p-8 rounded-2xl bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border border-cyan-500/30 text-center shadow-2xl"
    >
      <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
      <p className="text-cyan-200 mb-6 font-medium">Gagnez des heures de développement pour seulement {price}€</p>
      <a 
        href={url} 
        target="_blank" 
        rel="sponsored noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#D946EF] hover:bg-[#C026D3] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-pink-500/20"
      >
        <ShoppingCart size={20} />
        Obtenir le pack maintenant
      </a>
    </motion.div>
  );
};