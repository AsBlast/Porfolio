import { motion } from "framer-motion";
import { ChevronDown, Terminal, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_#000_1px),_linear-gradient(90deg,transparent_1px,_#000_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,_#000_70%,transparent_100%)] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
      </div>
      
      {}
      <div className="absolute inset-0 bg-[url('/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-5 mix-blend-color-dodge" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                boxShadow: ["0 0 20px #0ff", "0 0 40px #f0f", "0 0 20px #0ff"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full p-4 bg-black/50 backdrop-blur-sm"
            >
              <Terminal className="w-16 h-16 text-cyan-400" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              Brice Yakim AsBlast
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            Full Stack apprentice Developer
          </h2>
          
          <p className="text-xl md:text-2xl text-cyan-100/80 mb-8 max-w-2xl mx-auto font-mono">
            Passionate about creating innovative and creative web solutions
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            {["github", "linkedin"].map((platform) => (
              <motion.a
                key={platform}
                href={`https://${platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-lg bg-black/30 backdrop-blur border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all duration-300 group"
              >
                {platform === "github" ? (
                  <Github className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                ) : (
                  <Linkedin className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                )}
              </motion.a>
            ))}
          </div>
          
          <motion.div className="flex flex-col items-center gap-8">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-950 text-cyan-300 rounded-lg border border-cyan-500/50 hover:bg-cyan-900 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
            >
              Discover More
            </motion.a>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="text-cyan-400/50 w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
