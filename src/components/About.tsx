// src/components/About.tsx

import { motion } from "framer-motion";
import { 
  Code, Database, Layout, Box, Download, Award, 
  Globe, User, ShieldCheck, Zap, LayoutTemplate, 
  ExternalLink, Target, Cpu, Fingerprint, Activity
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Tooltip } from "./Tooltip";

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartTyping(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [startTyping, text]);

  return (
    <div ref={ref} className="font-mono text-quantum/80 mb-6 flex items-center gap-2">
      <span className="bg-quantum/20 p-1 text-[10px] uppercase font-bold">Status</span>
      <span className="text-lg md:text-xl font-bold tracking-tight">{displayed}</span>
    </div>
  );
}

export function About() {
  const skills = [
    {
      icon: <Code size={24} />,
      title: "Core Frontend",
      tools: ["React", "TypeScript", "Vite", "Tailwind"],
      level: 95,
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Database size={24} />,
      title: "Backend Neural",
      tools: ["Node.js", "Python", "MongoDB", "SQL"],
      level: 88,
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <LayoutTemplate size={24} />,
      title: "User Interface",
      tools: ["HUD Design", "UX Architecture", "Prototyping"],
      level: 85,
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <Fingerprint size={24} />,
      title: "Digital Identity",
      tools: ["WordPress", "SEO Tech", "Optimization"],
      level: 90,
      color: "from-orange-500 to-amber-600"
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-space-950 overflow-hidden">
      {/* Texture de fond HUD */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ width: 0 }} whileInView={{ width: "100px" }}
            className="h-1 bg-quantum mb-4 shadow-neon-cyan"
          />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white italic">
            Dossier: <span className="text-quantum">Architecte</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- COLONNE GAUCHE : SCAN BIOMÉTRIQUE --- */}
          <div className="lg:col-span-5 relative group">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              className="relative p-2 border border-quantum/30 rounded-3xl overflow-hidden backdrop-blur-sm bg-space-900/40"
            >
              {/* Overlay de scan interactif */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-quantum"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-quantum"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-quantum"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-quantum"></div>
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-quantum shadow-neon-cyan opacity-50"
                />
              </div>

              <img 
                src="/images/profile-large.webp" 
                alt="Bio-Scan" 
                className="w-full h-auto rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
              />

              {/* Étiquettes de données flottantes */}
              <div className="absolute bottom-6 right-6 z-30 font-mono text-[10px] text-quantum bg-space-950/80 p-2 border border-quantum/20 rounded-lg">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-quantum rounded-full animate-ping"></div> IDENTIFIED: BRICE_YAKIM</div>
              </div>
            </motion.div>

            {/* Statistiques flottantes style HUD */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: "Expérience", val: "3+ Cycles" },
                { label: "Projets", val: "10+ Units" }
              ].map(s => (
                <div key={s.label} className="p-4 bg-space-900 border border-white/5 rounded-2xl">
                   <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">{s.label}</p>
                   <p className="text-xl font-black text-white">{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLONNE DROITE : SYSTÈME DE DONNÉES --- */}
          <div className="lg:col-span-7">
            <Typewriter text="Je forge des leviers de productivité haute-fidélité." />

            <div className="space-y-6 text-slate-400 font-mono text-sm leading-relaxed">
               <p className="border-l-2 border-quantum/40 pl-4 bg-quantum/5 py-2">
                &gt; Analyse: Le sujet ne se contente pas de coder des fonctionnalités. Il traque le problème racine pour le dissoudre dans une solution radicalement efficace.
               </p>
               <p>
                Ma philosophie repose sur un pilier non-négociable : <span className="text-white">la puissance sans la clarté est obsolète</span>. Depuis Antananarivo, Madagascar, je transforme vos visions en architectures numériques robustes.
               </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {skills.map((skill, i) => (
                <motion.div 
                  key={skill.title}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 bg-space-900/60 border border-white/5 rounded-2xl hover:border-quantum/40 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-space-950 border border-white/10 rounded-lg text-quantum group-hover:shadow-neon-cyan transition-all">
                      {skill.icon}
                    </div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">{skill.title}</h4>
                  </div>
                  
                  {/* Progress bar style HUD */}
                  <div className="h-1 w-full bg-space-950 rounded-full mb-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map(tool => (
                      <span key={tool} className="text-[9px] px-2 py-1 bg-white/5 border border-white/5 rounded-md uppercase text-slate-400">
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-12">
               <motion.a 
                  href="/files/CV.pdf" 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="hud-corners bg-quantum text-space-950 px-8 py-4 font-black uppercase tracking-tighter flex items-center gap-3"
               >
                 <Download size={18} /> Télécharger Log_Data.pdf
               </motion.a>
               <motion.a 
                  href="#contact" 
                  whileHover={{ backgroundColor: "rgba(34, 211, 238, 0.1)" }}
                  className="hud-corners border border-quantum text-quantum px-8 py-4 font-black uppercase tracking-tighter"
               >
                 Ouvrir une session
               </motion.a>
            </div>
          </div>
        </div>

        {/* --- SECTION FORMATION : GRID TECH --- */}
        <div className="mt-24 pt-16 border-t border-white/5">
          <div className="flex items-center gap-3 mb-12">
            <Cpu className="text-nebula" />
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest italic">Modules_Acquisition</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div className="relative p-6 bg-space-900 border border-white/10 rounded-2xl overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-nebula text-white text-[10px] font-black uppercase">Core_Verified</div>
                <h4 className="text-xl font-bold text-white mb-2">Formation Mudey</h4>
                <p className="text-slate-400 font-mono text-xs mb-4">MADA_SEC_7G // FULL-STACK ARCHITECTURE</p>
                <p className="text-sm text-slate-300">Spécialisation en systèmes distribués, JavaScript asynchrone et optimisation de la performance noyau.</p>
             </div>

             <div className="relative p-6 bg-space-900 border border-white/10 rounded-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 px-3 py-1 bg-quantum text-space-950 text-[10px] font-black uppercase">Neural_Link</div>
                <h4 className="text-xl font-bold text-white mb-2">Spécialisations Cursa</h4>
                <p className="text-slate-400 font-mono text-xs mb-4">GLOBAL_DATA_STREAM // 2024</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Node.js Advanced", "Python Scripting", "UX Engineering", "API Design"].map(t => (
                    <div key={t} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1 h-1 bg-quantum"></div> {t}
                    </div>
                  ))}
                </div>
                {/* Certificat miniature interactif */}
                <a href="/images/certificat.png" target="_blank" className="mt-4 inline-flex items-center gap-2 text-[10px] text-quantum hover:underline font-bold uppercase tracking-widest">
                  <ExternalLink size={12} /> Voir accréditation
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;