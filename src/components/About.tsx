import { motion } from "framer-motion";
import { Code, Database, Layout } from "lucide-react";

export function About() {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-[#D946EF]" />,
      title: "Frontend Development",
      description: "Expert in React , Vite and modern JavaScript frameworks. Creating responsive and intuitive user interfaces that bring ideas to life.",
    },
    {
      icon: <Database className="w-8 h-8 text-[#D946EF]" />,
      title: "Backend Development",
      description: "Proficient in Node.js, Python, and database management. Building robust and scalable server-side solutions.",
    },
    {
      icon: <Layout className="w-8 h-8 text-[#D946EF]" />,
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces that combine aesthetics with functionality for optimal user experience.",
    },
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
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/1699548679409.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/80"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
          Passionate Developer & Creative Innovator   
            </h3>  <br /> 
            <p className="mb-6">
              "The only way to do great work is to love what you do." With this mindset, 
              I approach every project with passion and dedication, pushing the boundaries 
              of what's possible in web development.
            </p>
            <p className="mb-6">
              Based in Antananarivo, Madagascar, I specialize in creating innovative 
              solutions that combine cutting-edge technology with intuitive design. 
              My goal is to build digital experiences that not only meet requirements 
              but exceed expectations.
            </p>
            <p>
              Let's collaborate and turn your vision into reality. Together, we can 
              create something extraordinary.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
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
