import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Rocket } from "lucide-react";
import "../styles/globals.css";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 bg-[#19171F] overflow-hidden">
      {/* Effets d'arrière-plan dynamiques */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-1/3 left-1/4 w-[800px] h-[800px] bg-radial-gradient(from_60%_50%_at_50%_50%,#D946EF/20%,transparent_70%) animate-float" />
        <div className="absolute -bottom-1/4 right-1/4 w-[600px] h-[600px] bg-radial-gradient(from_60%_50%_at_50%_50%,#8B5CF6/15%,transparent_70%) animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-6xl font-bold mb-24 text-center bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent"
        >
Prêt pour le décollage ?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: Mail,
              title: "Missive numérique",
              content: "asblastb@gmail.com",
              delay: 0.2
            },
            {
              icon: Phone,
              title: "Canal de fréquence",
              content: "+261 38 91 754 07",
              delay: 0.4
            },
            {
              icon: MapPin,
              title: "Station orbitale",
              content: "Antananarivo, Madagascar",
              delay: 0.6
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-[#D946EF]/30 transition-all"
            >
              {/* Effet holographique au survol */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_40%,#D946EF/30%,transparent_60%)] before:animate-hologram" />

              <div className="relative z-10 space-y-6">
                <div className="p-4 bg-[#D946EF]/10 rounded-lg w-max transition-transform group-hover:rotate-12">
                  <item.icon className="w-8 h-8 text-[#D946EF] animate-pulse-slow" />
                </div>
                
                <h3 className="text-xl font-bold text-white/90 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-lg text-white/80 font-mono hover:text-[#8B5CF6] transition-colors cursor-copy">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section citation stylisée */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <Rocket className="w-8 h-8 text-[#D946EF] animate-launch" />
            <p className="text-2xl italic text-white/80">
              "Chaque grand <span className="text-[#D946EF]">voyage numérique</span><br />
              commence par une simple <span className="text-[#8B5CF6]">connexion</span>."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Styles d'animation globaux
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes hologram {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes launch {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        .animate-float { animation: float 12s infinite ease-in-out; }
        .animate-float-delayed { animation: float 12s 3s infinite ease-in-out; }
        .animate-hologram { animation: hologram 1.5s infinite linear; }
        .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
        .animate-launch { animation: launch 2s infinite ease-in-out; }
      `}</style> */}
    </section>
  );
}