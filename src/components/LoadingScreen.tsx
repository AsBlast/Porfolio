import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1F2C]"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1, 0.5], opacity: [0, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.5, 1] }}
          className="w-32 h-32 border-4 border-[#D946EF] rounded-full"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.5, 1], delay: 0.2 }}
          className="absolute inset-0 w-32 h-32 border-4 border-[#8B5CF6] rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white font-bold text-xl"
          >
           Brice-Dev...
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}