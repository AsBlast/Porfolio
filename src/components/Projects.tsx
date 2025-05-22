import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Cpu,
  Layout,
  Database,
  Cloud,
  Rocket,
} from "lucide-react";

export function Projects() {
  interface Project {
    title: string;
    description: string;
    image: string;
    github: string;
    live: string;
    tags: string[];
    status?: string; // Propriété optionnelle
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "En production":
        return "bg-green-500/20 text-green-400";
      case "En maintenance":
        return "bg-yellow-500/20 text-yellow-400";
      case "En développement":
        return "bg-blue-500/20 text-blue-700 "; // Changé en rouge
      default:
        return "bg-[#D946EF]/20 text-[#D946EF]";
    }
  };

  // Fonction pour la couleur du point
  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "En développement":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };
  const projects: Project[] = [
    {
      title: "Projet Alpha",
      description:
        "Application Web moderne créée avec React, exploitant Tailwind CSS pour le style et Vite pour un développement ultra-rapide",
      image: "/images/alpha.png",
      github: "https://github.com",
      live: "http://mg-remote-work.netlify.app/",
      tags: ["React", "Tailwind CSS", "Vite"],
      status: "En production",
    },
    {
      title: "Projet Beta",
      description:
        "Solution de e-commerce avancée utilisant WordPress avec intégration WooCommerce et générateur de pages Elementor",
      image: "/images/samsung.png",
      github: "https://github.com",
      live: "http://asblast-samsung.netlify.app/",
      tags: ["WordPress", "WooCommerce", "Elementor"],
      status: "En production",
    },
    {
      title: "Projet Gamma",
      description:
        "Application Web complète utilisant Node JS (en cours de développement)",
      image:"/images/AKATA.png",
      github: "https://github.com",
      live: "http://akata.netlify.app/",
      tags: ["Node JS / PHP", "MySQL", "Laravel"],
      status: "En développement",
    },
  ];
  const skills = [
    {
      category: "Frontend",
      icon: <Layout className="w-5 h-5" />,
      items: [
        { name: "JavaScript", level: 85 },
        { name: "React", level: 95 },
        { name: "TypeScript", level: 40 },
        { name: "Tailwind CSS", level: 87 },
        { name: "Angular", level: 15 },
      ],
    },
    {
      category: "Backend",
      icon: <Database className="w-5 h-5" />,
      items: [
        { name: "Node.js", level: 80 },
        { name: "PHP/Laravel", level: 35 },
        { name: "REST API", level: 70 },
        { name: "MySQL", level: 40 },
         { name: "Python/Django", level: 55 },
      ],
    },
    {
      category: "DevOps, CMS, Tools",
      icon: <Cloud className="w-5 h-5" />,
      items: [
        { name: "Wordpress", level: 85 },
        { name: "Git", level: 80 },
        { name: "Docker", level: 25 },
        { name: "Postman/Insomnia", level: 70 },
        { name: "Nginx", level: 22 },
      ],
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  // Variantes d'animation pour les compétences
  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };
  return (
    <section
      id="projects"
      className="py-20 bg-[#1A1F2C] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      {/* Nouvelle section Compétences */}
      <div className="container mx-auto px-4 relative z-10 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Compétences
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              variants={itemVariants}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#D946EF]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#D946EF]/20 rounded-lg">
                  {skillCategory.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {skillCategory.category}
                </h3>
              </div>

              <div className="space-y-4">
                {skillCategory.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    custom={i}
                    variants={skillVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-[#D946EF]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="container mx-auto px-4 relative z-10 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Projets
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative">
                
                {/**Images */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF]/20 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:content-[''] before:absolute before:inset-0 before:bg-[#D946EF]/20 before:transform before:translate-x-2 before:animate-pulse after:content-[''] after:absolute after:inset-0 after:bg-[#8B5CF6]/20 after:transform after:-translate-x-2 after:animate-pulse" />
              </div>

              <div className="p-6 relative">
                {/* Ajout d'icônes de stack technique */}
                <div className="flex gap-3 mb-4">
                  <Rocket className="w-5 h-5 text-[#8B5CF6]" />
                  <Cpu className="w-5 h-5 text-[#D946EF]" />
                  <Code className="w-5 h-5 text-[#3B82F6]" />
                  {/* Ajout d'un badge de statut */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  {"status" in project && (
                    <>
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                      <span className="flex h-3 w-3">
                        <span
                          className={`animate-ping absolute inline-flex h-3 w-3 rounded-full ${
                            project.status === "En développement"
                              ? "bg-blue-800"
                              : "bg-green-950"
                          } opacity-75`}
                        ></span>
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 ${getStatusDotColor(
                            project.status
                          )}`}
                        ></span>
                      </span>
                    </>
                  )}
                </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#D946EF] transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#D946EF]/20 rounded-full text-sm text-[#D946EF] hover:bg-[#D946EF]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;

// import { motion } from "framer-motion";
// import { Github, ExternalLink } from "lucide-react";

// export function Projects() {
//   const projects = [
//     {
//       title: "Project Alpha",
//       description: "A modern web application built with React and Node.js",
//       image: "/photo-1518770660439-4636190af475",
//       github: "https://github.com",
//       live: "https://example.com",
//       tags: ["React", "Node.js", "MongoDB"],
//     },
//     {
//       title: "Project Beta",
//       description: "E-commerce platform with advanced features",
//       image: "/photo-1526374965328-7f61d4dc18c5",
//       github: "https://github.com",
//       live: "https://example.com",
//       tags: ["Vue.js", "Express", "PostgreSQL"],
//     },
//     {
//       title: "Project Gamma",
//       description: "Real-time data visualization dashboard",
//       image: "/photo-1487058792275-0ad4aaf24ca7",
//       github: "https://github.com",
//       live: "https://example.com",
//       tags: ["React", "D3.js", "Firebase"],
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   return (
//     <section id="projects" className="py-20 bg-[#1A1F2C] relative overflow-hidden">
//       {/* Cyberpunk Grid Background */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
//         >
//           Projects
//         </motion.h2>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               className="group bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
//             >
//               <div className="aspect-video relative">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-50" />

//                 {/* Cyberpunk Overlay Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF]/20 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                 {/* Glitch Effect on Hover */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:content-[''] before:absolute before:inset-0 before:bg-[#D946EF]/20 before:transform before:translate-x-2 before:animate-pulse after:content-[''] after:absolute after:inset-0 after:bg-[#8B5CF6]/20 after:transform after:-translate-x-2 after:animate-pulse" />
//               </div>

//               <div className="p-6 relative">
//                 <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#D946EF] transition-colors">
//                   {project.title}
//                 </h3>
//                 <p className="text-white/70 mb-4">{project.description}</p>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 bg-[#D946EF]/20 rounded-full text-sm text-[#D946EF] hover:bg-[#D946EF]/30 transition-colors"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex gap-4">
//                   <motion.a
//                     href={project.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//                   >
//                     <Github className="w-5 h-5 text-white" />
//                   </motion.a>
//                   <motion.a
//                     href={project.live}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//                   >
//                     <ExternalLink className="w-5 h-5 text-white" />
//                   </motion.a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
