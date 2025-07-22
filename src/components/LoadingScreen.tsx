import { motion } from "framer-motion";

export function LoadingScreen() {
  const letters = "Brice-Dev".split("");


  return (
    <motion.div
      key="loading-screen" 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }} // Reste visible tant qu'il est monté
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}

      // La manipulation du DOM (onAnimationComplete) est supprimée.
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1F2C]"
     
      role="status"
      aria-live="polite"
    >
     
      <div className="relative w-40 h-40">
        {/* Cercles animés */}
        <motion.div
          animate={{
            scale: [0, 1.2, 0],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "anticipate"
          }}
          className="absolute inset-0 border-4 border-cyan-400/30 rounded-full"
        />

        <motion.div
          animate={{
            scale: [0, 1.5, 0],
            rotate: [0, -360],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-4 border-fuchsia-500/40 rounded-full"
        />

        {/* Nom centré */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: [20, -5, 0],
                  opacity: 1
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1, 
                  ease: "easeOut"
                }}
                className="inline-block text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-600 bg-clip-text text-2xl font-bold"
              >
                {letter === "-" ? "•" : letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}