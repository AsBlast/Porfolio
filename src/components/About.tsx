import { motion } from "framer-motion";
import { Code, Database, Layout, Box, Download, Award, Globe} from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from './Tooltip';

function Typewriter({ text }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent mb-6">
      {displayed}
    </h3>
  );
}

export function About() {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-[#D946EF]" />,
      title: "Développement front-end",
      description:
        "Expert en React, Vite et frameworks JavaScript modernes. Création d'interfaces utilisateur réactives et intuitives qui donnent vie à vos idées.",
      tools: ["React", "Vite", "Tailwind CSS", "Bootstrap"],
      level: 95
    },
    {
      icon: <Database className="w-8 h-8 text-[#D946EF]" />,
      title: "Développement backend",
      description:
        "Maîtrise de Node.js, Python et de la gestion de bases de données. Création de solutions côté serveur robustes et évolutives.",
      tools: ["Node.js", "Express", "MongoDB", "Postman/Insomnia"],
      level: 90
    },
    {
      icon: <Layout className="w-8 h-8 text-[#D946EF]" />,
      title: "Conception UI/UX",
      description:
        "Créer des interfaces utilisateur belles et intuitives qui combinent esthétique et fonctionnalité pour une expérience utilisateur optimale.",
      tools: ["Prototyping", "User Testing"],
      level: 85
    },
    {
      icon: <Box className="w-8 h-8 text-[#D946EF]" />,
      title: "Développement CMS",
      description:
         "Expertise dans la création et la personnalisation de sites WordPress. Optimisation SEO des pages, intégration responsive et garantie de la compatibilité cross-browser.",
      tools: ["Elementor", "WooCommerce", "SEO", "Plugins"],
      level: 85
    },
  ];

  const stats = [
    { value: "3+", label: "Années d'expérience" },
    { value: "10+", label: "Projets réalisés" },
    { value: "98%", label: "Satisfaction clients" },
    { value: "7+", label: "Technologies maîtrisées" }
  ];

  const paragraphs = [
    "« La seule façon de faire du bon travail, c'est d'aimer ce que l'on fait. »",
    "C'est dans cet état d'esprit que j'aborde chaque projet avec passion et dévouement, repoussant les limites du possible en développement web.",
    "Basé à Antananarivo Madagascar, je suis spécialisé dans la création de solutions innovantes alliant technologie de pointe et design intuitif. Mon objectif est de créer des expériences numériques qui non seulement répondent aux exigences, mais dépassent les attentes.",
    "Collaborons et concrétisons votre vision. Ensemble, nous pouvons créer quelque chose d'extraordinaire.",
  ];

  // Fonction pour télécharger le CV
  const downloadCV = () => {
    // Création d'un lien temporaire
    const link = document.createElement('a');
    
    // Chemin vers votre fichier CV dans le dossier public
    link.href = '/files/CV.pdf'; 
    
    // Nom du fichier qui sera téléchargé
    link.download = 'CV_Yakim_Brice-Dev.pdf';
    
    // Déclenchement du téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction pour rediriger vers la section projets
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-[#221F26]">
      <div className="container mx-auto px-4">
        <motion.h2
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
            className="relative cursor-pointer rounded-lg overflow-hidden"
          >
            <img
              src="/images/1699548679409.jpeg"
              alt="Profile"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-50 rounded-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/80"
          >
            <Typewriter text="Développeur engagé et créatif, toujours à la recherche d’innovation." />

            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.3 }}
                className="mb-6"
              >
                {text}
              </motion.p>
            ))}

            {/* Boutons d'action avec fonctionnalités */}
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={downloadCV} // Ajout de la fonction de téléchargement
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#D946EF] hover:bg-[#C026D3] text-white font-medium py-3 px-6 rounded-lg transition-all"
              >
                <Download size={18} />
                Télécharger mon CV
              </motion.button>
              
              <motion.button
                onClick={scrollToProjects} // Ajout de la fonction de redirection
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border-2 border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF]/10 font-medium py-3 px-6 rounded-lg transition-all"
              >
                <Globe size={18} />
                Voir mes projets
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Section Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-800 text-center"
            >
              <div className="text-3xl font-bold text-[#D946EF]">{stat.value}</div>
              <div className="text-gray-300 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 15px rgba(217, 70, 239, 0.3)",
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors group relative"
            >
              {/* Fond de survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
              
              <div className="relative z-10">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{skill.title}</h3>
                
                {/* Barre de niveau */}
                <div className="mt-4 mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Maîtrise</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] h-2 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-white/70 mb-4">{skill.description}</p>
                
                {/* Outils */}
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool, i) => (
                    <Tooltip key={i} content={tool}>
                      <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full hover:bg-[#D946EF]/20 transition-colors">
                        {tool}
                      </span>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#D946EF]/10 to-[#8B5CF6]/10 p-8 rounded-2xl border border-[#D946EF]/30"
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
            
            {/* <div className="p-4 bg-white/5 rounded-lg">
              <div className="font-semibold text-[#D946EF]">AWS Certified</div>
              <div className="text-white">Solutions Architect</div>
              <div className="text-gray-400 text-sm mt-1">2022</div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="font-semibold text-[#D946EF]">Meta</div>
              <div className="text-white">React Native Specialist</div>
              <div className="text-gray-400 text-sm mt-1">2021</div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}