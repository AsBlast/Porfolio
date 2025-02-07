import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "Project Alpha",
      description: "Modern web application built with React, leveraging Tailwind CSS for styling and Vite for blazing fast development",
      image: "/api/placeholder/800/600",
      github: "https://github.com",
      live: "https://example.com",
      tags: ["React", "Tailwind CSS", "Vite"],
    },
    {
      title: "Project Beta",
      description: "Advanced e-commerce solution using WordPress with WooCommerce integration and Elementor page builder",
      image: "/api/placeholder/800/600",
      github: "https://github.com",
      live: "https://example.com",
      tags: ["WordPress", "WooCommerce", "Elementor"],
    },
    {
      title: "Project Gamma",
      description: "Full-stack web application utilizing PHP frameworks (Work in Progress)",
      image: "/api/placeholder/800/600",
      github: "https://github.com",
      live: "https://example.com",
      tags: ["PHP", "MySQL", "Symfony"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-[#1A1F2C] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Projects
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