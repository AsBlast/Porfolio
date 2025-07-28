import { motion } from "framer-motion";
import { Code, Database, Layout, Box, Download, Award, Globe, Star, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Tooltip } from './Tooltip';

// Le Typewriter ne se lance que lorsqu'il est visible ---
function Typewriter({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.unobserve(ref.current); 
        }
      },
      { threshold: 0.1 }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    
    return () => clearInterval(interval);
  }, [startTyping, text]);

  return (
    <h3
      ref={ref}
      aria-label={text}
      className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent mb-6 h-16 sm:h-auto"
    >
      {displayed}
    </h3>
  );
}

export function About() {
  const skills = [
    { icon: <Code size={28} className="text-[#D946EF]" />, title: "Développement front-end", description: "Expert en React, Vite et frameworks JavaScript modernes. Création d'interfaces utilisateur réactives et intuitives qui donnent vie à vos idées.", tools: ["React", "Vite", "Tailwind CSS", "Bootstrap"], level: 95 },
    { icon: <Database size={28} className="text-[#D946EF]" />, title: "Développement backend", description: "Maîtrise de Node.js, Python et de la gestion de bases de données. Création de solutions côté serveur robustes et évolutives.", tools: ["Node.js", "Express", "MongoDB", "Postman/Insomnia"], level: 90 },
    { icon: <Layout size={28} className="text-[#D946EF]" />, title: "Conception UI/UX", description: "Créer des interfaces utilisateur belles et intuitives qui combinent esthétique et fonctionnalité pour une expérience utilisateur optimale.", tools: ["Prototyping", "User Testing"], level: 85 },
    { icon: <Box size={28} className="text-[#D946EF]" />, title: "Développement CMS", description: "Expertise dans la création et la personnalisation de sites WordPress. Optimisation SEO des pages, intégration responsive et garantie de la compatibilité cross-browser.", tools: ["Elementor", "WooCommerce", "SEO", "Plugins"], level: 85 },
  ];

  const stats = [
    { value: "2+", label: "Années d'expérience" },
    { value: "10+", label: "Projets réalisés" },
    { value: "98%", label: "Satisfaction clients" },
    { value: "7+", label: "Technologies maîtrisées" }
  ];

  const paragraphs = [
    "« La seule façon de faire du bon travail, c'est d'aimer ce que l'on fait. »",
    "Mon approche est simple : je ne suis pas le développeur qui exécute une liste de fonctionnalités. Je suis celui qui traque le problème réel derrière la demande, obsédé par l'idée de le dissoudre dans une solution radicalement efficace.",
    "C'est pourquoi ma règle d'or est non négociable : la puissance sans la clarté est inutile. Un outil brillant mais confus est comme une bibliothèque remplie de trésors, mais sans catalogue pour les trouver. La valeur est là, mais elle reste hors de portée.",
    "Depuis Antananarivo, Madagascar, je ne construis donc pas des logiciels. Je forge des leviers de productivité : des solutions autonomes, puissantes et intuitives, conçues pour vous donner un avantage tangible et vous rendre maître de votre temps."
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 bg-[#221F26]">
      <div className="container mx-auto px-4">
        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Qui suis-je ?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden"
          >
            <img
              src="/images/1699548679409.webp"
              alt="Photo de Brice Yakim, développeur web, dans un environnement de travail."
              className="w-full h-full object-cover rounded-lg"
              width="500"
              height="600"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-50 rounded-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/80"
          >
            {/* AMÉLIORATION 1 : Titre plus percutant */}
            <Typewriter text="Je transforme la complexité en leviers de productivité." />

            {paragraphs.map((text, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.3 }} className="mb-6">{text}</motion.p>
            ))}

            <div className="flex flex-wrap gap-4 mt-8">
              <motion.a
                href="/files/CV.pdf"
                download="CV_Yakim_Brice-Dev.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#D946EF] hover:bg-[#C026D3] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                aria-label="Télécharger mon Curriculum Vitae au format PDF"
              >
                <Download size={18} />
                Télécharger mon CV
              </motion.a>
              
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 border-2 border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF]/10 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <Globe size={18} />
                Voir mes projets
              </motion.a>
            </div>
            
            {/* AMÉLIORATION 2 : Section "Mes principes directeurs" */}
            <div className="mt-12">
              <h4 className="text-xl font-semibold text-white mb-4">Mes principes directeurs :</h4>
              <div className="flex flex-wrap gap-3">
                {["Simplicité Radicale", "L'Utilisateur d'Abord", "Impact > Fonctionnalités", "Itération Continue"].map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium"
                  >
                    {value}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-800 text-center"
            >
              <div className="text-3xl font-bold text-[#D946EF]">{stat.value}</div>
              <div className="text-gray-300 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* AMÉLIORATION 3 : Titre explicite pour la section des compétences */}
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mt-20 mb-12">Mes Outils de Prédilection</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(217, 70, 239, 0.3)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
              <div className="relative z-10">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{skill.title}</h3>
                
                <div className="mt-4 mb-4" role="meter" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`Niveau d'affinité : ${skill.level} sur 100`}>
                  <div className="flex justify-between text-sm text-gray-400 mb-1" aria-hidden="true">
                    <span>Affinité</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2" aria-hidden="true">
                    <motion.div 
                      className="bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] h-2 rounded-full" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <p className="text-white/70 mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool, i) => (
                    <Tooltip key={i} content={tool}>
                      <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full">{tool}</span>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AMÉLIORATION 4 : Section Témoignages pour la preuve sociale */}
        <div className="mt-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Ce qu'ils en disent</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-6 rounded-lg border border-gray-800"
            >
              <div className="flex text-yellow-400 mb-4">
                <Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" />
              </div>
              <blockquote className="text-white/80 italic mb-4">
                "Brice n'a pas seulement développé notre site, il a compris notre vision. Son obsession pour l'UX a transformé notre idée complexe en un outil incroyablement simple à utiliser. Un vrai levier de productivité pour nous."
              </blockquote>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] flex items-center justify-center">
                    <User className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">Client Heureux</div>
                  <div className="text-gray-400">CEO, Entreprise Fictive</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 p-6 rounded-lg border border-gray-800"
            >
              <div className="flex text-yellow-400 mb-4">
                <Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" />
              </div>
              <blockquote className="text-white/80 italic mb-4">
                "Sa capacité à transformer un problème abstrait en une solution concrète est impressionnante. Il ne suit pas les instructions aveuglément, il les améliore. Le résultat final a dépassé toutes nos attentes."
              </blockquote>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] flex items-center justify-center">
                    <User className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">Partenaire Satisfait</div>
                  <div className="text-gray-400">Chef de Projet, Startup</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#D946EF]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#D946EF]/30"
        >
          <div className="flex items-center gap-4 mb-6">
            <Award className="w-10 h-10 text-[#D946EF]" />
            <h3 className="text-2xl font-bold text-white">Certifications & Formations</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="font-semibold text-[#D946EF]">Formation Mudey</div>
              <div className="text-white">Développement Web Full-Stack Hybride</div>
              <div className="text-gray-400 text-sm mt-1">2023</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}