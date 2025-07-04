import { motion } from "framer-motion";

export function LoadingScreen() {
  const letters = "Brice-Dev".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
      onAnimationComplete={() => (document.body.style.overflow = "auto")}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1F2C]"
    >
      <div className="relative w-40 h-40">
        {/* Cercles animés */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.2, 0],
            rotate: 360,
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
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            rotate: -360,
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
                initial={{ y: 40, opacity: 0 }}
                animate={{
                  y: [40, -10, 0],
                  opacity: [0, 1, 1],
                  scale: [0.5, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  times: [0, 0.8, 1]
                }}
                className="inline-block text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-600 bg-clip-text text-2xl font-bold"
              >
                {letter === "-" ? "•" : letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Points de suspension centrés */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6"
        >
          <span className="text-white animate-pulse">...</span>
        </motion.div>
      </div>
    </motion.div>
  );
}