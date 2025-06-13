import { motion } from "framer-motion";
import { Code, Database, Layout } from "lucide-react";
import { useEffect, useState } from "react";

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
    },
    {
      icon: <Database className="w-8 h-8 text-[#D946EF]" />,
      title: "Développement backend",
      description:
        "Maîtrise de Node.js, Python et de la gestion de bases de données. Création de solutions côté serveur robustes et évolutives.",
    },
    {
      icon: <Layout className="w-8 h-8 text-[#D946EF]" />,
      title: "Conception UI/UX",
      description:
        "Créer des interfaces utilisateur belles et intuitives qui combinent esthétique et fonctionnalité pour une expérience utilisateur optimale.",
    },
  ];

  const paragraphs = [
    "« La seule façon de faire du bon travail, c'est d'aimer ce que l'on fait. »",
    "C'est dans cet état d'esprit que j'aborde chaque projet avec passion et dévouement, repoussant les limites du possible en développement web.",
    "Basé à Antananarivo Madagascar, je suis spécialisé dans la création de solutions innovantes alliant technologie de pointe et design intuitif. Mon objectif est de créer des expériences numériques qui non seulement répondent aux exigences, mais dépassent les attentes.",
    "Collaborons et concrétisons votre vision. Ensemble, nous pouvons créer quelque chose d'extraordinaire.",
  ];

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
          </motion.div>
        </div>

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
              className="p-6 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{skill.title}</h3>
              <p className="text-white/70">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
