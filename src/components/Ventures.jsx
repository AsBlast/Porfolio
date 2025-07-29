// src/components/Ventures.tsx

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ventures = [
  {
    title: "Félin Fashion Mada",
    description: "Une boutique en ligne dédiée aux accessoires stylés pour chiens et chats à Madagascar, conçue pour renforcer le lien avec une communauté Facebook de plus de 10k passionnés.",
    image: "/images/ventures/felin-fashion.webp", 
    link: "https://shop.asblast.space",
    stack: ["React", "Tailwind CSS", "Meta API", "Netlify"],
    status: "En ligne"
  },
];

export function Ventures() {
  return (
    <section id="ventures" className="py-20 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <motion.h2
          id="ventures-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Mes Ventures
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {ventures.map((venture, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 rounded-lg border border-white/10 group overflow-hidden"
            >
              <div className="grid md:grid-cols-[1fr_0.75fr] items-center">
                <div className="p-8 flex flex-col h-full">
                  <span className="px-3 py-1 bg-[#D946EF]/20 text-[#D946EF] text-xs font-bold rounded-full self-start mb-4">
                    {venture.status}
                  </span>
                  <h3 className="text-2xl font-bold mb-2 text-white">{venture.title}</h3>
                  <p className="text-white/70 mb-4 flex-grow">{venture.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {venture.stack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full">{tech}</span>
                    ))}
                  </div>

                  <a 
                    href={venture.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#D946EF] font-bold group-hover:text-white transition-colors self-start"
                    aria-label={`Visiter le site de ${venture.title}`}
                  >
                    Visiter le site
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
                
                <a href={venture.link} target="_blank" rel="noopener noreferrer" aria-hidden="true" tabIndex={-1} className="overflow-hidden h-full hidden md:block">
                  <img 
                    src={venture.image} 
                    alt={`Aperçu du projet ${venture.title}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}